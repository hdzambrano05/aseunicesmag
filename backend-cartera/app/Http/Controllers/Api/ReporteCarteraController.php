<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ReporteCarteraController extends Controller
{
    public function exportarExcel(Request $request)
    {
        $anio = (int) $request->get('anio', now()->year);
        $soloAprobados = $request->boolean('solo_aprobados');

        $estadosAprobados = ['APROBADO', 'APROBADA', 'PAGADO', 'PAGADA'];

        $asociados = DB::table('asociados as a')
            ->where('a.estado_membresia', 'ACTIVO')
            ->join('usuarios as u', 'u.id', '=', 'a.usuario_id')
            ->leftJoin('ciudades as c', 'c.id', '=', 'a.ciudad_id')
            ->select(
                'a.id as asociado_id',
                'a.codigo_asociado',
                'a.estado_membresia',
                'a.fecha_afiliacion',
                'a.fecha_nacimiento',
                'a.genero',
                'a.direccion',
                'a.profesion',
                'a.empresa',
                'a.cargo',
                'a.fecha_grado',
                'a.programa_academico',
                'a.universidad',
                'a.categoria_asociado',
                'a.observaciones',
                'u.tipo_documento',
                'u.numero_documento',
                'u.nombres',
                'u.apellidos',
                'u.correo',
                'u.telefono',
                'u.estado_cuenta',
                'c.ciudad',
                'c.departamento'
            )
            ->orderBy('u.apellidos')
            ->orderBy('u.nombres')
            ->get();

        $recibos = DB::table('recibos_pago as rp')
            ->leftJoin('obligaciones as o', 'o.id', '=', 'rp.obligacion_id')
            ->leftJoin('tipos_obligacion as t', 't.id', '=', 'o.tipo_obligacion_id')
            ->leftJoin('periodos_cobro as pc', 'pc.id', '=', 'o.periodo_id')
            ->select(
                'rp.id',
                'rp.asociado_id',
                'rp.obligacion_id',
                'rp.numero_recibo',
                'rp.referencia_pago',
                'rp.valor_reportado',
                'rp.fecha_pago',
                'rp.banco',
                'rp.estado as estado_recibo',
                'rp.observacion_usuario',
                'rp.observacion_admin',
                'rp.fecha_carga',
                'rp.fecha_revision',
                'rp.ruta_archivo',
                'o.numero_obligacion',
                'o.concepto',
                'o.valor_base',
                'o.saldo_pendiente',
                'o.estado as estado_obligacion',
                'o.fecha_vencimiento',
                't.codigo as codigo_tipo_obligacion',
                't.nombre as tipo_obligacion',
                'pc.nombre as periodo',
                'pc.tipo_periodo',
                'pc.anio as anio_periodo',
                'pc.fecha_inicio',
                'pc.fecha_fin'
            )
            ->where(function ($q) use ($anio) {
                $q->whereYear('rp.fecha_pago', $anio)
                    ->orWhereNull('rp.fecha_pago');
            })
            ->when($soloAprobados, function ($q) use ($estadosAprobados) {
                $q->whereIn('rp.estado', $estadosAprobados);
            })
            ->orderBy('rp.fecha_pago')
            ->get()
            ->groupBy('asociado_id');

        $obligaciones = DB::table('obligaciones as o')
            ->leftJoin('tipos_obligacion as t', 't.id', '=', 'o.tipo_obligacion_id')
            ->leftJoin('periodos_cobro as pc', 'pc.id', '=', 'o.periodo_id')
            ->select(
                'o.asociado_id',
                'o.saldo_pendiente',
                'o.estado',
                'o.concepto',
                't.nombre as tipo_obligacion',
                'pc.anio as anio_periodo'
            )
            ->where(function ($q) use ($anio) {
                $q->whereYear('o.fecha_generacion', $anio)
                    ->orWhere('pc.anio', $anio);
            })
            ->get()
            ->groupBy('asociado_id');

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Cartera ' . $anio);

        $this->crearCabeceras($sheet, $anio);

        $fila = 4;
        $consecutivo = 1;

        foreach ($asociados as $asociado) {
            $recibosAsociado = $recibos->get($asociado->asociado_id, collect());
            $obligacionesAsociado = $obligaciones->get($asociado->asociado_id, collect());

            $totalPagado = (float) $recibosAsociado->sum('valor_reportado');
            $totalPendiente = (float) $obligacionesAsociado->sum('saldo_pendiente');

            $estadoCuentaActual = $totalPendiente > 0 ? 'DEBE' : 'AL DÍA';

            $pagoAfiliacion = $recibosAsociado->first(function ($r) {
                $texto = mb_strtolower(
                    ($r->tipo_obligacion ?? '') . ' ' .
                    ($r->concepto ?? '') . ' ' .
                    ($r->periodo ?? '')
                );

                return str_contains($texto, 'afiliacion') ||
                    str_contains($texto, 'afiliación') ||
                    str_contains($texto, 'inscripcion') ||
                    str_contains($texto, 'inscripción');
            });

            $pagosSostenimiento = $recibosAsociado->filter(function ($r) {
                $texto = mb_strtolower(
                    ($r->tipo_obligacion ?? '') . ' ' .
                    ($r->concepto ?? '') . ' ' .
                    ($r->periodo ?? '')
                );

                $esAfiliacion =
                    str_contains($texto, 'afiliacion') ||
                    str_contains($texto, 'afiliación') ||
                    str_contains($texto, 'inscripcion') ||
                    str_contains($texto, 'inscripción');

                $esSostenimiento =
                    str_contains($texto, 'sostenimiento') ||
                    str_contains($texto, 'mensual') ||
                    str_contains($texto, 'semestral') ||
                    str_contains($texto, 'anual');

                return !$esAfiliacion && $esSostenimiento;
            });

            $formaPago = $this->calcularFormaPago($recibosAsociado, $totalPagado);
            $membresia = $this->calcularMembresia($pagosSostenimiento, $estadoCuentaActual);

            $filaData = [
                $consecutivo++,
                $asociado->numero_documento,
                $this->nombreCompleto($asociado),
                $asociado->estado_membresia,
                $asociado->programa_academico,
                $pagoAfiliacion ? 'PAGO DE AFILIACIÓN / INSCRIPCIÓN' : '',
                $this->fecha($asociado->fecha_afiliacion),
                $asociado->telefono,
                $asociado->correo,
                $this->fecha($asociado->fecha_nacimiento),
                $asociado->direccion,
                $asociado->universidad,
                $asociado->profesion,
                $asociado->empresa,
                $asociado->cargo,
                '',
                $asociado->departamento,
                $asociado->ciudad,
                $estadoCuentaActual,
            ];

            foreach (range(1, 12) as $mes) {
                $pagoMes = $pagosSostenimiento->first(function ($r) use ($mes) {
                    if (!$r->fecha_pago) {
                        return false;
                    }

                    return (int) date('n', strtotime($r->fecha_pago)) === $mes;
                });

                $filaData[] = $pagoMes->ruta_archivo ?? '';
                $filaData[] = $this->fecha($pagoMes->fecha_pago ?? null);
                $filaData[] = $pagoMes
                    ? trim(($pagoMes->concepto ?? '') . ' - $' . number_format((float) $pagoMes->valor_base, 0, ',', '.'))
                    : '';
            }

            $filaData[] = $formaPago['efectivo'];
            $filaData[] = $formaPago['consignacion'];
            $filaData[] = $formaPago['nequi'];
            $filaData[] = $formaPago['otro'];
            $filaData[] = $membresia;

            $filaData[] = $pagoAfiliacion->ruta_archivo ?? '';
            $filaData[] = $this->fecha($pagoAfiliacion->fecha_pago ?? null);
            $filaData[] = $pagoAfiliacion->valor_reportado ?? '';
            $filaData[] = $pagoAfiliacion
                ? trim(($pagoAfiliacion->concepto ?? '') . ' / ' . ($pagoAfiliacion->numero_recibo ?? ''))
                : '';

            $filaData[] = $asociado->observaciones;
            $filaData[] = $totalPagado;
            $filaData[] = $totalPendiente;

            $sheet->fromArray($filaData, null, "A{$fila}");
            $fila++;
        }

        $highestColumn = $sheet->getHighestColumn();
        $highestRow = $sheet->getHighestRow();

        $sheet->getStyle("A1:{$highestColumn}{$highestRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'B7B7B7'],
                ],
            ],
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ]);

        $sheet->freezePane('A4');
        $sheet->setAutoFilter("A3:{$highestColumn}3");

        for ($col = 1; $col <= Coordinate::columnIndexFromString($highestColumn); $col++) {
            $sheet->getColumnDimensionByColumn($col)->setAutoSize(true);
        }

        $filename = 'base-cartera-aseunicesmag-' . $anio . '-' . now()->format('YmdHis') . '.xlsx';

        return response()->streamDownload(function () use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Cache-Control' => 'max-age=0',
        ]);
    }

    private function crearCabeceras($sheet, int $anio)
    {
        $headersBase = [
            'CONSEC',
            'CEDULA',
            'ASOCIADO',
            'ESTADO',
            'NIVEL EDUCATIVO',
            'EN CONCEPTO DE PAGO DE LA INSCRIPCIÓN',
            'FECHA DE AFILIACIÓN',
            'CELULAR',
            'CORREO ELECTRÓNICO',
            'FECHA DE CUMPLEAÑOS',
            'DIRECCIÓN',
            'UNIVERSIDAD',
            'PROGRAMA QUE EGRESÓ',
            'EMPRESA DONDE LABORA',
            'CARGO QUE DESEMPEÑA',
            'ESTRATO',
            'DEPARTAMENTO',
            'MUNICIPIO',
            'ESTADO DE CUENTA ACTUAL',
        ];

        $col = 1;

        foreach ($headersBase as $header) {
            $letra = Coordinate::stringFromColumnIndex($col);
            $sheet->mergeCells("{$letra}1:{$letra}3");
            $sheet->setCellValue("{$letra}1", $header);
            $this->estiloAzul($sheet, "{$letra}1:{$letra}3");
            $col++;
        }

        $inicioPagos = $col;

        $meses = [
            1 => 'ENERO',
            2 => 'FEBRERO',
            3 => 'MARZO',
            4 => 'ABRIL',
            5 => 'MAYO',
            6 => 'JUNIO',
            7 => 'JULIO',
            8 => 'AGOSTO',
            9 => 'SEPTIEMBRE',
            10 => 'OCTUBRE',
            11 => 'NOVIEMBRE',
            12 => 'DICIEMBRE',
        ];

        foreach ($meses as $mes) {
            $c1 = Coordinate::stringFromColumnIndex($col);
            $c3 = Coordinate::stringFromColumnIndex($col + 2);

            $sheet->mergeCells("{$c1}2:{$c3}2");
            $sheet->setCellValue("{$c1}2", $mes);

            $sheet->setCellValue(Coordinate::stringFromColumnIndex($col) . '3', 'SOPORTE PAGO');
            $sheet->setCellValue(Coordinate::stringFromColumnIndex($col + 1) . '3', 'FECHA');
            $sheet->setCellValue(Coordinate::stringFromColumnIndex($col + 2) . '3', 'DESCRIPCIÓN');

            $this->estiloVerde($sheet, "{$c1}2:{$c3}3");

            $col += 3;
        }

        $finPagos = $col - 1;
        $cInicioPagos = Coordinate::stringFromColumnIndex($inicioPagos);
        $cFinPagos = Coordinate::stringFromColumnIndex($finPagos);

        $sheet->mergeCells("{$cInicioPagos}1:{$cFinPagos}1");
        $sheet->setCellValue("{$cInicioPagos}1", "PAGOS SOSTENIMIENTO {$anio}");
        $this->estiloVerde($sheet, "{$cInicioPagos}1:{$cFinPagos}1");

        $formaInicio = $col;
        $formaHeaders = ['EFECTIVO', 'CONSIGNACIÓN / TRANSFERENCIA', 'NEQUI', 'OTRO'];

        $c1 = Coordinate::stringFromColumnIndex($formaInicio);
        $c4 = Coordinate::stringFromColumnIndex($formaInicio + 3);

        $sheet->mergeCells("{$c1}1:{$c4}2");
        $sheet->setCellValue("{$c1}1", "FORMA DE PAGO {$anio}");

        foreach ($formaHeaders as $header) {
            $sheet->setCellValue(Coordinate::stringFromColumnIndex($col) . '3', $header);
            $col++;
        }

        $this->estiloVerde($sheet, "{$c1}1:{$c4}3");

        $membresiaCol = $col;
        $letraMembresia = Coordinate::stringFromColumnIndex($membresiaCol);
        $sheet->mergeCells("{$letraMembresia}1:{$letraMembresia}3");
        $sheet->setCellValue("{$letraMembresia}1", "MEMBRESÍA {$anio}");
        $this->estiloAzulClaro($sheet, "{$letraMembresia}1:{$letraMembresia}3");
        $col++;

        $afiliacionInicio = $col;
        $afiliacionHeaders = ['SOPORTE PAGO', 'FECHA', 'VALOR', 'DESCRIPCIÓN'];

        $a1 = Coordinate::stringFromColumnIndex($afiliacionInicio);
        $a4 = Coordinate::stringFromColumnIndex($afiliacionInicio + 3);

        $sheet->mergeCells("{$a1}1:{$a4}2");
        $sheet->setCellValue("{$a1}1", "PAGOS AFILIACIÓN {$anio}");

        foreach ($afiliacionHeaders as $header) {
            $sheet->setCellValue(Coordinate::stringFromColumnIndex($col) . '3', $header);
            $col++;
        }

        $this->estiloAzulClaro($sheet, "{$a1}1:{$a4}3");

        $novedadesInicio = $col;
        $nHeaders = ['OBSERVACIÓN', 'TOTAL PAGADO', 'TOTAL PENDIENTE'];

        $n1 = Coordinate::stringFromColumnIndex($novedadesInicio);
        $n3 = Coordinate::stringFromColumnIndex($novedadesInicio + 2);

        $sheet->mergeCells("{$n1}1:{$n3}2");
        $sheet->setCellValue("{$n1}1", 'NOVEDADES');

        foreach ($nHeaders as $header) {
            $sheet->setCellValue(Coordinate::stringFromColumnIndex($col) . '3', $header);
            $col++;
        }

        $this->estiloAmarillo($sheet, "{$n1}1:{$n3}3");

        $highestColumn = Coordinate::stringFromColumnIndex($col - 1);

        $sheet->getStyle("A1:{$highestColumn}3")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_CENTER)
            ->setVertical(Alignment::VERTICAL_CENTER)
            ->setWrapText(true);

        $sheet->getRowDimension(1)->setRowHeight(28);
        $sheet->getRowDimension(2)->setRowHeight(30);
        $sheet->getRowDimension(3)->setRowHeight(38);
    }

    private function estiloAzul($sheet, string $rango)
    {
        $sheet->getStyle($rango)->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF'], 'size' => 9],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '002060']],
        ]);
    }

    private function estiloVerde($sheet, string $rango)
    {
        $sheet->getStyle($rango)->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => '000000'], 'size' => 9],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'E2F0D9']],
        ]);
    }

    private function estiloAzulClaro($sheet, string $rango)
    {
        $sheet->getStyle($rango)->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => '000000'], 'size' => 9],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '9DC3E6']],
        ]);
    }

    private function estiloAmarillo($sheet, string $rango)
    {
        $sheet->getStyle($rango)->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => '000000'], 'size' => 9],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'FFC000']],
        ]);
    }

    private function calcularFormaPago($pagos, float $totalPagado)
    {
        $forma = [
            'efectivo' => '',
            'consignacion' => '',
            'nequi' => '',
            'otro' => '',
        ];

        foreach ($pagos as $pago) {
            $banco = mb_strtolower($pago->banco ?? '');

            if (str_contains($banco, 'nequi')) {
                $forma['nequi'] = 'X';
            } elseif (str_contains($banco, 'efectivo')) {
                $forma['efectivo'] = 'X';
            } elseif (
                str_contains($banco, 'bancolombia') ||
                str_contains($banco, 'transferencia') ||
                str_contains($banco, 'consignacion') ||
                str_contains($banco, 'consignación')
            ) {
                $forma['consignacion'] = 'X';
            } elseif ($totalPagado > 0) {
                $forma['otro'] = 'X';
            }
        }

        return $forma;
    }

    private function calcularMembresia($pagosSostenimiento, string $estadoCuenta)
    {
        if ($estadoCuenta === 'AL DÍA') {
            return 'ACTIVA';
        }

        if ($pagosSostenimiento->count() > 0) {
            return 'PARCIAL';
        }

        return 'PENDIENTE';
    }

    private function nombreCompleto($asociado)
    {
        return trim(($asociado->nombres ?? '') . ' ' . ($asociado->apellidos ?? ''));
    }

    private function fecha($fecha)
    {
        if (!$fecha) {
            return '';
        }

        return date('Y-m-d', strtotime($fecha));
    }
}

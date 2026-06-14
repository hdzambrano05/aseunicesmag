<?php

namespace App\Mail;

use App\Models\SolicitudAfiliacion;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NuevaSolicitudAfiliacionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $solicitud;

    public function __construct(SolicitudAfiliacion $solicitud)
    {
        $this->solicitud = $solicitud;
    }

    public function build()
    {
        return $this->subject('Nueva solicitud de afiliación')
            ->view('emails.nueva_solicitud_afiliacion');
    }
}
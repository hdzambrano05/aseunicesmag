<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AfiliacionRechazadaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $motivo;

    public function __construct($usuario, $motivo = null)
    {
        $this->usuario = $usuario;
        $this->motivo = $motivo;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Afiliación Rechazada - ASEUNICESMAG',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.afiliacion_rechazada',
        );
    }
}
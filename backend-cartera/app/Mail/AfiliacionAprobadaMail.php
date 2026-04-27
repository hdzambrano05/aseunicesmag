<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AfiliacionAprobadaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $passwordPlano;

    public function __construct($usuario, $passwordPlano)
    {
        $this->usuario = $usuario;
        $this->passwordPlano = $passwordPlano;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Afiliación Aprobada - ASEUNICESMAG',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.afiliacion_aprobada',
        );
    }
}
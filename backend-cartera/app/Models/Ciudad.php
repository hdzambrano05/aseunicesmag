<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    protected $table = 'ciudades';

    public $timestamps = false;

    protected $fillable = [
        'departamento',
        'ciudad',
        'codigo_dane',
    ];

    public function asociados()
    {
        return $this->hasMany(Asociado::class, 'ciudad_id');
    }
}
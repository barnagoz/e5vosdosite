<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends Model
{
    protected $table = 'permissions';

    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function event(){
        return $this->belongsTo(Event::class);
    }
}

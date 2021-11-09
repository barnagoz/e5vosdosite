<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Score extends Model
{
    use HasFactory;
    public function student(){
        return $this->belongsTo(User::class);
    }

    public function team(){
        return $this->belongsTo(Team::class);
    }

    public function event(){
        return $this->belongsTo(Event::class);
    }
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PresentationSignup extends Model
{
    protected $table = 'presentation_signups';

    protected $hidden = ['created_at','updated_at'];

    public function toggle(){
        $this->jelen=!$this->jelen;
        $this->save();
    }
    public function presentation(){
        return $this->belongsTo(Presentation::class);
    }
    public function student(){
        return $this->belongsTo(Student::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'description', 'data', 'type', 'survey_id'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}

<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyResourceDashboard extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => $this->status !== 'draf',
            'created_at' => (new DateTime($this->created_at))->format('h:i:s a. d/M/Y'),
            'expire_date' => (new DateTime($this->expire_date))->format('h:i:s a. d/M/Y'),
            'questions' => $this->questions()->count(),
            'answers' => $this->answers()->count()
        ];
    }
}

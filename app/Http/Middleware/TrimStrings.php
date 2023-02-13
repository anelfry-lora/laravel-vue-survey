<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

class TrimStrings extends Middleware
{
    /**
     * The names of the attributes that should not be trimmed.
     *
<<<<<<< HEAD
     * @var array
     */
    protected $except = [
=======
     * @var array<int, string>
     */
    protected $except = [
        'current_password',
>>>>>>> first commit, config proyect whit vue
        'password',
        'password_confirmation',
    ];
}

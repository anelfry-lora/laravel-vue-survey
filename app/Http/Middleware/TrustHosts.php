<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

class TrustHosts extends Middleware
{
    /**
     * Get the host patterns that should be trusted.
     *
<<<<<<< HEAD
     * @return array
=======
     * @return array<int, string|null>
>>>>>>> first commit, config proyect whit vue
     */
    public function hosts()
    {
        return [
            $this->allSubdomainsOfApplicationUrl(),
        ];
    }
}

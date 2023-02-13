<?php

namespace Tests\Feature;

<<<<<<< HEAD
use Illuminate\Foundation\Testing\RefreshDatabase;
=======
// use Illuminate\Foundation\Testing\RefreshDatabase;
>>>>>>> first commit, config proyect whit vue
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
<<<<<<< HEAD
    public function testBasicTest()
=======
    public function test_the_application_returns_a_successful_response()
>>>>>>> first commit, config proyect whit vue
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}

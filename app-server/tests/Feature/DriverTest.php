<?php

namespace Tests\Feature;

use Laravel\Passport\Passport;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DriverTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->withoutMiddleware();

        $response = $this->json('GET', '/api/drivers');
        echo(var_dump($response->json()));
        $response
            ->assertStatus(200)
            ->assertJson([]);
    }
}

<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        DB::table('oauth_clients')->insert([
            'id'                     => '1',
            'name'                   => 'Laravel Password Grant Client',
            'secret'                 => '2T1m1VMoAuRXCqoq1sDHgFFhHbITtlbxc0AT4rQz',
            'redirect'               => 'http://localhost',
            'personal_access_client' => 0,
            'password_client'        => 1,
            'revoked'                => 0,
        ]);

        DB::table('users')->insert([
            'name'     => 'User',
            'email'    => 'user@user.com',
            'password' => bcrypt('user123'),
        ]);
    }
}

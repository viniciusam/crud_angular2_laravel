<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/redirect', function () {
//     $query = http_build_query([
//         'client_id' => '3',
//         'redirect_uri' => 'http://localhost:4200/drivers/',
//         'response_type' => 'token',
//         'scope' => '',
//     ]);

//     return redirect('http://localhost:8000/oauth/authorize?'.$query);
// });

// Driver routes config.
Route::group(['prefix' => 'drivers', 'middleware' => ['auth:api']], function () {
    Route::get   ('/'               , 'DriverController@list');
    Route::get   ('/{driver}'       , 'DriverController@find');
    Route::post  ('/create'         , 'DriverController@create');
    Route::put   ('/{driver}/update', 'DriverController@update');
    Route::delete('/{driver}/delete', 'DriverController@delete');
});

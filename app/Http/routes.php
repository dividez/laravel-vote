<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::resource('/login', 'Admin\AdminLoginController');
Route::resource('/register', 'Admin\AdminLoginController@register');
Route::resource('/check_register', 'Admin\AdminLoginController@checkRegister');
Route::get('/code/captcha/{tmp}', 'Admin\AdminLoginController@captcha');
Route::get('/out', 'Admin\AdminLoginController@out');
Route::group(['middleware' => 'AdminMiddleware'],function (){
    Route::resource('/admin', 'Admin\AdminController');
    Route::resource('/my_lists', 'Admin\AdminController@lists');
    Route::resource('/vote', 'Admin\AdminController@updateVote');
});
Route::resource('/show', 'HomeController');
Route::resource('/', 'HomeController');

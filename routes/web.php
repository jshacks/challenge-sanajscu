<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('achizitii',  'AchizitiiController@index')->name('achizitii');


Route::get('values', 'ValuesController@index')->name('values');
Route::get('values/diseases', 'ValuesController@getDiseases')->name('values');
Route::get('values/diseaseYears', 'ValuesController@getAvailableYearsByDisease')->name('values');

Route::get('json-judete',  'JsonEdit@index');


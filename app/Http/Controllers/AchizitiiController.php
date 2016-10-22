<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Excel;

class AchizitiiController extends Controller
{
    public function index () {
    	Excel::load('test.xls', function($reader) {
		    // ->all() is a wrapper for ->get() and will work the same
		    $results = $reader->all();
		    dd($results);
		});

    }
}

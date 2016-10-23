<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Excel;

class JsonEdit extends Controller
{
    public function index () {
    	$json = file_get_contents(public_path('test2.json'));
    	$json_a = json_decode($json, true);

    	foreach ($json_a as $key => $prop) {
		    print_r($prop);
		}
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\IndicatorValue;
use DB;

class ValuesController extends Controller
{
    public function index () {
    	$years = DB::table('indicator_values')->select('year')->get();
    	//$this->getAvailableYearsByDisease('Cancer');
    	$this->getAvailableDataByDiseaseAndYear('Cancer', 2012);
    }

    public function getYears(){
    	echo "year";
    }

    private function getAvailableYearsByDisease($disease){
    	$years = DB::table('indicator_values')
					->where('disease', '=', $disease)
    				->select('year')
    				->distinct()
    				->get();
		echo $years;
    }

    private function getAvailableDataByDiseaseAndYear($disease, $year){
    	$values = DB::table('indicator_values')
    				->join('counties', 'indicator_values.county_id', '=', 'counties.id')
					->where('year', '=', $year)
					->where('disease', '=', $disease)
					->select('county as name', 'value as indice', 'json')
					->get();
		echo $values;
    }
}
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

    public function getDiseases(){
    	$diseases = DB::table('indicator_values')
    					->select('disease')
    					->distinct()
    					->get();
		return response()->json($diseases);
    }

    private function getAvailableYearsByDisease($disease){
    	$years = DB::table('indicator_values')
					->where('disease', '=', $disease)
    				->select('year')
    				->distinct()
    				->get();
		return response()->json($years);
    }

    private function getAvailableDataByDiseaseAndYear($disease, $year){
    	$values = DB::table('indicator_values')
    				->join('counties', 'indicator_values.county_id', '=', 'counties.id')
					->where('year', '=', $year)
					->where('disease', '=', $disease)
					->select('county as name', 'value as diseaseValue', 'json')
					->get();
		$newValues =[];
		foreach($values as $value)
		{
			$diseaseValue = 0;
			foreach($value as $key => $value)
			{
				
				if($key === 'diseaseValue'){
					$diseaseValue = $value;
				}

				if($key === 'json')
				{
					$arr = json_decode($value, true);
					$arr['properties']['diseaseValue'] = $diseaseValue;
					$newValues[] = $arr;
				}

			}
		}
		echo json_encode($newValues);
    }
}
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIndicatorValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('indicator_values', function (Blueprint $table) {
            $table->increments('id');
            // $table->decimal('value', 5, 2);
            $table->integer('value');
            $table->integer('year');
            $table->string('county');
            $table->string('disease');
            $table->integer('county_id')->unsigned()->nullable();
            $table->foreign('county_id')->references('id')->on('counties');
            $table->integer('indicator_id')->unsigned()->nullable();
            $table->foreign('indicator_id')->references('id')->on('indicators');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('indicator_values');
    }
}

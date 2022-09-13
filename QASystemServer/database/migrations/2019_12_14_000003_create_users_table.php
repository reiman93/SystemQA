<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
        
          //  $table->timestamp('email_verified_at')->nullable();
            $table->string('username')->unique();
            $table->string('password');
            $table->integer('phone_number');
           
            $table->longText('foto')->nullable();

            $table->rememberToken();

            $table->bigInteger('rols_id')->unsigned();
            $table->bigInteger('departments_id')->unsigned();
            $table->timestamps();

            $table->foreign('rols_id')->references('id')->on('rols')->onDelete("cascade");
            $table->foreign('departments_id')->references('id')->on('departments')->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

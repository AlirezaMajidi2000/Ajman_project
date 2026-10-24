<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class DocumentController extends Controller
{

    public function index()
    {
        return view('applications\documents', ['test'=> 'این یه تسته!']);

    }



}

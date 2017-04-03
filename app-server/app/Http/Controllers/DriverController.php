<?php

namespace App\Http\Controllers;

use App\Driver;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Validator;

class DriverController extends Controller
{
    /**
     * Return a list of drivers.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        return Driver::all();
    }

    /**
     * Return one driver.
     *
     * @param \App\Driver $driver
     */
    public function find(Driver $driver) {
        return $driver;
    }

    /**
     * Create and store a new driver.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name'    => 'required|max:255',
            'last_name'     => 'required|max:255',
            'email'         => 'required|email|unique:drivers|max:255',
            'license_number'=> 'required|unique:drivers|max:255',
            'license_exp'   => 'required|date'
        ]);
        
        if ($validator->fails()) {
            return $this->validationError($validator);
        }
        
        $driver = new Driver;
        $driver->first_name = $request->first_name;
        $driver->last_name = $request->last_name;
        $driver->email = $request->email;
        $driver->license_number = $request->license_number;
        $driver->license_exp = $request->license_exp;
        $driver->save();

        return $this->success('Driver successfully created!', $driver->id);
    }

    /**
     * Update an existing driver.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Driver              $driver
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Driver $driver)
    {
        $validator = Validator::make($request->all(), [
            'first_name'    => 'required|max:255',
            'last_name'     => 'required|max:255',
            'email'         => ['required', 'email', 'max:255', Rule::unique('drivers')->ignore($driver->id)],
            'license_number'=> ['required', 'max:255', Rule::unique('drivers')->ignore($driver->id)],
            'license_exp'   => 'required|date'
        ]);
        
        if ($validator->fails()) {
            return $this->validationError($validator);
        }

        $driver->first_name = $request->first_name;
        $driver->last_name = $request->last_name;
        $driver->email = $request->email;
        $driver->license_number = $request->license_number;
        $driver->license_exp = $request->license_exp;
        $driver->save();

        return $this->success('Driver successfully updated!');
    }

    /**
     * Delete the specified driver from storage.
     *
     * @param  \App\Driver $driver
     * @return \Illuminate\Http\Response
     */
    public function delete(Driver $driver)
    {
        Driver::destroy($driver->id);
        return $this->success('Driver successfully deleted!');
    }

    /*
     * Return a success message.
     *
     * @param $msg the message
     * @param id   the driver id, nullable
     */
    private function success($msg, $id = null) {
        if ($id !== null) {
            return response()->json(['message' => $msg, 'id' => $id]);
        } else {
            return response()->json(['message' => $msg]);
        }
    }

    private function validationError($validator) {
        return response([ 'message' => 'Validation Error', 'errors' => $validator->errors() ], 400);
    }

}

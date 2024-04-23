<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('roles')->delete();
        $role = Role::create([
            'name'	=>	'Administrador de sistema',
            'guard_name'    => 'web'
        ]);

        $role = Role::create([
            'name'	=>	'Doctor',
            'guard_name'    => 'web'
        ]);
    }
}

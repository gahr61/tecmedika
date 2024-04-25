<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Doctor;
use App\Models\MedicalSpecialty;
use App\Models\DoctorMedicalSpecialty;

class UserDoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('users')->delete();
        \DB::table('doctors')->delete();

        $specialities = MedicalSpecialty::all();

        /**
         * Administrador
         */
        $user = User::create([
            'names'=>'Rogelio',
            'lastname1'=>'Gámez',
            'email'=>'sistemas@tecmedika.com',
            'password'=>bcrypt('admin'),
            'role'=>'Administrador de sistema'
        ]);

        $user->assignRole('Administrador de sistema');

        /**
         * Doctores
         */
        $user = User::create([
            'names'=>'Ricardo',
            'lastname1'=>'Gonzalez',
            'email'=>'rgonzalez@tecmedika.com',
            'password'=>bcrypt('doc1'),
            'role'=>'Doctor'
        ]);

        $user->assignRole('Doctor');

        $doctor = Doctor::create([
            'users_id'=>$user->id,
            'names'=>'Ricardo',
            'lastname1'=>'Gonzalez'
        ]);

        $specialty = DoctorMedicalSpecialty::create([
            'doctors_id'=>$doctor->id,
            'medical_specialty_id'=>$specialities[0]->id
        ]);

        /** */
        $user = User::create([
            'names'=>'Viridiana',
            'lastname1'=>'Escalante',
            'email'=>'vescalante@tecmedika.com',
            'password'=>bcrypt('doc2'),
            'role'=>'Doctor'
        ]);

        $user->assignRole('Doctor');

        $doctor = Doctor::create([
            'users_id'=>$user->id,
            'names'=>'Viridiana',
            'lastname1'=>'Escalante',
        ]);

        $specialty = DoctorMedicalSpecialty::create([
            'doctors_id'=>$doctor->id,
            'medical_specialty_id'=>$specialities[1]->id
        ]);

        /** */
        $user = User::create([
            'names'=>'Arturo',
            'lastname1'=>'López',
            'lastname2'=>'López',
            'email'=>'alopez@tecmedika.com',
            'password'=>bcrypt('doc3'),
            'role'=>'Doctor'
        ]);

        $user->assignRole('Doctor');

        $doctor = Doctor::create([
            'users_id'=>$user->id,
            'names'=>'Arturo',
            'lastname1'=>'López',
            'lastname2'=>'López'
        ]);

        $specialty = DoctorMedicalSpecialty::create([
            'doctors_id'=>$doctor->id,
            'medical_specialty_id'=>$specialities[1]->id
        ]);
        $specialty = DoctorMedicalSpecialty::create([
            'doctors_id'=>$doctor->id,
            'medical_specialty_id'=>$specialities[2]->id
        ]);
    }
}

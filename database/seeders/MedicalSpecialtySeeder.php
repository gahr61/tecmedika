<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\MedicalSpecialty;

class MedicalSpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('medical_specialty')->delete();

        $specialities = ['Nutriólogo', 'Gastroenterólogo', 'Odontólogo'];

        foreach($specialities as $medical){
            $specialty = MedicalSpecialty::create([
                'name'=>$medical
            ]);
        }
        
    }
}

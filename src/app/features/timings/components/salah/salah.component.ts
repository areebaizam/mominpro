import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Constants
const formModules = [FormsModule, ReactiveFormsModule ];
const materialModules = [MatSelectModule, MatFormFieldModule,MatInputModule]

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'tap-salah',
  standalone: true,
  imports: [...formModules,...materialModules],
  templateUrl: './salah.component.html',
  styleUrl: './salah.component.scss'
})
export class SalahComponent {
  value = 'Clear me';
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];
}

import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatFormFieldModule, MatInputModule]

@Component({
  selector: 'tap-mosque',
  standalone: true,
  imports: [...formModules, ...materialModules],
  templateUrl: './mosque.component.html',
  styleUrl: './mosque.component.scss'
})
export class MosqueComponent {

}

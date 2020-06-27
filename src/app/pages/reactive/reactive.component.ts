import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formReactive = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  save() {
    if (this.formReactive.invalid) {
      Object.values(this.formReactive.controls).forEach(control => {
          control.markAllAsTouched();
      });
      return;
    }
    console.log(this.formReactive);
    console.log(this.formReactive.value);
  }

  isValid(model: string) {
    return this.formReactive.get(model).valid;
  }

  isInvalid(model: string) {
    return this.formReactive.get(model).invalid && this.formReactive.get(model).touched;
  }

}

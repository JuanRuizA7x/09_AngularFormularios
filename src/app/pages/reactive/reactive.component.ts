import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, EmailValidator } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { ValidatorsService } from '../../services/validators.service';
import { CountrieModel } from '../../models/countrie.model';
import { TextAttribute } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;
  countries: CountrieModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private validatorsService: ValidatorsService
  ) {
    this.createForm();
    // this.createListeners();
    // this.loadData();
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => this.countries = countries);
  }

  createForm() {
    this.formReactive = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3), this.validatorsService.noHerrera]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: this.formBuilder.group({
        countrie: ['', Validators.required],
        department: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required]
      }),
      user: ['', Validators.required, this.validatorsService.existingUser],
      password1: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]],
      hobbies: this.formBuilder.array([])
    }, {
      validators: this.validatorsService.samePasswords('password1', 'password2')
    });
  }

  createListeners() {
    this.formReactive.valueChanges.subscribe( change => {
      console.log(change);
    });

    this.formReactive.statusChanges.subscribe( status => {
      console.log(status);
    });
  }

  loadData() {
    this.formReactive.reset({
      name: 'Juan',
      lastName: 'Ruíz',
      email: 'juan.ruiz.22.03.00@gmail.com',
      address: {
        countrie: 'CO',
        department: 'Quindío',
        city: 'La Tebaida',
        address: 'Calle 13 # 7 - 45'
      },
      hobbies: []
    });
  }

  save() {
    if (this.formReactive.invalid) {
      Object.values(this.formReactive.controls).forEach(control => {
          control.markAllAsTouched();
      });
      // return;
    }
    console.log(this.formReactive);
    console.log(this.formReactive.value);
    // alert('Formulario enviado');
    // this.formReactive.reset();
  }

  isValid(model: string, model1?: string) {
    if (model1) {
      return this.formReactive.get(model).get(model1).valid;
    }
    return this.formReactive.get(model).valid;
  }

  isInvalid(model: string, model1?: string) {
    if (model1) {
      return this.formReactive.get(model).get(model1).invalid && this.formReactive.get(model).get(model1).touched;
    }
    return this.formReactive.get(model).invalid && this.formReactive.get(model).touched;
  }

  getHobbies(): FormArray {
    return this.formReactive.get('hobbies') as FormArray;
  }

  addHobby(hobby: string) {
    if (hobby.length > 0) {
      this.getHobbies().push(this.formBuilder.control(hobby));
    }
  }

  deleteHobby(index: number) {
    const i = index;
    this.getHobbies().removeAt(i);
  }

}

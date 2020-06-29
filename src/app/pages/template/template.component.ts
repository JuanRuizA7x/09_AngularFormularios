import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CountrieModel } from '../../models/countrie.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  user = {
    name: '',
    lastName: '',
    email: '',
    countrie: '',
    gender: ''
  };

  countries: CountrieModel[] = [];

  constructor( private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => this.countries = countries);
  }

  save( form: NgForm) {

    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
          control.markAllAsTouched();
      });
      return;
    }
    console.log(form);
    console.log(form.value);
    alert('Formulario enviado');
  }

}

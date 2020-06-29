import { Injectable } from '@angular/core';
import { FormControl, FormGroup, EmailValidator } from '@angular/forms';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  // Validador personalizado que no permite ingresar <<Herrera>> en el campo <<Apellido>>
  noHerrera(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      };
    }
    return null;
  }

  // Validador personalizado que revisa que las contraseñas ingresadas coincidan
  samePasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass2Control.value.length > 0) {
        if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null);
        } else {
          pass2Control.setErrors({
            notEquals: true
          });
        }
      }
    };
  }

  // Validador personalizado que evita ingresar un usuario existente
  existingUser(control: FormControl): Promise<any> {

    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verifica si el usuario ingresado es igual a un usuario de prueba
        if (control.value === 'UserTest') {
          resolve({exists: true});
        } else{
          resolve(null);
        }
      }, 3500);
    });
  }
}

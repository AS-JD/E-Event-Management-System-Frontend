import { Component} from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = { username: null,
  email: null,
  password: null
};
    isSuccessful = false;
    isSignUpFailed = false;
  errorMessage: string="";

constructor( private authenticationService:AuthService) {
}


onSubmit():void {
    const { username, email, password } = this.form;

    this.authenticationService.register(username, email, password).subscribe({
        next: data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
        },
        error: err => {
            if (err?.status === 409) {
                this.errorMessage = 'Username already exist.';
                this.isSignUpFailed = true;

            } else {
                this.errorMessage = 'Unexpected error occurred. Error is ' + err?.errorMessage;
                this.isSignUpFailed = true;

                console.log(err);
            }
        }
    });
  }

}

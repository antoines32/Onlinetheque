import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.emailCtrl = formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordCtrl = formBuilder.control(
      '', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.authService.createUser(email, password).then(
      () => { this.router.navigate(['/books']); },
      (error) => { this.errorMessage = error; }
    );
  }
}

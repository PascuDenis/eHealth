import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  forgottenPasswordForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }


  ngOnInit(): void {
  }

  createForm() {
    this.forgottenPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  forgottenPassword(value) {
    console.log(value);

    if (!value.email) {
      alert('insert an email');
    }

    this.authService.passwordReset(value.email)
      .then(() => alert('A password reset link has been send to your email address'),
        (rejectionReason) => alert(rejectionReason))
      .catch(e => alert('An error occurred while attempting to reset your password'));

  }
}

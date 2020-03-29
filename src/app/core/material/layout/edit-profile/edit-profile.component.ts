import { Component, OnInit } from '@angular/core';
import { Specialists } from 'src/app/model/Specialists';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpecialistService } from 'src/app/core/services/specialist.service';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileImage = null;
  profileImageUrl = null;
  specialist: Specialists;

  editProfileForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    drId: new FormControl(''),
    specialization: new FormControl(''),
    telephoneNumber: new FormControl(''),
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('')
  });

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
  })

  constructor(
    private specialistService: SpecialistService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.specialistService.getSpecialistById(this.authService.getAuth().currentUser.uid)
      .pipe(
        tap(user => {
          this.editProfileForm.patchValue(user)
        })
      )
      .subscribe(
        user => {
          // this.specialist = user;
          console.log(user);
          this.profileImageUrl = user.profilePicturePath;
        })
  }

  createForm() {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      email: ['', Validators.required],
      drId: [''],
      specialization: [''],
      telephoneNumber: ['', Validators.required],
      streetAddress: [''],
      city: [''],
      state: ['']
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  updateProfile(value) {
    this.specialistService.update(this.authService.getAuth().currentUser.uid, value);
  }

  changePassword(value) {
    this.authService.passwordChange(value);
  }

  uploadProfilePicture(event) {
    this.profileImage = <File>event.target.files[0];
    console.log(event)
    this.specialistService.uploadProfileImage(this.authService.getAuth().currentUser.uid, this.profileImage);
  }

  openInput() {
    document.getElementById("fileInput").click();
  }
}

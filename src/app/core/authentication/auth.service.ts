import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpecialistService } from '../services/specialist.service';
import { Specialists } from 'src/app/model/Specialists';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router, private specialistService: SpecialistService) {
    this.afAuth.authState.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          localStorage.removeItem('currentUserId')
          localStorage.setItem('currentUserId', user.uid);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  getAuth() {
    return this.afAuth.auth;
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          this.specialistService.checkIfSpecialistExists(
            res.user.uid,
            res.user.email,
            res.user.displayName
          )
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          this.specialistService.checkIfSpecialistExists(
            res.user.uid,
            res.user.email,
            res.user.displayName
          )
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          console.log(value.email + ' ' + value.drId);
          this.specialistService.save(res.user.uid, value.email, value.drId);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      }
      else {
        reject();
      }
    });
  }

  passwordReset(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(
      email,
      { url: 'http://localhost:4200/login' });
  }

  passwordChange(value) {
    if (value.newPassword != value.confirmNewPassword) {
      alert("The password don't match!");
      return null;
    } else {
      return this.afAuth.auth.currentUser.updatePassword(value.newPassword).then(function () {
        console.log('success');
      }).catch(function (error) {
        alert(error);
      })
    }
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.afAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}


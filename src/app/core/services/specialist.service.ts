import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { ISpecialists } from "src/app/model/iSpecialists";
import * as firebase from "firebase";
import { Specialists } from "src/app/model/Specialists";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class SpecialistService {
  private specialistUrl = "specialists/";
  private specialistProfilePictureStorageUrl = "specialist-profile-image/";
  specialists$: Observable<ISpecialists[]>;

  constructor(
    private database: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {}

  getAllSpecialists(): Observable<ISpecialists[]> {
    return this.database.list<ISpecialists>(this.specialistUrl).valueChanges();
  }

  getSpecialistById(id: string): Observable<ISpecialists> {
    return this.database
      .object<ISpecialists>(this.specialistUrl + id)
      .valueChanges();
  }

  getSpecialistByName(name: string): Observable<ISpecialists[]> {
    return this.database
      .list<ISpecialists>(this.specialistUrl, ref =>
        ref
          .orderByChild("name")
          .startAt(name)
          .endAt(name + "\uf8ff")
      )
      .valueChanges();
  }

  checkIfSpecialistExists(id: string, email: string, name: string) {
    firebase
      .database()
      .ref(this.specialistUrl)
      .orderByChild("email")
      .equalTo(email)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          const specialist = snapshot.val();
          console.log("user already exists", specialist);
        } else {
          console.log("user dosen't exist");
          this.save(id, email, name);
        }
      });
  }

  save(id: string, email: string, name: string) {
    let defaultProfilePicture =
      "https://firebasestorage.googleapis.com/v0/b/learnwithme-d7e6f.appspot.com/o/specialist-profile-image%2Fdefault-picture.png?alt=media&token=4fa0ad26-0b9a-4bff-a98d-96172e127f2a";
    let specialistUser: Specialists = {
      id: id,
      name: name,
      username: null,
      email: email,
      drId: null,
      specialization: null,
      telephoneNumber: null,
      streetAddress: null,
      city: null,
      state: null,
      profilePicturePath: defaultProfilePicture,
      isOnline: false
    };
    const promise = firebase
      .database()
      .ref(this.specialistUrl + id)
      .set(specialistUser);
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }

  delete(userId: string) {
    const promise = this.database.object(this.specialistUrl + userId).remove();
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }

  update(userId: string, user: Specialists) {
    const promise = this.database
      .object(this.specialistUrl + userId)
      .set(
        new Specialists(
          userId,
          user.name,
          user.username,
          user.email,
          user.drId,
          user.specialization,
          user.telephoneNumber,
          user.streetAddress,
          user.city,
          user.state,
          null,
          true
        )
      );
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }

  public uploadProfileImage(currentUserUid: string, profileImage: File) {
    this.storage
      .ref(this.specialistProfilePictureStorageUrl)
      .child(currentUserUid)
      .put(profileImage)
      .then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        uploadSnapshot.ref.getDownloadURL().then(downloadUrl => {
          this.database
            .object<Specialists>(this.specialistUrl + currentUserUid)
            .update({ profilePicturePath: downloadUrl });
          this.afAuth.auth.currentUser.photoURL = downloadUrl;
          console.log(downloadUrl);
        });
      })
      .then(
        res => {
          console.log("Upload successful" + res);
        },
        err => {
          console.log("Upload error" + err);
        }
      );
  }
}

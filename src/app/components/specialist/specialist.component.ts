import { Component, OnInit, Input } from '@angular/core';
import { SpecialistService } from 'src/app/core/services/specialist.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISpecialists } from 'src/app/model/iSpecialists';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.css']
})
export class SpecialistComponent implements OnInit {

  @Input() specialist: ISpecialists
  ngOnInit(): void {
  }

  loginForm: FormGroup;
  specialistsRef: AngularFireList<any>;
  specialists: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.specialistsRef = db.list('specialists');
    // Use snapshotChanges().map() to store the key
    this.specialists = this.specialistsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addItem(newName: string) {
    this.specialistsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.specialistsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.specialistsRef.remove(key);
  }
  deleteEverything() {
    this.specialistsRef.remove();
  }

  onSubmit(value: any) {
    //get the value by its property
    console.log("first name: " + value.firstName);
    console.log("last name: " + value.lastName);
    console.log("usermane: " + value.usermane);
    console.log("Email: " + value.email);
    console.log("drId: " + value.drId);
  }
}



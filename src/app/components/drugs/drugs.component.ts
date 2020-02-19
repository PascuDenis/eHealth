import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireObject, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DrugsService } from 'src/app/core/services/drugs.service';


@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})

export class DrugsComponent implements OnInit {


  sideEffects: Observable<any[]>;
  drugs: Observable<any[]>;
  drug: Observable<any>;
  itemRef: AngularFireObject<any>;

  // constructor(private drugService: DrugsService) { }

  // ngOnInit(): void {
  //   console.log("ng")
  //   this.getDrugs();
  // }

  // getDrugs(): void {

  //   console.log("service")
  //   this.drugService.getDrugs()
  //     .subscribe(drugs => this.drugs = drugs.slice(1, 15));
  // }

  constructor(private service: DrugsService) {
    // this.drugs = service.getAllDrugs();
    // this.drug = service.getDrugWithName('Triavil');
    // this.sideEffects = service.getSideEffectsForDrugName("A&D Jr.");
    // this.sideEffects = service.getInterractionsForDrugName("A + D Cracked Skin Relief");

    // console.log("done")
    // this.db.object('sideEffects/Triavil').snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key)
    //   console.log(action.payload.val())
    // });
  }

  ngOnInit() {
  }
}

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { IDrugs } from "src/app/model/iDrugs";

@Injectable({
  providedIn: "root",
})
export class DrugsService {
  private drugsUrl = "drugs/";
  private sideEffectsUrl = "sideEffects/";
  private interractionsUrl = "interractions/";

  drugs$: Observable<IDrugs[]>;
  drug: IDrugs;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private database: AngularFireDatabase) {}

  getAllDrugs(): Observable<IDrugs[]> {
    return this.database.list<IDrugs>(this.drugsUrl).valueChanges();
  }

  getDrugWithName(term: string): Observable<IDrugs> {
    term = term.replace(/[\/.#$]/g, "");
    return this.database.object<IDrugs>(this.drugsUrl + term).valueChanges();
  }

  getDrugsWithName(drugName: string): Observable<any[]> {
    drugName = drugName.replace(/[\/.#$]/g, "");
    return this.database
      .list(this.drugsUrl, (ref) =>
        ref
          .orderByKey()
          .startAt(drugName)
          .endAt(drugName + "\uf8ff")
      )
      .valueChanges();
  }

  getSideEffectsForDrugName(drugName: string): Observable<any[]> {
    drugName = drugName.replace(/[\/.#$]/g, "");
    return this.database.list(this.sideEffectsUrl).valueChanges();
  }

  getInterractionsForDrugName(drugName: string): Observable<any[]> {
    drugName = drugName.replace(/[\/.#$]/g, "");
    return this.database.list(this.interractionsUrl + drugName).valueChanges();
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

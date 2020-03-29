import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Pacients } from "src/app/model/Pacients";
import { PacientService } from "src/app/core/services/pacient.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pacients",
  templateUrl: "./pacients.component.html",
  styleUrls: ["./pacients.component.css"]
})
export class PacientsComponent implements OnInit {
  pacients: Pacients[] = [];
  displayedColumns: string[] = ["profilePicturePath", "name", "age", "email"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private pacientService: PacientService, public router: Router) {
    this.displayPacients();
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.age
          .toString()
          .toLowerCase()
          .includes(filter) ||
        data.email.toString().includes(filter)
      );
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  click(value) {
    console.log("row clicked" + value.id);
  }

  displayPacients() {
    this.pacientService.getAllPacients().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      console.log(this.dataSource);
      console.log(this.dataSource.sort);
      console.log(this.dataSource.paginator);
    });
  }

  trackByUid(index, item) {
    return item.uid;
  }
}

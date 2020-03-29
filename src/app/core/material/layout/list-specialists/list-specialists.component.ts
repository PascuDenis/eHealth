import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SpecialistService } from 'src/app/core/services/specialist.service';
import { Specialists } from 'src/app/model/Specialists';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-specialists',
  templateUrl: './list-specialists.component.html',
  styleUrls: ['./list-specialists.component.css']
})
export class ListSpecialistsComponent implements OnInit {
  spanSize = 4;
  isHidden = false;
  specialists: Specialists[] = [];

  searchBarFrom = new FormGroup({
    search: new FormControl('')
  })
  // = [
  //   {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01adadasdsd',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   },
  //   {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01sadasds',
  //     specialisation: 'Specialization1sadasdsa',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   }, {
  //     profilePicture: 'http://i.pravatar.cc/300',
  //     name: 'Name Name01',
  //     specialisation: 'Specialization1',
  //     rating: '5'
  //   },
  // ]

  constructor(
    public router: Router,
    public specialistService: SpecialistService,
    private fb: FormBuilder
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/specialist-details') {
          console.log(this.isHidden);
          this.isHidden = true;
        } else {
          console.log(this.isHidden);
          this.isHidden = false;
        }
      }
    });
    this.displaySpecialists();
  }

  ngOnInit(): void {
    this.createForm();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const twoRow = 750;
    const threeRow = 980;
    const fourRow = 1300;

    if (innerWidth <= twoRow) {
      this.spanSize = 1;
    } else if (innerWidth > twoRow && innerWidth <= threeRow) {
      this.spanSize = 2;
    } else if (innerWidth > threeRow && innerWidth <= fourRow) {
      this.spanSize = 3;
    } else if (innerWidth > fourRow) {
      this.spanSize = 4;
    }
  }

  createForm() {
    this.searchBarFrom = this.fb.group({
      search: [''],
    });
  }

  displaySpecialists() {
    this.specialistService.getAllSpecialists()
      .subscribe(specialist => {
        this.specialists = specialist;
      });
  }

  search(value) {
   this.specialistService.getSpecialistByName(value.search)
    .subscribe(specialist => {
      this.specialists = specialist;
    });
  }

  toggleDiv() {
    this.isHidden = true;
  }
}

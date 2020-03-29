import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { SpecialistService } from 'src/app/core/services/specialist.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specialist-details',
  templateUrl: './specialist-details.component.html',
  styleUrls: ['./specialist-details.component.css']
})
export class SpecialistDetailsComponent implements OnInit {
  userId;


  private routeSub: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

import { NgModule } from '@angular/core';

import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatBadgeModule} from '@angular/material/badge';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavService } from './side-nav/side-nav.service';
import { TogglerComponent } from './side-nav/toggler/toggler.component';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './side-nav/first/first.component';
import { SecondComponent } from './side-nav/second/second.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/app/app-routing.module';
import { HomeComponent } from './layout/home/home.component';

const materials = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  LayoutModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatBadgeModule,
]

@NgModule({
  declarations: [
    SideNavComponent, 
    LayoutComponent, TogglerComponent, 
  ],
  imports: [
    materials,
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    materials, 
    SideNavComponent, 
    LayoutComponent,
    CommonModule
  ],
  providers:[
    SideNavService,
  ]
})
export class MaterialModule {}
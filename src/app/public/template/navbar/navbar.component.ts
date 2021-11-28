
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionData } from 'src/app/models/session-data.model';
import { SecurityService } from 'src/app/services/shared/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  session: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(private securityService: SecurityService) { 

  }


  ngOnInit(): void {
    this.subscription = this.securityService.GetSessionStatus().subscribe(
      {
        next: (data: SessionData) => {
          this.session = data.isLoggedIn;
        },
        error: (err) => {

        }
      }
    );
  }

}
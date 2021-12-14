import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionData } from 'src/app/models/session-data.model';
import { SecurityService } from 'src/app/services/shared/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_data: string = "";

  subscription: Subscription = new Subscription();
  constructor(private securityService: SecurityService) {

  }

  ngOnInit(): void {
    this.subscription = this.securityService.GetSessionStatus().subscribe(
      {
        next: (data: SessionData) => {
          console.log("from header")
          if (data.usuario?.nombre) {
            this.user_data = data.usuario?.nombre;
          }
        },
        error: (err) => { 
          
        }
      }
    );
  }

}

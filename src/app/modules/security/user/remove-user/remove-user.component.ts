import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { UserData } from 'src/app/models/user-data.model';
import { UserService } from '../../user.service';
declare const OpenGeneralMessageModal: any;
@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  id: string = "";
  name: string = "";

  constructor(
    private router: Router,
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord() {
    let id = this.route.snapshot.params["id"]
    this.service.SearchRecord(id).subscribe({
      next: (data: UserData) => {
   
        if (data._id && data.nombre) {
          this.id = data._id;
          this.name = data.nombre;
          
        }
      }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: UserData) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/security/user-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { proponentService } from 'src/app/services/proponent/proponent.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-proponent',
  templateUrl: './remove-proponent.component.html',
  styleUrls: ['./remove-proponent.component.css']
})
export class RemoveProponentComponent implements OnInit {
  id: number = 0;
  firstName: string = "";
  otherName: string ="";
  firstLastName: string = "";
  otherLastName: string ="";

  constructor(
    private router: Router,
    private service: proponentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponentModel) => {
        if (data.id && data.primerNombre && data.otroNombre && data.primerApellido && data.otroApellido) {
          this.id = data.id;
          this.firstName = data.primerNombre;
          this.otherName = data.otroNombre;
          this.firstLastName = data.primerApellido;
          this.otherLastName = data.otroApellido;
        }
      }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ProponentModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/proponent/proponent-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { CommitteeService } from 'src/app/services/parameters/committee.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-committee',
  templateUrl: './remove-committee.component.html',
  styleUrls: ['./remove-committee.component.css']
})
export class RemoveCommitteeComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";


  constructor(
    private router: Router,
    private service: CommitteeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: CommitteeModel) => {
        if(data.id && data.nombre){
          this.id = data.id;
          this.nombre = data.nombre;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: CommitteeModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/committee-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
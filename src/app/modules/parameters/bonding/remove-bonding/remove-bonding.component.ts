import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
import { BondingService } from 'src/app/services/parameters/bonding.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-bonding',
  templateUrl: './remove-bonding.component.html',
  styleUrls: ['./remove-bonding.component.css']
})
export class RemoveBondingComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";


  constructor(
    private router: Router,
    private service: BondingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: BondingModel) => {
        if(data.id && data.nombre){
          this.id = data.id;
          this.nombre = data.nombre;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: BondingModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/bonding-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
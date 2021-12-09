import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-line-of-research',
  templateUrl: './remove-line-of-research.component.html',
  styleUrls: ['./remove-line-of-research.component.css']
})
export class RemoveLineOfResearchComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";


  constructor(
    private router: Router,
    private service: LineOfResearchService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: LineOfResearchModel) => {
        if(data.id && data.nombre){
          this.id = data.id;
          this.nombre = data.nombre;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: LineOfResearchModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/line-of-research-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
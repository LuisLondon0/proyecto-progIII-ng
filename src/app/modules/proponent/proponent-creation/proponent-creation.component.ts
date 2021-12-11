import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { proponentService } from 'src/app/services/proponent/proponent.service';
import { BondingService } from 'src/app/services/parameters/bonding.service';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
//import { BrandService } from 'src/app/services/parameters/typeVinculation.service';
//import { CategoryService } from 'src/app/services/parameters/department.service';
//import { ProponentService } from 'src/app/services/proponent/proponent.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-proponent-creation',
  templateUrl: './proponent-creation.component.html',
  styleUrls: ['./proponent-creation.component.css']
})
export class ProponentCreationComponent implements OnInit {

  //departmentList: DepartmentModel[] = [];
  bondingList: BondingModel[] = [];
  dataForm: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.MS_BONDING_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: proponentService,
    private bondingService: BondingService,
  ) { }

  ngOnInit(): void {

    this.CreateForm();
    this.CreateFormFile();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects() {
    this.bondingService.GetRecordList().subscribe(
      {
        next: (data: BondingModel[]) => {
          this.bondingList = data;
          setTimeout(() => {

            InitSelectById("selBonding");
          }, 100);
        }
      }
    );

    //this.departmentService.GetRecordList().subscribe(
    //  {
    //    next: (data: DepartmentModel[]) => {
    //      this.departmentList = data;
    //      setTimeout(() => {
    //        InitSelectById("selDepartment");
    //      }, 100);
    //    }
    //  }
    //);
  }

  CreateForm() {
    this.dataForm = this.fb.group({
      document: [ [Validators.required]],
      firstName: ["", [Validators.required]],
      otherName: ["", [Validators.required]],
      firstLastName: ["", [Validators.required]],
      otherLastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: [ [Validators.required]],
      typeVinculationId: [ [Validators.required]],
      department: ["", [Validators.required]],
      main_image:["", [Validators.required]],
    });

  }

  CreateFormFile(){
    this.formFile = this.fb.group({
      file:["", []]
    });
  }

  SaveRecord() {
    let model = new ProponentModel();
    let departmentId = 0;
    model.documento = this.dataForm.controls["document"].value;
    model.primerNombre = this.dataForm.controls["firstName"].value;
    model.otroNombre = this.dataForm.controls["otherName"].value;
    model.primerApellido = this.dataForm.controls["firstLastName"].value;
    model.otroApellido = this.dataForm.controls["otherLastName"].value;
    model.celular = this.dataForm.controls["phone"].value;
    model.correo = this.dataForm.controls["email"].value;
    model.tipoVinculacionId = parseInt(this.dataForm.controls["typeVinculationId"].value);
    model.foto = this.dataForm.controls["main_image"].value;
    console.log(model, departmentId, "Holaa")
    this.service.SaveRecord(model).subscribe({
      next: (data: ProponentModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/proponent/proponent-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

  OnchangeInputFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formFile.controls["file"].setValue(file);
    }
  }

  UploadImage(){
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.service.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) =>{
        this.dataForm.controls["main_image"].setValue(data.filename)
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }

}

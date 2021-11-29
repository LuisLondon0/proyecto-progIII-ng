import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { TypeVinculationModel } from 'src/app/models/parameters/type-vinculation.model';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { UploadedFileModel } from 'src/app/models/proponent/uploaded.file.model';
import { proponentService } from 'src/app/services/proponent/proponent.service';
import { typeVinculationService } from 'src/app/services/parameters/type-vinculation.service';
import { departmentService } from 'src/app/services/parameters/department.service';
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

  departmentList: DepartmentModel[] = [];
  typeVinculationList: TypeVinculationModel[] = [];
  dataForm: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.MS_VINCULACION_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: proponentService,
    private typeVinculationService: typeVinculationService,
    private departmentService: departmentService
  ) { }

  ngOnInit(): void {

    this.CreateForm();
    this.CreateFormFile();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects() {
    this.typeVinculationService.GetRecordList().subscribe(
      {
        next: (data: TypeVinculationModel[]) => {
          console.log(data)
          this.typeVinculationList = data;
          setTimeout(() => {

            InitSelectById("selTypeVinculation");
          }, 100);
        }
      }
    );

    this.departmentService.GetRecordList().subscribe(
      {
        next: (data: DepartmentModel[]) => {
          this.departmentList = data;
          setTimeout(() => {
            InitSelectById("selDepartment");
          }, 100);
        }
      }
    );
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
    model.documento = this.dataForm.controls["document"].value;
    model.primerNombre = this.dataForm.controls["firstName"].value;
    model.otroNombre = this.dataForm.controls["otherName"].value;
    model.primerApellido = this.dataForm.controls["firstLastName"].value;
    model.otroApellido = this.dataForm.controls["otherLastName"].value;
    model.celular = this.dataForm.controls["phone"].value;
    model.correo = this.dataForm.controls["email"].value;
    model.tipoVinculacionId = parseInt(this.dataForm.controls["typeVinculationId"].value);
    model.main_image = this.dataForm.controls["main_image"].value;
    console.log("holi", this.dataForm.controls["typeVinculationId"].value, model.tipoVinculacionId)
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

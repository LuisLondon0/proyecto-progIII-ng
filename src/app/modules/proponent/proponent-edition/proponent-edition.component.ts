import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { TypeVinculationModel } from 'src/app/models/parameters/type-vinculation.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { UploadedFileModel } from 'src/app/models/proponent/uploaded.file.model';
import { departmentService } from 'src/app/services/parameters/department.service';
import { typeVinculationService } from 'src/app/services/parameters/type-vinculation.service';
import { proponentService } from 'src/app/services/proponent/proponent.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-proponent-edition',
  templateUrl: './proponent-edition.component.html',
  styleUrls: ['./proponent-edition.component.css']
})
export class ProponentEditionComponent implements OnInit {

  departmentList: DepartmentModel[] = [];
  typeVinculationList: TypeVinculationModel[] = [];
  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;
  url: string= GeneralData.MS_VINCULACION_URL;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: proponentService,
    private route: ActivatedRoute,
    private typeVinculationService: typeVinculationService,
    private departmentService: departmentService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
    this.GetOptionsToSelects();
    this.CreateFormFile();
  }


  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      document: [ [Validators.required]],
      firstName: ["", [Validators.required]],
      otherName: ["", [Validators.required]],
      firstLastName: ["", [Validators.required]],
      otherLastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: [ [Validators.required]],
      typeVinculationId: ["", [Validators.required]],
      department: ["", [Validators.required]],
      main_image:["", [Validators.required]]
    });
  }

  CreateFormFile(){
    this.formFile = this.fb.group({
      file:["", []]
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponentModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["name"].setValue(data.primerNombre);
        this.form.controls["document"].setValue(data.documento);
        this.form.controls["firstName"].setValue(data.primerNombre);
        this.form.controls["otherName"].setValue(data.otroNombre);
        this.form.controls["firstLastName"].setValue(data.primerApellido);
        this.form.controls["otherLastName"].setValue(data.otroApellido);
        this.form.controls["phone"].setValue(data.celular);
        this.form.controls["email"].setValue(data.correo);
        this.form.controls["typeVinculationId"].setValue(data.tipoVinculacion);
        this.form.controls["main_image"].setValue(data.foto);
      }
    });
  }

  SaveRecord() {
    let model = new ProponentModel();
    model.documento = this.form.controls["document"].value;
    model.primerNombre = this.form.controls["firstName"].value;
    model.otroNombre = this.form.controls["otherName"].value;
    model.primerApellido = this.form.controls["firstLastName"].value;
    model.otroApellido = this.form.controls["otherLastName"].value;
    model.celular = this.form.controls["phone"].value;
    model.correo = this.form.controls["email"].value;
    model.tipoVinculacionId = parseInt(this.form.controls["typeVinculationId"].value);
    model.foto = this.form.controls["main_image"].value;
    model.id = this.form.controls["id"].value;
    this.service.EditRecord(model).subscribe({
      next: (data: ProponentModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/proponent/proponent-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

UploadImage(){
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.service.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) =>{
        this.form.controls["main_image"].setValue(data.filename)
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }

OnchangeInputFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formFile.controls["file"].setValue(file);
    }
  }

GetOptionsToSelects() {
    this.typeVinculationService.GetRecordList().subscribe(
      {
        next: (data: TypeVinculationModel[]) => {
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

}

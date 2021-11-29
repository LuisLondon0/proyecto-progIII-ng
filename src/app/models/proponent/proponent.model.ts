import { TypeVinculationModel } from "../parameters/type-vinculation.model";
import { DepartmentModel } from "../parameters/department.model";

export class ProponentModel {
    id?: number;
    documento?: number;
    primerNombre?: string;
    otroNombre?: string;
    primerApellido?: string;
    otroApellido?: string;
    correo?: string;
    celular?: number;
    tipoVinculacionId?: number;
    foto?: string;
    tipoVinculacion?: TypeVinculationModel;
    departamento?: DepartmentModel[];
}

import { TypeVinculationModel } from "../parameters/type-vinculation.model";
import { DepartmentModel } from "../parameters/department.model";

export class ProponentModel {
    id?: number;
    documento?: string;
    primerNombre?: string;
    otroNombre?: string;
    primerApellido?: string;
    otroApellido?: string;
    correo?: string;
    celular?: number;
    tipoVinculacionId?: number;
    main_image?: string;
    tipoVinculacion?: TypeVinculationModel;
    departamento?: DepartmentModel[];
}

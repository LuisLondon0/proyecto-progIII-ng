import { BondingModel } from "../parameters/bonding.model";
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
    tipoVinculacion?: BondingModel;
    departamentos?: DepartmentModel[];
}

import { BondingModel } from "../parameters/bonding.model";

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
    //departamento?: DepartmentModel[];
}

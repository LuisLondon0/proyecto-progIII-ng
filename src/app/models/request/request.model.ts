import { CommitteeModel } from "../parameters/committee.model";
import { ModalityModel } from "../parameters/modality.model";
import { TypeOfRequestModel } from "../parameters/type-of-request.model";

export class RequestModel{
    id?: number;
    fecha?: string;
    nombreTrabajo?: string;
    modalidadId?: number;
    areaInvestigacionId?: number;
    archivoZip?: string;
    descripcion?: string;
    tipoSolicitudId?: number;
    proponenteId?: number;
    tipoSolicitud?: TypeOfRequestModel;
    modalidad?: ModalityModel;
    comites?: CommitteeModel[];
    //proponents?: ProponentModel[];
}
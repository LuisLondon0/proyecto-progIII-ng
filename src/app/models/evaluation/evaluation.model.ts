import { RequestModel } from "../request/request.model";

export class EvaluationModel{
    id?: number;
    solicitudId?: number;
    fechaInvitacion?: string;
    fechaRespuesta?: string;
    respuesta?: number;
    observaciones?: string;
    juradoId?: number;
    jurado?: string;
    solicitud?: RequestModel;
}
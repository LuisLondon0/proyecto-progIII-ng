import { LineOfResearchModel } from "./line-of-research.model";

export class JuryModel{
    id?: number;
    nombre?: string;
    apellidos?: string;
    correo?: string;
    entidad?: string;
    telefono?: string;
    lineaInvestigacions?: LineOfResearchModel[];
}
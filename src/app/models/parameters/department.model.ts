import { FacultyModel } from "./faculty.model";

export class DepartmentModel {
    id?: number;
    nombre?: string;
    facultadId?: number;
    facultad?: FacultyModel;
}

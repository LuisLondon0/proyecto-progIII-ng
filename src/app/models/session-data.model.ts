import { UserData } from "./user-data.model";

export class SessionData{
    token?: string;
    usuario?: UserData;
    isLoggedIn: boolean = false;
}
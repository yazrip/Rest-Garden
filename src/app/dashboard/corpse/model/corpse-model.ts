import { Grave } from "../../grave/model/grave-model";

export interface Corpses{
    id: string,
    name: string,
    parentName: string,
    location: string,
    grave: Grave,
    birthDate: Date,
}
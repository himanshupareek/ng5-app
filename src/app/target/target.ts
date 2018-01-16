import { TargetStatus } from "./targetStatus";

export class Target {
    constructor(public status : string, public companyInfo : string,
                public KeyContacts : number, public financialPerformance: string){

                }
}

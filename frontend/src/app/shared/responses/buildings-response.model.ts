import { BaseResponse } from "./base-response.model";
import { Building } from "./building.model";

export class BuildingsResponse extends BaseResponse {
    constructor(public success: boolean, public buildings: Building[]) {
        super(success);
    }

}

import { BaseResponse } from "./base-response.model";

export class LoginResponse extends BaseResponse {
    constructor(public success: boolean, public token: string) {
        super(success);
    }

}

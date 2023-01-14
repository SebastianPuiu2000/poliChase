import { BaseResponse } from "./base-response.model";

export class UserResponse extends BaseResponse {
    constructor(public success: boolean, public name: string, public email: string, public color: string) {
        super(success);
    }

}

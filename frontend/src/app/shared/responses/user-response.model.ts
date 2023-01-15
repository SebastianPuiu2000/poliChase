import { BaseResponse } from "./base-response.model";
import { User } from "../user.model";

export class UserResponse extends BaseResponse {
    constructor(public success: boolean, public user: User) {
        super(success);
    }
}

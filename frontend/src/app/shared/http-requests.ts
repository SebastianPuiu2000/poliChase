import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "./responses/base-response.model";
import { BACKEND_URL } from "./constants";
import {BuildingsResponse} from "./responses/buildings-response.model";
import axios from "axios";
import {UserResponse} from "./responses/user-response.model";

export class HttpRequests {
    static token: string;

    static setToken(token: string): void {
        this.token = token;
    }

    static changeColor(color: string): Promise<BaseResponse> {
        return axios.post(BACKEND_URL + '/color' + `?token=${this.token}`, {
            color: color
        })
        .then(response => {
        return response.data;
        })
        .catch(error => {
        console.error(error);
        });
    }

    static getBuildings(): Promise<BuildingsResponse> {
        return axios.get(BACKEND_URL + '/buildings' + `?token=${this.token}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    static getUserInfo(): Promise<UserResponse> {
        return axios.get(BACKEND_URL + '/info' + `?token=${this.token}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

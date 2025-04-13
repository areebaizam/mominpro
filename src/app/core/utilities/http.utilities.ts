import { HttpResponseModel } from "@core/models";

export function getResult<T>(resp: HttpResponseModel<T>): T | null {
    return resp.status.isSuccess ? resp.next : null;
}
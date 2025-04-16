import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiURL, HttpResponseModel } from '@core/models';
import { OrgRequestModel,AddOrgResponseModel, GetOrgResponseModel } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private http = inject(HttpClient);

  //Add
  createOrganisation(req: OrgRequestModel):Observable<HttpResponseModel<AddOrgResponseModel>>{
    return this.http.post<HttpResponseModel<AddOrgResponseModel>>(ApiURL.getOrganisationUrl,req)
  }
  //update
  updateOrganisation(orgId:string, req: OrgRequestModel):Observable<HttpResponseModel<{}>>{
    return this.http.put<HttpResponseModel<{}>>(`${ApiURL.getOrganisationUrl}/${orgId}`,req)
  }
  //Get
  getOrganisation():Observable<HttpResponseModel<GetOrgResponseModel>>{
    return this.http.get<HttpResponseModel<GetOrgResponseModel>>(ApiURL.getOrganisationUrl)
  }
}

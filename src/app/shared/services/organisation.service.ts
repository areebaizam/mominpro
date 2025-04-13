import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiURL, HttpResponseModel } from '@core/models';
import { AddOrgRequestModel,AddOrgResponseModel, GetOrgResponseModel } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private http = inject(HttpClient);

  //Add
  addOrganisation(req: AddOrgRequestModel):Observable<HttpResponseModel<AddOrgResponseModel>>{
    return this.http.post<HttpResponseModel<AddOrgResponseModel>>(ApiURL.getOrganisationUrl,req)
  }
  //Get
  getOrganisation():Observable<HttpResponseModel<GetOrgResponseModel>>{
    return this.http.get<HttpResponseModel<GetOrgResponseModel>>(ApiURL.getOrganisationUrl)
  }
}

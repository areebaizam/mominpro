export interface CoordinateModel {
    latitude: number;
    longitude: number;
    timezoneId: string;
}
export interface AddressModel {
    address?: string;
    city?: string;
    state?: string;
    code?: string;
    country?: string;
}
export interface ContactModel{
    phone?: string;
    email?: string;
    website?: string;
}

export interface InformationModel {    
    name: string;
    alternateId: string;
}

export interface InformationIdModel extends InformationModel {
    organisationId: string;
}

export interface OrganisationDetailModel {
    coordinate: CoordinateModel;
    address:AddressModel | null;
    contact: ContactModel | null;
}
//Add & Update
export interface OrgRequestModel extends OrganisationDetailModel{
    information: InformationModel;//no Org ID
}
export interface AddOrgResponseModel{
    organisationId: string;
}
//Get
export interface GetOrgResponseModel extends OrganisationDetailModel{
    information: InformationIdModel;
}



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

export interface InformationResponseModel extends InformationModel {
    organisationId: string;
}

export interface OrgRequestResponseModel {
    coordinate: CoordinateModel;
    address:AddressModel | null;
    contact: ContactModel | null;
}
//Add
export interface AddOrgRequestModel extends OrgRequestResponseModel{
    information: InformationModel;
}
export interface AddOrgResponseModel{
    organisationId: string;
}
//Get
export interface GetOrgResponseModel extends OrgRequestResponseModel{
    information: InformationResponseModel;
}



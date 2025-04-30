export class ClaimType {
    static readonly ROLE            = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    static readonly NAME            = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    static readonly NAME_IDENTIFIER = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    static readonly EMAIL           = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    static readonly GIVEN_NAME      = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
}

export class Role {
    static readonly ADMIN = "Admin";
    static readonly MEMBER = "Member";
    static readonly USER  = "User";
}
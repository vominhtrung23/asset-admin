import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
@Injectable()
export class AssetService {
  constructor(private http: HttpClient) {}
  getPartnerByToken(prj: string, auth_token: any): Observable<any> {
    const requestUrl = `${
      environment.dgContentApiUrl
    }/${prj}/prod/flowsso/validate`;
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth_token}`
    });

    return this.http.get<any>(requestUrl, { headers: httpHeaders });
  }
  
  getAsset(
    token: string,
    prj: string,
    langId: number,
    auth_token: any
  ): Observable<Asset[]> {
    let categoryApiUrl = `${ environment.dgContentApiUrl}/${prj}/prod/flowpromotions/get?getAll=true&langId=${langId}&token=${token}`;
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token
    });
    return this.http.get<Asset[]>(categoryApiUrl, { headers: httpHeaders });
  }
  getflowshowcaseAPI(prj: string, auth_token: any) {
    //http://global.syndication.tiekinetix.net/DgContentApi/api/demo47/prod/flowshowcase/get?token=868b201e7843424027a4b4eeae15d611
    let url = `${environment.dgContentApiUrl}/${prj}/prod/flowshowcase/get?token=${auth_token}`;
    // let httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + auth_token
    // });
    return this.http.get<string>(url);
  }

  getbaseDomainAPI(prj: string, auth_token: any) {
    //https://global.syndication.tiekinetix.net/DgContentApi/api/demo47/prod/companyconsumer/all
    let url = `${environment.dgContentApiUrl}/${prj}/prod/companyconsumer/all`;

    return this.http.get<any>(url);
  }
   getContentcount(prj: string, auth_token: any) {
    let Url = `${environment.dgContentApiUrl}/${prj}/prod/flowpromotions/contentcount`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    })
    return this.http.get(Url, { headers: httpHeaders });
  }
}
export class Asset {
  campaign: string;
  lng: number;
  campaignID: string;
  categories: number[];
  status: string;
  date: string;
  campaignType: string;
  endDate: string;
  desc: string;
  contentUrl: string;
  imageUrl: string;
  otherProperties: FieldValue[];
  constructor() {
    this.otherProperties = [];
  }
}
export class FieldValue {
  fieldName: string;
  valueText: string;
}

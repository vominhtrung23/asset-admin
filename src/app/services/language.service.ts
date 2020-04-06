import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class LanguageService {
 constructor(private http: HttpClient) { }

  getLanguages(prj: string): Observable<Language[]> {
    let url = `${environment.dgContentApiUrl}/${prj}/prod/language/get`;//'https://global.syndication.tiekinetix.net/DgContentApi/api/' + prj + '/prod/language/get';
    return this.http.get<Language[]>(url);
  }
  getCategories(prjName: string, langId: number, dgContentApiUrl: string): Observable<Category[]> {
    let categoryApiUrl = `${dgContentApiUrl}/${prjName}/prod/category/all?languageId=${langId}&getTypeValue=true`;
    // console.log(categoryApiUrl);
    return this.http.get<Category[]>(categoryApiUrl);
  }
}
export class Language {
  id: number;
  languageCode: string;
  description: string;
  active: boolean;
  browserLanguageCode: string;
}
export class Category {
  id: number;
  parentId: number;
  stageId: number;
  name: string;
  depth: number;
  lineAge: string;
  valueText: string;
  count: number;
  shortDescription: string;
  longDescription: string;
  image: string;
  thumbnailImage: string;
  categoryProperties: CategoryProperties[];
  prodCount: number;
  children: Category[];
  options: {};

  constructor() {
    this.categoryProperties = [];
  }
}
export class CategoryProperties {
  fieldName: string;
  valueText: string;
}
import { Component, OnInit, ViewChild } from "@angular/core";
import { LanguageService, Language } from "../../services/language.service";
import { AssetService, Asset } from "../../services/asset.service";
import { environment } from "../../../environments/environment";
import { DialogsService } from "../dialogs/dialogs.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  RoutesRecognized
} from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpHeaders
} from "@angular/common/http";
// import { DatePipe } from '@angular/common';

import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSnackBar
} from "@angular/material";
@Component({
  selector: "app-assettable",
  templateUrl: "./assettable.component.html",
  styleUrls: ["./assettable.component.css"]
})
export class AssettableComponent implements OnInit {
  projectName: string;
  conType:string;
  langID: number = 1;
  supplierID: number = 1;
  contentTypeID: string;
  // contentTypeID: number = 1;
  // disLangID: number;

  langCode: string;
  listLang: Language[];
  supplier: supplier[];
  contentType: contenttype[];
  isLoading = true;
  dgContentApiUrl: string;
  tmpLangId: number = 0;
  token: string;
  dsCategory: any;
  selectedCat = { id: 133, name: "root" };
  isEditModeCat = false;
  categoriestree = [];
  dataSource = new MatTableDataSource();
  filterValues = { status: "all", catId: "" };
  baseDomain: string;
  displayedColumns: string[] = ["campaign", "category", "status", "action"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private assetService: AssetService,
    private langService: LanguageService,
    private dialogService: DialogsService,
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    // private datePipe: DatePipe,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("version 25032020");
    this.supplier = [{ id: 1, description: "default" }];
    this.contentType = [{ id: 1, description: "Asset" },{ id: 2, description: "Campaign" }];
    this.conType =  this.contentType[0].description;
    if (environment.dgContentApiUrl != undefined)
      this.dgContentApiUrl = environment.dgContentApiUrl;
    console.log("this.dgContentApiUrl", this.dgContentApiUrl);
    this.route.queryParams.subscribe(params => {
      console.log("params", params);
      if (params.project != undefined) {
        this.projectName = params.project;
        this.tmpLangId = Number(params.lang);
        this.token = params.token;
        //////////////////
        this.assetService
          .getPartnerByToken(this.projectName, this.token)
          .subscribe(
            partner => {
             
              if (partner != undefined) {
                // let isAdmin =
                //   Array.isArray(partner["Roles"]) &&
                //   (partner["Roles"].indexOf("promoadm:admin") != -1 ||
                //     partner["Roles"].indexOf("portal:admin") != -1);
                // if (isAdmin ||partner.Roles.toString().toLowerCase() == "portal:super-admin") {
                //   console.log(partner.Roles);
                  if (!isNaN(this.tmpLangId) && this.token != undefined) {
                    this.langService
                      .getLanguages(this.projectName)
                      .subscribe(x => {
                        this.listLang = x;
                        console.log("this.listLa", this.listLang);
                        if (
                          this.listLang.find(x => x.id == this.tmpLangId) ==
                            undefined ||
                          this.tmpLangId == undefined
                        ) {
                          this.langID = 1;
                          this.langCode = "EN";
                        } else {
                          this.langID = this.tmpLangId;
                          this.langCode = this.listLang.find(
                            x => x.id == this.tmpLangId
                          ).languageCode;
                        }
                        console.log(
                          "shjsds",
                          this.projectName,
                          this.isLoading,
                          this.token,
                          this.langID,
                          this.dgContentApiUrl
                        );
                        this.isLoading = false;
                        this.assetService
                          .getAsset(
                            this.token,
                            this.projectName,
                            this.langID,
                            this.token
                          )
                          .subscribe(x => {
                            console.log("xxxxxxxxxxxxxxxx", x);
                            this.dataSource.data = x;
                            this.isLoading = false;
                            // this.assetService.getflowshowcaseAPI(this.projectName, this.token).subscribe(resShowcase => {
                            //   if (resShowcase['showcaseUrl'] != undefined || resShowcase['showcaseUrl'] != null) { this.baseDomain = resShowcase['showcaseUrl']; }
                            //   else {
                            //     this.assetService.getbaseDomainAPI(this.projectName, this.token).subscribe(resBaseD => {

                            //       let filterDefaultLanguageId = resBaseD.filter(x => x.defaultLanguageId === this.tmpLangId);
                            //       // console.log('resBasedomain', filterDefaultLanguageId[0].baseDomain);
                            //       this.baseDomain = "https://" + filterDefaultLanguageId[0].baseDomain;
                            //     })
                            //   }
                            // })
                          });
                      });
                  } else if (this.token != undefined) {
                    this.getlanguageId();
                  }
                  this.dataSource.paginator = this.paginator;
                // } else {
                //   this.isLoading = false;
                //   // this.notificationRole();
                //   // this.dialogService.openDialog(
                //   //   "Access denied",
                //   //   "You do not have the right permission to use this module.",
                //   //   "Close"
                //   // );
                // }
              }
            },
            error => {
              console.log(error);
              // this.dialogService.openSnacBar("Error " + error["status"] + " : " + error["statusText"], 10000);
            }
          );

        /////////////////
      }
    });
  }
  
  getlanguageId() {
    this.assetService
      .getContentcount(this.projectName, this.token)
      .subscribe(res => {
        if (res instanceof Array) {
          if (res.length > 0) {
            let arrcontentCount = res.map(x => x.contentCount, []);
            let maxcontentCount = Math.max.apply(Math, arrcontentCount);

            let contentscountmax = res.filter(
              x => x.contentCount == maxcontentCount
            );
            let arrlangmin = contentscountmax.map(x => x.languageId);

            let minlang = Math.min.apply(Math, arrlangmin);
            this.langID = minlang;

            window.location.href =
              window.location.href + `&lang=${this.langID}`;
          } else {
            // this.langID = 1;
            // this.langCode = 'EN';
            window.location.href = window.location.href + `&lang=1`;
          }
        }

        /*
      this.promotionService.getPromotions(this.token, this.projectName, this.langID).subscribe(x => {
        this.dataSource.data = x;
        this.isLoading = false;
      });
      */
      });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  onToggleFilterStatus(status: string) {
    this.dataSource.filterPredicate = this.createFilter();
    this.filterValues["status"] = status.toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  // selectRow(row) {
  //   this.selectedRowIndex = row.cmId;
  // }
  selectContentType($event){
    this.conType = $event.value;
    console.log("this.conTypeId",this.conType);
  }
  selectLanguage($event) {
    this.langID = $event.value;
    this.isLoading = true;
    this.langCode = this.listLang.find(x => x.id == this.langID).languageCode;
    this.assetService
      .getAsset(this.token, this.projectName, this.langID, this.token)
      .subscribe(x => {
        this.dataSource.data = x;
        this.isLoading = false;
      });
  }
  userGuide() {
    // https://tiekinetixdemandgen.zendesk.com/hc/en-us/articles/360000725543-Promotion-Syndication-Admin
    window.open(
      "https://tiekinetixdemandgen.zendesk.com/hc/en-us/articles/360000725543-Promotion-Syndication-Admin",
      "_blank"
    );
  }
  receiveDsCategory(ds) {
    // ds = ds.children.filter(y => y['stageId'] != '50');
    let Allcategory = [
      {
        children: [],
        depth: 0,
        id: -1,
        name: "All",
        image: "",
        stageId: 50,
        subscribedId: null,
        thumbnailImage: "",
        valueText: "All"
      }
    ];
    for (let i = 0; i < ds.length; i++) {
      ds[i].parentId = -1;
    }
    Allcategory[0].children = ds;
    this.dsCategory = Allcategory;
    // this.global.dsCategory = this.dsCategory;

    if (this.dsCategory.length > 0) {
      this.categoriestree = this.dsCategory;
    } else {
      this.categoriestree = this.dsCategory[0].children;
    }
    if (this.selectedCat == undefined)
      this.selectedCat = this.categoriestree[0];
  }
  receiveCategory(category) {
    this.selectedCat = category;
    let listId = this.getListID(category);
    let listPublish = [];
    for (var id of listId) {
      let cat = this.getNodeById(id, this.dsCategory);
      if (cat.stageId == "50") {
        listPublish.push(id);
      }
    }
    listId = listPublish;

    this.dataSource.filterPredicate = this.createFilter();
    this.filterValues["catId"] = listId.toString();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  receiveEditMode($event) {
    this.isEditModeCat = $event;
  }
  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = this.createFilter();
    this.filterValues["campaign"] = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  createFilter() {
    let filterFunction = function(data: Asset, filter): boolean {
      let searchTerms = JSON.parse(filter);

      if (
        searchTerms.status.toLowerCase() == "all" &&
        searchTerms.catId == "" &&
        (searchTerms.campaign == undefined || searchTerms.campaign == "")
      )
        // not filter
        return true;
      else if (
        searchTerms.status.toLowerCase() == "all" &&
        (searchTerms.campaign == undefined || searchTerms.campaign == "")
      )
        // just filter by category
        return searchTerms.catId.includes(data.categories[0].toString());
      else if (
        searchTerms.catId == "" &&
        (searchTerms.campaign == undefined || searchTerms.campaign == "")
      )
        // just filter by status
        return data.status.toLowerCase() == searchTerms.status.toLowerCase();
      else if (
        searchTerms.catId == "" &&
        searchTerms.status.toLowerCase() == "all"
      )
        // just filter by campaign
        return data.campaign
          .toLowerCase()
          .includes(searchTerms.campaign.toLowerCase());
      else if (searchTerms.campaign == undefined || searchTerms.campaign == "")
        // filter by categories & status
        return (
          searchTerms.catId.includes(data.categories[0].toString()) &&
          data.status.toLowerCase() == searchTerms.status.toLowerCase()
        );
      else if (searchTerms.status.toLowerCase() == "all")
        // filter by categories & campaign
        return (
          searchTerms.catId.includes(data.categories[0].toString()) &&
          data.campaign
            .toLowerCase()
            .includes(searchTerms.campaign.toLowerCase())
        );
      else if (searchTerms.catId == "")
        // filter by status & campaign
        return (
          data.status.toLowerCase() == searchTerms.status.toLowerCase() &&
          data.campaign
            .toLowerCase()
            .includes(searchTerms.campaign.toLowerCase())
        );
      // filter by all
      else
        return (
          searchTerms.catId.includes(data.categories[0].toString()) &&
          data.status.toLowerCase() == searchTerms.status.toLowerCase() &&
          data.campaign
            .toLowerCase()
            .includes(searchTerms.campaign.toLowerCase())
        );
    };
    this.paginator.pageIndex = 0;
    return filterFunction;
  }
  findCategoryName(element) {
    let result = this.getNodeById(element.categories[0], this.dsCategory);
    if (result === null) return "";
    return result.name;
  }
  getNodeById(id, node) {
    var reduce = [].reduce;
    function runner(result, node) {
      if (result || !node) return result;
      return (
        (node.id === id && node) ||
        runner(null, node.children) ||
        reduce.call(Object(node), runner, result)
      );
    }
    return runner(null, node);
  }

  getListID(category) {
    let listId = [category.id];
    this.getAllChildId(category, listId);
    return listId;
  }

  getAllChildId(category, listId) {
    for (var child of category.children) {
      if (child.children.length > 0) this.getAllChildId(child, listId);
      listId.push(child.id);
    }
  }

  createNewAsset() {
    this.dialogService
      .openAssetDialog(
        null,
        this.projectName,
        this.categoriestree,
        this.selectedCat,
        this.listLang,
        this.langID,
        this.baseDomain,
        this.conType
      )
      .subscribe(res => {
        console.log("res", res);
        if (res == undefined) return;
        // after click create button
        this.isLoading = true;
      });
  }
}

export class supplier {
  id: number;
  description: string;
}

export class contenttype {
  id: number;
  description: string;
}

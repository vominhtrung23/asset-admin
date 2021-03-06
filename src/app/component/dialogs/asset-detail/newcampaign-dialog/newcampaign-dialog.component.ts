import { Component, OnInit ,Inject, ViewChild, SecurityContext} from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormsModule,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { AssetService, Asset } from "../../../../services/asset.service";
import {
  Language,
  Category,
  LanguageService
} from "../../../../services/language.service";
import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpHeaders
} from "@angular/common/http";

import {
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  ITreeOptions,
  IActionHandler,
  TreeComponent,
  TreeNode
} from "angular-tree-component";

import { DomSanitizer } from "@angular/platform-browser";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-newcampaign-dialog",
  templateUrl: "./newcampaign-dialog.component.html",
  styleUrls: ["./newcampaign-dialog.component.css"]
})
export class NewcampaignDialogComponent implements OnInit {
   percentDone: number;
  errorZipfile: string = null;
  isErrorDay: boolean = false;
  activeNode: any;
  isOpenCategoryTree: boolean = false;
  token: string;
  listAssets1: any = [];
  listAssets2: any = [];
  fileName: string;
  imgFiles: Array<Object> = [];
  isJustUploaded: boolean = false;
  @ViewChild("tree") tree: TreeComponent;
  nameFormControl = new FormControl("", [Validators.required]);
  descFormControl = new FormControl("", [Validators.required]);
  buyUrlFormControl = new FormControl("", [Validators.required]);
  cspIdFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();
  
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<NewcampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private assetService: AssetService,
    private langService: LanguageService,
    // private global: Global,
    private domSanitizer: DomSanitizer,
    // private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}
   close(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.dialogRef.close();
  }
   stepUp(input: HTMLInputElement): void {
    if (input.disabled) {
      return;
    }
    try {
      input.stepUp();
    } catch (ex) {
      // increment `value` by `step` (default to '1' if `step` is absent)
      input.value = String(Number(input.value) + Number(input.step || "1"));
      // if `max` is present and `value` is greater than `max`, set `value` to `max`
      if (input.max && Number(input.value) > Number(input.max)) {
        input.value = input.max;
      }
    }
  }

  // try calling stepDown() on the input element (Chrome, Firefox, Safari)
  // on failure, mimic the effect of stepDown() (Internet Explorer, Edge)
  // return immediately if input is disabled
  stepDown(input: HTMLInputElement): void {
    if (input.disabled) {
      return;
    }
    try {
      input.stepDown();
    } catch (ex) {
      // decrement `value` by `step` (default to '1' if `step` is absent)
      input.value = String(Number(input.value) - Number(input.step || "1"));
      // if `min` is present and `value` is less than `min`, set `value` to `min`
      if (input.min && Number(input.value) < Number(input.min)) {
        input.value = input.min;
      }
    }
  }
   checkRequiredField() {
    if (this.data.isCreateNew)
      return (
        this.nameFormControl.hasError("required")

        
       
        
      );
    else
      return (
        this.nameFormControl.hasError("required")
      )
  }
}
export interface DialogData {
  isCreateNew: boolean;

  campaign: string;
  campaignID: string;
  campaignType: string;
  categories: string;
  date: any;
  desc: string;
  endDate: any;
  status: string;
  projectName: string;

  // otherProperties
  Buy_Now_URL: string;
  Buy_Now_URL_Y_N: string;
  Campaigns_Local_Audience: string;
  CSP_Reporting_Id: string;
  CSP_Unique_Key: string;
  Microsite_Link_Url: string;
  Status_Featured_Y_N: string;
  Status_Sort_Order: number;

  imageUrl: string; // img143x60
  Half_Banner_234x60_Image: string;
  Full_Banner_468x60_Image: string;
  Button_180x90_Image: string;
  Medium_Rectangle_300x250_Image: string;
  Wide_Skyscraper_160x600_Image: string;

  categoriestree: any;
  categoryID: number;
  categoryName: string;
  zipFile: any;
  baseDomain: string;

  lng: number;
  listLang: Language[];

  CSP_Related_Assets: any;
}

export interface TimeZone {
  value: string;
  viewValue: string;
}
export interface Asset {
  contentId: string;
  contentIdentifier: string;
  categoryId: number;
}
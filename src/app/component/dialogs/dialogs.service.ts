import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { NewcampaignDialogComponent } from "./asset-detail/newcampaign-dialog/newcampaign-dialog.component";
import { AssetdetailDialogComponent } from "./asset-detail/assetdetail-dialog/assetdetail-dialog.component";
import { MatDialogRef, MatDialog } from "@angular/material";

@Injectable()
export class DialogsService {
  constructor(private dialog: MatDialog) {}

  public openDialog(
    title: string,
    message: string,
    btnTitle1?: string,
    btnTitle2?: string
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.btnTitle1 = btnTitle1;
    dialogRef.componentInstance.btnTitle2 = btnTitle2;
    return dialogRef.afterClosed();
  }

  getName(url) {
    return url.substring(url.lastIndexOf("/") + 1, url.length);
  }
  getDateTimeZone(fulldate: string) {
    //startdate "09/30/2018#13:00:00#Central Standard Time"
    //endDate "01/01/2099#12:00:00#Central Standard Time"

    //-> 2015-03-25T12:00:00

    let date = new Date(fulldate.substring(0, fulldate.indexOf("#")));
    let time = fulldate.substring(
      fulldate.indexOf("#") + 1,
      fulldate.lastIndexOf("#")
    );

    date.setHours(parseInt(time.substring(0, 2), 10));
    date.setMinutes(parseInt(time.substring(3, 5), 10));

    let timezone = fulldate.substring(
      fulldate.lastIndexOf("#") + 1,
      fulldate.length
    );
    return [date, timezone];
  }
  public openAssetDialog(
    element,
    projectName,
    categoriestree,
    category,
    listLang,
    langID,
    baseDomain,
    conType
  ): Observable<any> {
    console.log("category", element, category);
    // console.log(categoriestree[0].name);
    let dialogRef;
    if (conType.toLowerCase() == "asset") {
      if (element == null) {
        console.log("asset");
        dialogRef = this.dialog.open(AssetdetailDialogComponent, {
          data: {
            isCreateNew: true,
            status: "Published",
            // categories: null,
            desc: "",
            projectName: projectName,

            date: [new Date()],
            endDate: [
              new Date("2099-01-01T12:00:00Z"),
              "Central Standard Time"
            ],
            Status_Featured_Y_N: "no",
            Status_Sort_Order: 0,
            Status_Features_Sort_Order: 0,
            categoriestree: categoriestree,
            categoryName: category.name,
            categoryID: category.id,

            lng: langID,
            listLang: listLang
          }
        });
      }
      // else {
      //   var otherProperties: any = {};
      //   for (var k in element["otherProperties"]) {
      //     otherProperties[element["otherProperties"][k].fieldName] =
      //       element["otherProperties"][k].valueText;
      //   }
      //   // console.log(element);
      //   dialogRef = this.dialog.open(AssetdetailDialogComponent, {
      //     data: {
      //       isCreateNew: false
      //     }
      //   });
      // }
    } else if (conType.toLowerCase() == "campaign") {
      console.log("campaign");
      if (element == null) {
        dialogRef = this.dialog.open(NewcampaignDialogComponent, {
          data: {
            isCreateNew: true,
            status: "Published",
            // categories: null,
            desc: "",
            projectName: projectName,

            date: [new Date()],
            endDate: [
              new Date("2099-01-01T12:00:00Z"),
              "Central Standard Time"
            ],
            Status_Featured_Y_N: "no",
            Status_Sort_Order: 0,
            Status_Features_Sort_Order: 0,
            categoriestree: categoriestree,
            categoryName: category.name,
            categoryID: category.id,

            lng: langID,
            listLang: listLang
          }
        });
      }
    }

    return dialogRef.afterClosed();
  }
}

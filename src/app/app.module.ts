import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { TreeModule } from "angular-tree-component";
import { HttpClientModule } from "@angular/common/http";
import { AssettableComponent } from "./component/assettable/assettable.component";
import { LanguageService } from "./services/language.service";
import { DatePipe } from "@angular/common";
import { AssetService } from "./services/asset.service";
import { DialogsService } from "./component/dialogs/dialogs.service";
import { CategoryTreeModule } from "@coderrental/csp-categorytree";
import { I1 } from "./interceptors";
import { AssetdetailDialogComponent } from "./component/dialogs/asset-detail/assetdetail-dialog/assetdetail-dialog.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NewcampaignDialogComponent } from './component/dialogs/asset-detail/newcampaign-dialog/newcampaign-dialog.component';
@NgModule({
  imports: [
    TreeModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    CategoryTreeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [CategoryTreeModule],
  declarations: [
    AppComponent,
    HelloComponent,
    AssettableComponent,
    AssetdetailDialogComponent,
    NewcampaignDialogComponent
  ],
  entryComponents: [
    // ConfirmDialogComponent,
    AssetdetailDialogComponent,NewcampaignDialogComponent
    // PreviewDialogComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    DialogsService,
    LanguageService,
    AssetService,
    {
      // provide: HTTP_INTERCEPTORS,
      provide: "",
      useClass: I1,
      multi: true
    }
  ]
})
export class AppModule {}

// {
//   "name": "angular",
//   "version": "0.0.0",
//   "private": true,
//   "dependencies": {
//        "@angular/animations": "8.2.14",
//     "@angular/cdk": "8.0.1",
//     "@angular/common": "8.2.14",
//     "@angular/compiler": "8.2.14",
//     "@angular/core": "8.2.14",
//     "@angular/forms": "8.2.14",
//     "@angular/material": "8.0.0",
//     "@angular/platform-browser": "8.2.14",
//     "@angular/platform-browser-dynamic": "8.2.14",
//     "@angular/router": "8.2.14",
//     "@coderrental/csp-categorytree": "1.2.9",
//     "angular-tree-component": "^8.5.6",
//     "core-js": "2.6.11",
//     "rxjs": "6.5.4",
//     "rxjs-compat": "6.5.4",
//     "tslib": "1.11.1",
//     "zone.js": "0.9.1"
//   },
//   "scripts": {
//     "ng": "ng",
//     "start": "ng serve",
//     "build": "ng build",
//     "test": "ng test",
//     "lint": "ng lint",
//     "e2e": "ng e2e"
//   },
//   "devDependencies": {
//     "@angular-devkit/build-angular": "~0.10.0",
//     "@angular/cli": "~7.0.2",
//     "@angular/compiler-cli": "~7.0.0",
//     "@angular/language-service": "~7.0.0",
//     "@types/node": "~8.9.4",
//     "@types/jasmine": "~2.8.8",
//     "@types/jasminewd2": "~2.0.3",
//     "codelyzer": "~4.5.0",
//     "jasmine-core": "~2.99.1",
//     "jasmine-spec-reporter": "~4.2.1",
//     "karma": "~3.0.0",
//     "karma-chrome-launcher": "~2.2.0",
//     "karma-coverage-istanbul-reporter": "~2.0.1",
//     "karma-jasmine": "~1.1.2",
//     "karma-jasmine-html-reporter": "^0.2.2",
//     "protractor": "~5.4.0",
//     "ts-node": "~7.0.0",
//     "tslint": "~5.11.0",
//     "typescript": "~3.1.1"
//   }
// }

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template:`
		<h1 mat-dialog-title>{{ title }}</h1>
		<mat-dialog-content>{{ message }}</mat-dialog-content>
		<br>
		<mat-dialog-actions>
		    <button type="button" mat-button (click)="dialogRef.close(true)">{{ btnTitle1 }}</button>
		    <button type="button" mat-button mat-dialog-close (click)="dialogRef.close(false)">{{ btnTitle2 }}</button>
		</mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;
  public btnTitle1: string;
  public btnTitle2: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }
}
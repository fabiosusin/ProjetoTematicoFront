import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation.dialog.html',
  styleUrls: ['./situation.dialog.scss']
})
export class SituationDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) { }

  isLoading?: boolean;

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

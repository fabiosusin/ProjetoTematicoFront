import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-interview-dialog',
  templateUrl: './interview.dialog.html',
  styleUrls: ['./interview.dialog.scss']
})
export class InterviewDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) { }

  isLoading?: boolean;

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

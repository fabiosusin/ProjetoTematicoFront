import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-frequency-dialog',
  templateUrl: './frequency.dialog.html',
  styleUrls: ['./frequency.dialog.scss']
})
export class FrequencyDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) { }

  isLoading?: boolean;

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

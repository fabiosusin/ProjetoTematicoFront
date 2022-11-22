import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation.dialog.html',
  styleUrls: ['./situation.dialog.scss']
})
export class SituationDialog implements OnInit {
  constructor() { }

  isLoading?: boolean;

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frequency-dialog',
  templateUrl: './frequency.dialog.html',
  styleUrls: ['./frequency.dialog.scss']
})
export class FrequencyDialog implements OnInit {
  constructor() { }

  isLoading?: boolean;

  ngOnInit(): void {
  }
}

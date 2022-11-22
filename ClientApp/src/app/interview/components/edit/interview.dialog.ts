import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview-dialog',
  templateUrl: './interview.dialog.html',
  styleUrls: ['./interview.dialog.scss']
})
export class InterviewDialog implements OnInit {
  constructor() { }

  isLoading?: boolean;

  ngOnInit(): void {
  }
}

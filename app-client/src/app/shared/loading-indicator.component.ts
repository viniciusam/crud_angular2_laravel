import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading-indicator',
  template: `
    <div *ngIf="isLoading">
      <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  `
})
export class LoadingIndicatorComponent implements OnInit {

  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}

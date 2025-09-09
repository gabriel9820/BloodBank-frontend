import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() createUrl?: string;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  navigateToCreate() {
    if (this.createUrl) {
      this.router.navigate([this.createUrl], { state: { mode: 'create' } });
    }
  }
}

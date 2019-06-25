import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSettings(): void {
    this.router.navigateByUrl('settings');
  }
}

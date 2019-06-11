import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.page.html',
  styleUrls: ['./stickers.page.scss'],
})
export class StickersPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickEvent() {
    this.router.navigateByUrl('/');
  }

}

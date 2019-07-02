import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit
{

  private searchresults: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit()
  {
    if (this.route.snapshot.data['special'])
    {
      this.searchresults = this.route.snapshot.data['special']
    }
  }

}
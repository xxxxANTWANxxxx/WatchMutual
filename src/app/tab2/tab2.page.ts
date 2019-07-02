import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{

  private searchInput: string;
  private searchresults: any[] = [];

  constructor(private http: HttpClient, public router: Router, private dataService: DataService) { }


  onInput($event)
  {
    let searchQuery = "http://www.omdbapi.com/?apikey=3a4e6009&s=" + this.searchInput;

    //const req = new HttpRequest('GET', searchQuery);

    this.http.get(searchQuery).subscribe({
      next: position =>
      {
        this.searchresults = position['Search'];
        if (this.searchresults !== undefined) this.searchresults.forEach(data =>
        {
          //console.log(data); //see data
          this.dataService.setData(42, this.searchresults);
          this.router.navigateByUrl('/search-results/42');
        });
      },
      error: msg => console.log('Error message: ', msg)
    });

  }

  clickEvent()
  {
    this.router.navigateByUrl('/stickers');
  }

}
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{

  private num = 0
  private searchInput: string;
  private searchresults: any[] = [];
  private items = [];//posts
  private allData = [];
  information: any[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private list: string;
  private firstName: string;
  private lastName: string;


  constructor(private http: HttpClient, public router: Router, private dataService: DataService) { }



  ionViewWillEnter()
  {
    this.num = 0;
    this.items = [];
    this.loadLists();
    this.toggleInfiniteScroll();
  }

  loadLists()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };


    let postData = {

      "List": this.list,
      "firstName": this.firstName,
      "lastName": this.lastName

    }


    this.http.post("http://localhost:4200/find-lists", postData, httpOptions)
      .subscribe(tdata =>
      {
        this.allData = tdata['presults'];
        this.list = tdata['results'];
        this.addMoreItems()
      }, error =>
        {
          console.log('failure')
        });

  };

  addMoreItems()
  {

    for (let i = this.num; i < this.num + 12; i++)
    {
      if (i >= this.allData.length)
        break
      if (this.allData[i].list != null)
        this.items.push(this.allData[i]);
    }
    this.num += 12;


  }

  loadData(event)
  {
    setTimeout(() =>
    {
      //console.log('Done');
      this.addMoreItems();
      event.target.complete();

      //App logic to determine if all data is loaded
      //and disable the infinite scroll
      if (this.num > this.allData.length)
      {
        event.target.disabled = true;
      }

    }, 1000);
  }

  toggleInfiniteScroll()
  {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }




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

  clickClicked(): void
  {
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:4200/create-lists", httpOptions)
      .subscribe(() =>
      {
        console.log("list created")
      }, error =>
        {
          console.log('failure')
        });*/
  }

  toggleSection(index)
  {
    this.information[index].open = !this.information[index].open;
  }
}
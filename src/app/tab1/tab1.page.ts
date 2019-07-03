import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit
{

  private num = 0

  ngOnInit()
  {

  }


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private post: string;
  //private firstName: string;
  //private lastName: string;


  private items = [];//posts
  private allData = [];
  private info: object = null;


  constructor(private http: HttpClient, private router: Router) { }


  ionViewWillEnter()
  {
    this.loadPosts();
  }

  loadPosts()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };


    this.http.post("http://localhost:4200/tabs/tab1", httpOptions)
      .subscribe(tdata =>
      {
        this.allData = tdata['presults'];
        this.info = tdata['results'];
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
      //console.log(this.allData.id[i])
      this.items.push(this.allData[i]);
      //console.log(this.allData[i])
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

  doRefresh(event)
  {
    console.log('Begin async operation');
    this.loadPosts();
    setTimeout(() =>
    {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  clickEvent(): void
  {
    //this.router.navigateByUrl('stickers');
    console.log(this.allData)
  }


}

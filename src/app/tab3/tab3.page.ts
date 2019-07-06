import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page
{

  private id: number;
  private firstName: string;
  private lastName: string;

  public toggled: boolean = false;

  public users = [];//posts
  public add = [];
  public search = [];
  public search2 = []
  public list = []
  public list2 = []


  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit()
  {
    this.loadPeople();
  }

  ionViewWillEnter()
  {
    this.loadFriends();
    this.search2 = this.users
  }

  loadFriends()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    let postData = {

      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName
    }
    this.http.post("http://localhost:4200/tabs/tab3", postData, httpOptions)
      .subscribe(data =>
      {
        this.users = data['results'];
        this.search2 = this.users

      }, error =>
        {
          console.log('failure')
        });
  };

  loadPeople()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    let postData = {

      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName
    }
    this.http.post("http://localhost:4200/add-friends", postData, httpOptions)
      .subscribe(fdata =>
      {
        this.add = fdata['fresults'];
        for (let i = 0; i < this.add.length; i++)
          this.list2.push(this.add[i].firstName + ' ' + this.add[i].lastName)
      }, error =>
        {
          console.log('failure')
        });
  };


  searchthis(event)
  {
    this.searchFriends(event);
    this.searchPeople(event);
  }

  searchPeople(event)
  {
    //this.search2 = []
    this.search = this.add
    if (event.target.value == '')
      this.search = []
    let serVal = event.target.value;
    if (serVal && serVal.trim() != '')
    {
      this.search = this.search.filter((add) =>
      {
        return ((add.firstName + ' ' + add.lastName).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }
  searchFriends(event)
  {
    //this.search = []
    this.search2 = this.users
    let serVal = event.target.value;
    if (serVal && serVal.trim() != '')
    {
      this.search2 = this.search2.filter((users) =>
      {
        return ((users.user.firstName + ' ' + users.user.lastName).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }

  viewProfile(i): void
  {
    let navigationExtras: NavigationExtras = {
      state: {
        id: i
      }
    };
    this.router.navigate(['display-user'], navigationExtras);
  }

  // public toggle(): void
  // {
  //   this.toggled = !this.toggled;
  // }
  /*addMoreItems()
 {

   for (let i = this.num; i < this.num + 12; i++)
   {
     if (i >= this.allData.length)
       break
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
 }*/

}
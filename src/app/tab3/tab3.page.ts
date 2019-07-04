import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DisplayUserPage } from '../display-user/display-user.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page
{


  @ViewChild('friend')
  private id: number;
  private firstName: string;
  private lastName: string;
  //private lookUpId: number;


  public users = [];//posts
  //public allData = [];
  //public info: object = null;


  constructor(private http: HttpClient, private router: Router, public navCtrl: NavController) { }


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


    let postData = {

      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName


    }


    this.http.post("http://localhost:4200/tabs/tab3", postData, httpOptions)
      .subscribe(data =>
      {
        this.users = data['results'];
        //console.log(data['results'])
        //this.info = tdata['results'];
        //this.addMoreItems()
      }, error =>
        {
          console.log('failure')
        });

  };

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

  /*public searchbar = document.querySelector('ion-searchbar');
  public items = Array.from(document.querySelector('ion-list').children);
  //searchbar.addEventListener('ionInput', handleInput);
  handleInput(event)
  {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() =>
    {
      this.items.forEach(item =>
      {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }*/


  viewProfile(i): void
  {
    let navigationExtras: NavigationExtras = {
      state: {
        id: i
      }
    };

    this.router.navigate(['display-user'], navigationExtras);
  }

}

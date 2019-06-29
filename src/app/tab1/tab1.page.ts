import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page
{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('email')
  private post: string;

  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router, public alertController: AlertController)
  {
    this.addMoreItems();
  }

  public tpost: object = null;

  items = [];

  addMoreItems()
  {
    for (let i = 0; i < 10; i++)
      this.items.push(this.tpost)

  }

  loadData(event)
  {
    setTimeout(() =>
    {
      console.log('Done');
      this.addMoreItems();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      //if (data.length == 1000)
      //{
      //  event.target.disabled = true;
      //}
    }, 300);
  }

  toggleInfiniteScroll()
  {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


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

      "pPost": this.post,

    }




    //-----------------here
    this.http.post("http://localhost:4200/tabs/tab1", postData, httpOptions)
      .subscribe(pdata =>
      {
        console.log("usingpostfind")
        //console.log(pdata['post']); //seee data
        this.tpost = pdata;

      }, error =>
        {
          console.log('failure')
        });

    // const info: string = data['firstName'];
  }
  ;



  clickEvent()
  {
    console.log(this.tpost);
  }

}

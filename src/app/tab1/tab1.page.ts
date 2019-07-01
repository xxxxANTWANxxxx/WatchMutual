import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { NavController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit
{

  public num = 0

  ngOnInit()
  {
    //this.addMoreItems()
  }


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('poststuff')
  private post: string;
  private id: number;
  private user: object;


  public allData = [];
  public items = [];


  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router, public alertController: AlertController) { }


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

      "Post": this.post,
      "id": this.id,
      "user": this.user


    }


    this.http.post("http://localhost:4200/tabs/tab1", postData, httpOptions)
      .subscribe(tdata =>
      {
        this.allData = tdata['presults'];
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
      if (i == this.allData.length)
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


  clickEvent()
  {
    this.router.navigateByUrl('stickers');
  }


}

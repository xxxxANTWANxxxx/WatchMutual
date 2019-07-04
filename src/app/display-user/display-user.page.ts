import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.page.html',
  styleUrls: ['./display-user.page.scss'],
})
export class DisplayUserPage implements OnInit
{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  private num = 0
  private items = [];//posts
  private allData = [];
  private lookUpId: number;


  constructor(private http: HttpClient, private router: Router)
  {

    this.lookUpId = this.router.getCurrentNavigation().extras.state.id;
  }


  public info: object = null;

  ngOnInit()
  {

  }

  ionViewWillEnter()
  {
    this.loadUser();
  }


  loadUser()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };


    let postData = {

      "id": this.lookUpId,
    }


    this.http.post("http://localhost:4200/display-user", postData, httpOptions)
      .subscribe(data =>
      {

        this.allData = data['posts'];
        this.info = data['results'];
        //console.log(data['results'])
        this.addMoreItems()

      }, error =>
        {
          console.log('failure')
        });

    // const info: string = data['firstName'];
  }


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

}

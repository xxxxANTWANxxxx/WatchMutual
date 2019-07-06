import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})




export class MePage implements OnInit
{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  private num = 0
  private items = [];//posts
  private allData = [];
  private error: string;
  private url = '';
  private pictureURL;

  constructor(private http: HttpClient, private router: Router, public alertController: AlertController, ) { }

  // private domSanitizer: DomSanitizer
  public info: object = null;

  ngOnInit()
  {
    this.toggleInfiniteScroll();
  }

  ionViewWillEnter()
  {
    this.items = [];
    this.toggleInfiniteScroll();
    this.num = 0;
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

    this.http.post("http://localhost:4200/me", httpOptions)
      .subscribe(data =>
      {

        this.allData = data['posts'];
        this.info = data['results'];
        this.addMoreItems();
        // let TYPED_ARRAY = new Uint8Array(this.info.pic);
        // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) =>
        // {
        //   return data + String.fromCharCode(byte);
        // }, '');
        // let base64String = btoa(STRING_CHAR);
        // this.pictureURL = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + base64String);
        //console.log(this.pictureURL)

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
      this.items.push(this.allData[i]);
    }
    this.num += 12;


  }

  loadData(event)
  {
    setTimeout(() =>
    {
      this.addMoreItems();
      event.target.complete();

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



  goToSettings(i): void
  {
    let navigationExtras: NavigationExtras = {
      state: {
        userType: i
      }
    };
    this.router.navigate(['settings'], navigationExtras);
  }

  async deletePost(i)
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Please Confirm',
      message: 'Are you sure you want to delete this post? Once this action is completed, it cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

        }, {
          text: 'Ok',
          handler: () =>
          {
            this.deleteUserPost(i);
          }
        }
      ]

    });

    await alert.present();
  }


  deleteUserPost(i)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:4200/delete-posts", { pid: i }, httpOptions)
      .subscribe(fdata =>
      {
        this.items = [];
        this.toggleInfiniteScroll();
        this.num = 0;
        this.loadUser();
      }, error =>
        {
          console.log('failure')
        });

  }
  // onSelectFile(event)
  // {
  //   if (event.target.files && event.target.files[0])
  //   {
  //     var reader = new FileReader();

  //     reader.readAsArrayBuffer(this.pictureURL); // read file as data url

  //     reader.onload = (event) =>
  //     { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }
}

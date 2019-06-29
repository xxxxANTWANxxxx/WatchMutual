import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})




export class MePage implements OnInit
{

  @ViewChild('email')
  email: any;
  private first: string;
  private last: string;
  private bio: string;
  private error: string;



  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router, public alertController: AlertController) { }


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

      "firstName": this.first,
      "lastName": this.last,
      "bio": this.bio,
    }





    this.http.post("http://localhost:4200/me", postData, httpOptions)
      .subscribe(data =>
      {

        //console.log(data); seee data
        this.info = data;

      }, error =>
        {
          console.log('failure')
        });

    // const info: string = data['firstName'];
  }
  ;



  goToSettings(): void
  {
    this.router.navigateByUrl('settings');
  }
}

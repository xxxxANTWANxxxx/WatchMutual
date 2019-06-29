import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit
{

  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router, public alertController: AlertController)
  {
  }

  ngOnInit()
  {
  }

  loginClicked()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    let postData = {
      "username": this.email,
      "password": this.password
    }

    this.http.post("http://localhost:4200/login", postData, httpOptions)
      .subscribe(data =>
      {
        //console.log("this was Successful");
        if (data['Status']) this.login();
        else this.presentAlert();
      }, error =>
      {
        console.log(error)

      });
  }

  login(): void
  {
    console.log('Login successful');
    this.router.navigateByUrl('/');
  }

  createAccount(): void
  {
    this.router.navigateByUrl('create-account');
  }

  async presentAlert()
  {
    const alert = await this.alertController.create({
      header: 'Please try again...',
      message: 'The email and password you entered did not match our records. Please double check and try again.',
      buttons: ['OK']
    });

    await alert.present();
  }


}



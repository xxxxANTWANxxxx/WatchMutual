import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit
{

  @ViewChild('login')
  private email: string;
  private password: string;
  private uid: number;
  private error: string;

  constructor(private http: HttpClient, private router: Router, public alertController: AlertController)
  {
  }

  ngOnInit()
  {
  }
  //when user logs in, sends http post to db, to check if email and hashed password match up,if they do, user is logged in
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
      "password": this.password,
      "uid": this.uid
    }

    this.http.post("http://localhost:4200/login", postData, httpOptions)
      .subscribe(data =>
      {
        if (data['Status']) this.login();
        //if password and email are not in db
        else { this.presentAlert(); }
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
    //link to create account page
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



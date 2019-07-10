import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit
{

  @ViewChild('email')
  private email: string;
  private password: string;
  private password2: string;
  private first: string;
  private last: string;
  private date: string;
  private error: string;
  private status: boolean

  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router, public alertController: AlertController) { }

  ngOnInit()
  {
  }
  //sends post to app.js when create account is clicked
  createClicked()
  {
    console.log(this.email)
    console.log(this.password)
    console.log(this.first)
    console.log(this.last)
    console.log(this.date)





    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    let postData = {
      "email": this.email,
      "password": this.password,
      "password2": this.password2,
      "firstName": this.first,
      "lastName": this.last,
      "dob": new Date(this.date)
    }
    //confirmpassword mst match the first one, also email cannot already be in use
    this.http.post("http://localhost:4200/create-account", postData, httpOptions)
      .subscribe(data =>
      {
        if (data['created'] == true)
        {
          this.login(),
            this.presentCreated()
        }

        else if (!(data['created']) && (this.password != this.password2))
          this.presentPass();

        else this.presentUser();
      }, error =>
        {
          console.log('failure')
        });

  }
  //go to home page
  login(): void
  {
    this.router.navigateByUrl('/');
  }
  //displays if email is taken
  async presentUser()
  {
    const alert = await this.alertController.create({
      header: 'Please try again...',
      message: 'The email you entered Already exists in our database. Please try a different email.',
      buttons: ['OK']
    });

    await alert.present();
  }
  //displays if passwords don't match
  async presentPass()
  {
    const alert = await this.alertController.create({
      header: 'Please try again...',
      message: 'The Passwords you entered do not match. Please make sure these are the same.',
      buttons: ['OK']
    });

    await alert.present();
  }
  //displays when account is successfully created
  async presentCreated()
  {
    const alert = await this.alertController.create({
      header: 'Account Created',
      message: 'Welcome to the home page!',
      buttons: ['OK']
    });

    await alert.present();
  }

}

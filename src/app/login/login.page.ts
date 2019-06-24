import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import * as config from 'config.json';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router) { 
  }

  ngOnInit() {
  }

  loginClicked() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    let postData = {
      "username": this.username,
      "password": this.password
    }

    this.http.post("http://localhost:4200/login", postData, httpOptions)
      .subscribe(data => {
        console.log("Post Successful");
        if(data['Status']) this.login();
      }, error => {
        console.log(error)
      });
  }

  login(): void {
    console.log('Login successful');
    this.router.navigateByUrl('/');
  }

}



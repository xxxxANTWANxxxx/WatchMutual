import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit
{
  private id: number;
  private firstName: string;
  private lastName: string;
  private post: string;
  private list: string;


  private users = [];
  private search = [];

  private posts = [];
  private search2 = [];

  private lists = [];
  private search3 = [];

  constructor(private http: HttpClient, private router: Router, public alertController: AlertController) { }

  ngOnInit()
  {
    this.loadPeople();
    this.loadPosts();
    this.loadLists()
  }

  ionViewWillEnter()
  {
  }

  private select: number;

  loadPeople()
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
    this.http.post("http://localhost:4200/add-friends", postData, httpOptions)
      .subscribe(fdata =>
      {
        this.users = fdata['fresults'];

      }, error =>
        {
          console.log('failure')
        });
  };


  searchPeople(event)
  {
    this.search = this.users
    if (event.target.value == '')
      this.search = []
    let serVal = event.target.value;
    if (serVal && serVal.trim() != '')
    {
      this.search = this.search.filter((add) =>
      {
        return ((add.firstName + ' ' + add.lastName).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }
  //------------------------------------------------------------------------------------------------------------------
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
      "lastName": this.lastName,
      "post": this.post,
    }
    this.http.post("http://localhost:4200/search-posts", postData, httpOptions)
      .subscribe(fdata =>
      {
        this.posts = fdata['fresults'];

      }, error =>
        {
          console.log('failure')
        });
  };


  searchPosts(event)
  {
    this.search2 = this.posts
    if (event.target.value == '')
    {
      this.search2 = []
      event.target.value == ''
    }
    let serVal = event.target.value;
    if (serVal && serVal.trim() != '')
    {
      this.search2 = this.search2.filter((posts) =>
      {
        return ((posts.post).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }
  //------------------------------------------------------------------------------------------------------------------

  viewProfile(i, bool): void
  {
    let navigationExtras: NavigationExtras = {
      state: {
        id: i,
        admin: bool
      }
    };
    this.router.navigate(['display-user'], navigationExtras);
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
            this.loadPosts();
            this.search2 = [];
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
        this.search2 = [];
      }, error =>
        {
          console.log('failure')
        });

  }
  //------------------------------------------------------------------------------------------------------------------
  loadLists()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    let postData = {

      "List": this.list,
      "firstName": this.firstName,
      "lastName": this.lastName
    }
    this.http.post("http://localhost:4200/search-lists", postData, httpOptions)
      .subscribe(fdata =>
      {
        this.lists = fdata['fresults'];
        console.log('test')

        console.log(this.lists)
      }, error =>
        {
          console.log('failure')
        });
  };


  searchLists(event)
  {
    this.search3 = this.lists
    if (event.target.value == '')
    {
      this.search3 = []
      event.target.value == ''
    }
    let serVal = event.target.value;
    if (serVal && serVal.trim() != '')
    {
      this.search3 = this.search3.filter((lists) =>
      {
        return ((lists.listName).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  async deleteList(i)
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Please Confirm',
      message: 'Are you sure you want to delete this list? Once this action is completed, it cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

        }, {
          text: 'Ok',
          handler: () =>
          {

            this.deleteUserList(i);
            this.loadLists();
            this.search3 = [];
          }
        }
      ]

    });

    await alert.present();
  }


  deleteUserList(i)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:4200/delete-lists", { lid: i }, httpOptions)
      .subscribe(fdata =>
      {
        this.search3 = [];
      }, error =>
        {
          console.log('failure')
        });

  }

  radiohandle(i): void
  {
    this.select = i;
  }
}


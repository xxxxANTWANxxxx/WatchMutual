import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ComponentFactoryResolver } from '@angular/core/src/render3';




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
  private comment: string;

  private users = [];
  private search = [];

  private posts = [];
  private search2 = [];

  private lists = [];
  private search3 = [];

  private comments = [];
  private search4 = [];

  constructor(private http: HttpClient, private router: Router, public alertController: AlertController) { }

  ngOnInit()
  {
    //when page is initialized, load in the search data
    this.loadPeople();
    this.loadPosts();
    this.loadLists();
    this.loadComments();
  }

  ionViewWillEnter()
  {
    this.loadPeople();
    this.loadPosts();
    this.loadLists();
    this.loadComments();

  }

  private select: number;

  //picture buffer
  arrayBufferToBase64(buffer)
  {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++)
    {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  //loads people to search from, from app.js, stores thier name password, and id to link to page display
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
        for (let i = 0; i < this.users.length; i++)
        {
          if (this.users[i].pic != null)
            this.users[i].pic = this.arrayBufferToBase64(this.users[i].pic.data)
          //if a user dose'nt have profile picture, set it to default picture
          else this.users[i].pic = "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AwAAABA9Nf8A3PPPfzPvPPDPHbvnPPfPvPPvPHffPPHPPPXX/vP/AC0yw0ww+8wwx719hAKk8x0w4w404w6501+//wDe/wDPPvfLPPPPvPcYdMcQMPfvvPPPvPPPvPPPf/3/AM/627w586399+rXHPPLCdv/AO/99/O8Ptd99/fv/PdOfPPOcPevuezTRjzjTRHDvPN/de+PuvvPuf8A73//AC31yy40408tNOMMMONNA50824x6ww56w99//wD+/wDDPLHHDD7LKA0M8Us008YDzHDDjXDbvL3HbfvPfPHbfPfPfLfe4I4skME48obrPLHXPfHnTrnXf/X/AP8AM8dMtc/MsLjzzzjzTzzxtt+de/N+OdPP9t//AH33HzDTjPHrnt084Qk000wiDDTzbDDjjTDHDT//AP8A+8v/APvT/wD/AP8ATwww8844008b37z3f3Xbzznz3jb/AP7zz14x/wBc/wD4I4s888c08LH3jHHLrPLDP73ff/f/APyzw/023709mKPCNPPLIHyy/wCOfOe/OccO9ff/AP8A/wA/M9cuu+9d+/xxQyxxxflMdOscv+eveMfO9e//AP8A8+5888+8y27mPPOOPEFc+84968806984279//wD/AP7TrDTX77/PpD84wc0gej/LnzH/AO2219w6x/8A9/v989cN/wD3/wDw21/HPLLDKWz57z/7z7yxyzy3/wD/AP8A7yw4ww7z73111YHGLOMOEw306878y62w2119/wD/AP8Aw168491+916eNOFJNGBY2+29683+8x9888+6288z45/37z97bPKPPPPPPOb4f/8A/wD/AP5z/wC+/wD/AA3z991xx81+6ub/ADzjTTzjTzjztH7P/d/dPv8Av7/L3TTjPPLDcQts8888888880s888ZA03rXHbHP/wD77/8A89su53DRzjizyjzzzhDRDyTjzjxbL/8Af7//APzxyxw08p8OPNNKONPPPHPPPNPNPOPPNG1v+/8A/fOP/wD/AP8A97zxzzzzzyDzzyDzyBzyCDxzzzx7+P8A/wD/AP8A/8QAIREBAAICAgICAwAAAAAAAAAAAQARMEAhMUFQIFEQYXH/2gAIAQMBAT8Q90EH5n9x4fQnMPvAr8iyV6ALgV8kuIm+KMCXKrjdMQ53TvF23e2Ltu9sXbdHnEfT+m6/TxphzzhV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"
        }
      }, error =>
        {
          console.log('failure')
        });
  };

  //shows the filtered results for the searchbar
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
  //same as the people searcher, with the relevant information.
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
        for (let i = 0; i < this.posts.length; i++)
        {
          if (this.posts[i].user.pic != null)
            this.posts[i].user.pic = this.arrayBufferToBase64(this.posts[i].user.pic.data)
          else this.posts[i].user.pic = "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AwAAABA9Nf8A3PPPfzPvPPDPHbvnPPfPvPPvPHffPPHPPPXX/vP/AC0yw0ww+8wwx719hAKk8x0w4w404w6501+//wDe/wDPPvfLPPPPvPcYdMcQMPfvvPPPvPPPvPPPf/3/AM/627w586399+rXHPPLCdv/AO/99/O8Ptd99/fv/PdOfPPOcPevuezTRjzjTRHDvPN/de+PuvvPuf8A73//AC31yy40408tNOMMMONNA50824x6ww56w99//wD+/wDDPLHHDD7LKA0M8Us008YDzHDDjXDbvL3HbfvPfPHbfPfPfLfe4I4skME48obrPLHXPfHnTrnXf/X/AP8AM8dMtc/MsLjzzzjzTzzxtt+de/N+OdPP9t//AH33HzDTjPHrnt084Qk000wiDDTzbDDjjTDHDT//AP8A+8v/APvT/wD/AP8ATwww8844008b37z3f3Xbzznz3jb/AP7zz14x/wBc/wD4I4s888c08LH3jHHLrPLDP73ff/f/APyzw/023709mKPCNPPLIHyy/wCOfOe/OccO9ff/AP8A/wA/M9cuu+9d+/xxQyxxxflMdOscv+eveMfO9e//AP8A8+5888+8y27mPPOOPEFc+84968806984279//wD/AP7TrDTX77/PpD84wc0gej/LnzH/AO2219w6x/8A9/v989cN/wD3/wDw21/HPLLDKWz57z/7z7yxyzy3/wD/AP8A7yw4ww7z73111YHGLOMOEw306878y62w2119/wD/AP8Aw168491+916eNOFJNGBY2+29683+8x9888+6288z45/37z97bPKPPPPPPOb4f/8A/wD/AP5z/wC+/wD/AA3z991xx81+6ub/ADzjTTzjTzjztH7P/d/dPv8Av7/L3TTjPPLDcQts8888888880s888ZA03rXHbHP/wD77/8A89su53DRzjizyjzzzhDRDyTjzjxbL/8Af7//APzxyxw08p8OPNNKONPPPHPPPNPNPOPPNG1v+/8A/fOP/wD/AP8A97zxzzzzzyDzzyDzyBzyCDxzzzx7+P8A/wD/AP8A/8QAIREBAAICAgICAwAAAAAAAAAAAQARMEAhMUFQIFEQYXH/2gAIAQMBAT8Q90EH5n9x4fQnMPvAr8iyV6ALgV8kuIm+KMCXKrjdMQ53TvF23e2Ltu9sXbdHnEfT+m6/TxphzzhV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"
        }

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
  //again, same as the search posts and users, but for lists. searches by list title
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
        for (let i = 0; i < this.lists.length; i++)
        {
          if (this.lists[i].user.pic != null)
            this.lists[i].user.pic = this.arrayBufferToBase64(this.lists[i].user.pic.data)
          else this.lists[i].user.pic = "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AwAAABA9Nf8A3PPPfzPvPPDPHbvnPPfPvPPvPHffPPHPPPXX/vP/AC0yw0ww+8wwx719hAKk8x0w4w404w6501+//wDe/wDPPvfLPPPPvPcYdMcQMPfvvPPPvPPPvPPPf/3/AM/627w586399+rXHPPLCdv/AO/99/O8Ptd99/fv/PdOfPPOcPevuezTRjzjTRHDvPN/de+PuvvPuf8A73//AC31yy40408tNOMMMONNA50824x6ww56w99//wD+/wDDPLHHDD7LKA0M8Us008YDzHDDjXDbvL3HbfvPfPHbfPfPfLfe4I4skME48obrPLHXPfHnTrnXf/X/AP8AM8dMtc/MsLjzzzjzTzzxtt+de/N+OdPP9t//AH33HzDTjPHrnt084Qk000wiDDTzbDDjjTDHDT//AP8A+8v/APvT/wD/AP8ATwww8844008b37z3f3Xbzznz3jb/AP7zz14x/wBc/wD4I4s888c08LH3jHHLrPLDP73ff/f/APyzw/023709mKPCNPPLIHyy/wCOfOe/OccO9ff/AP8A/wA/M9cuu+9d+/xxQyxxxflMdOscv+eveMfO9e//AP8A8+5888+8y27mPPOOPEFc+84968806984279//wD/AP7TrDTX77/PpD84wc0gej/LnzH/AO2219w6x/8A9/v989cN/wD3/wDw21/HPLLDKWz57z/7z7yxyzy3/wD/AP8A7yw4ww7z73111YHGLOMOEw306878y62w2119/wD/AP8Aw168491+916eNOFJNGBY2+29683+8x9888+6288z45/37z97bPKPPPPPPOb4f/8A/wD/AP5z/wC+/wD/AA3z991xx81+6ub/ADzjTTzjTzjztH7P/d/dPv8Av7/L3TTjPPLDcQts8888888880s888ZA03rXHbHP/wD77/8A89su53DRzjizyjzzzhDRDyTjzjxbL/8Af7//APzxyxw08p8OPNNKONPPPHPPPNPNPOPPNG1v+/8A/fOP/wD/AP8A97zxzzzzzyDzzyDzyBzyCDxzzzx7+P8A/wD/AP8A/8QAIREBAAICAgICAwAAAAAAAAAAAQARMEAhMUFQIFEQYXH/2gAIAQMBAT8Q90EH5n9x4fQnMPvAr8iyV6ALgV8kuIm+KMCXKrjdMQ53TvF23e2Ltu9sXbdHnEfT+m6/TxphzzhV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"
        }
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

  loadComments()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    let postData = {

      "comment": this.comment,
      "firstName": this.firstName,
      "lastName": this.lastName
    }
    this.http.post("http://localhost:4200/search-comments", postData, httpOptions)
      .subscribe(fdata =>
      {
        this.comments = fdata['fresults'];
        for (let i = 0; i < this.comments.length; i++)
        {
          if (this.comments[i].user.pic != null)
            this.comments[i].user.pic = this.arrayBufferToBase64(this.comments[i].user.pic.data)
          else this.comments[i].user.pic = "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AwAAABA9Nf8A3PPPfzPvPPDPHbvnPPfPvPPvPHffPPHPPPXX/vP/AC0yw0ww+8wwx719hAKk8x0w4w404w6501+//wDe/wDPPvfLPPPPvPcYdMcQMPfvvPPPvPPPvPPPf/3/AM/627w586399+rXHPPLCdv/AO/99/O8Ptd99/fv/PdOfPPOcPevuezTRjzjTRHDvPN/de+PuvvPuf8A73//AC31yy40408tNOMMMONNA50824x6ww56w99//wD+/wDDPLHHDD7LKA0M8Us008YDzHDDjXDbvL3HbfvPfPHbfPfPfLfe4I4skME48obrPLHXPfHnTrnXf/X/AP8AM8dMtc/MsLjzzzjzTzzxtt+de/N+OdPP9t//AH33HzDTjPHrnt084Qk000wiDDTzbDDjjTDHDT//AP8A+8v/APvT/wD/AP8ATwww8844008b37z3f3Xbzznz3jb/AP7zz14x/wBc/wD4I4s888c08LH3jHHLrPLDP73ff/f/APyzw/023709mKPCNPPLIHyy/wCOfOe/OccO9ff/AP8A/wA/M9cuu+9d+/xxQyxxxflMdOscv+eveMfO9e//AP8A8+5888+8y27mPPOOPEFc+84968806984279//wD/AP7TrDTX77/PpD84wc0gej/LnzH/AO2219w6x/8A9/v989cN/wD3/wDw21/HPLLDKWz57z/7z7yxyzy3/wD/AP8A7yw4ww7z73111YHGLOMOEw306878y62w2119/wD/AP8Aw168491+916eNOFJNGBY2+29683+8x9888+6288z45/37z97bPKPPPPPPOb4f/8A/wD/AP5z/wC+/wD/AA3z991xx81+6ub/ADzjTTzjTzjztH7P/d/dPv8Av7/L3TTjPPLDcQts8888888880s888ZA03rXHbHP/wD77/8A89su53DRzjizyjzzzhDRDyTjzjxbL/8Af7//APzxyxw08p8OPNNKONPPPHPPPNPNPOPPNG1v+/8A/fOP/wD/AP8A97zxzzzzzyDzzyDzyBzyCDxzzzx7+P8A/wD/AP8A/8QAIREBAAICAgICAwAAAAAAAAAAAQARMEAhMUFQIFEQYXH/2gAIAQMBAT8Q90EH5n9x4fQnMPvAr8iyV6ALgV8kuIm+KMCXKrjdMQ53TvF23e2Ltu9sXbdHnEfT+m6/TxphzzhV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"
        }
      }, error =>
        {
          console.log('failure')
        });
  };


  searchComments(event)
  {
    this.search4 = this.comments
    if (event.target.value == '')
    {
      this.search4 = []
      event.target.value == ''
    }
    let serVal = event.target.value;
    if (serVal && serVal.trim() != '')
    {
      this.search4 = this.search4.filter((comments) =>
      {
        return ((comments.comment).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  //routes to view profile for selected user. when user is admin, page gives ability to delete user, including all infomation
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
  //------------------------------------------------------------------------------------------------------------------
  //if delete post button is clicked, conirmation, then deletes post
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

  //actual deletion of psot. post call from app.js to drop the table from db.
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
  //if delete list button is clicked, conirmation, then deletes list, same as psot
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
  //again, same as post, but for lists
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
  //------------------------------------------------------------------------------------------------------------------
  async deleteComments(i)
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Please Confirm',
      message: 'Are you sure you want to delete this Comment? Once this action is completed, it cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

        }, {
          text: 'Ok',
          handler: () =>
          {

            this.deleteUserComment(i);
            this.loadComments();
            this.search4 = [];
          }
        }
      ]

    });

    await alert.present();
  }

  deleteUserComment(i)
  //again, same as post, but for lists
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:4200/delete-comments", { cid: i }, httpOptions)
      .subscribe(fdata =>
      {
        this.search4 = [];
      }, error =>
        {
          console.log('failure')
        });

  }

  //selecter for admin to determine which searchbar is currently displayed
  radiohandle(i): void
  {
    this.select = i;
  }
}


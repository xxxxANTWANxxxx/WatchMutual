import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup, NavParams, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit
{
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  edit: boolean = false;
  items = [];
  lid: number;
  name = this.navParams.get('string');
  year = this.navParams.get('int');
  title: string = this.name + ' (' + this.year + ')';

  constructor(private http: HttpClient, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit()
  {
    this.lid = this.navParams.get('passlid')
    this.loadList();
  }
  reorderItems(event)
  {
    const itemToMove = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

  loadList()
  {
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      };
      let postData = {

        "lid": this.lid
      }
      this.http.post("http://localhost:4200/list-pull", postData, httpOptions)
        .subscribe(tdata =>
        {
          this.items.push(tdata['results'].title1);
          this.items.push(tdata['results'].title2);
          this.items.push(tdata['results'].title3);
          this.items.push(tdata['results'].title4);
          this.items.push(tdata['results'].title5);
          this.items.push(tdata['results'].title6);
          this.items.push(tdata['results'].title7);
          this.items.push(tdata['results'].title8);
          this.items.push(tdata['results'].title9);
          this.items.push(tdata['results'].title10);
          if (this.name != undefined)
          { this.items.push(this.title) }
        }, error =>
          {
            console.log('failure')
          });
    }
  }

  updateList()
  {
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      };

      this.http.post("http://localhost:4200/list-update",
        {
          "title1": this.items[0],
          "title2": this.items[1],
          "title3": this.items[2],
          "title4": this.items[3],
          "title5": this.items[4],
          "title6": this.items[5],
          "title7": this.items[6],
          "title8": this.items[7],
          "title9": this.items[8],
          "title10": this.items[9],
          "lid": this.lid

        },
        httpOptions)
        .subscribe(tdata =>
        {

        }, error =>
          {
            console.log('failure')
          });
    }
  }

  toggleReorder()
  {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
    this.edit = !this.edit;
  }

  dismiss()
  {
    this.modalController.dismiss();
  }





}

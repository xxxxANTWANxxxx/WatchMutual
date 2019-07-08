import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';


@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit
{
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

  constructor() { }

  reorderItems(event)
  {


    const itemToMove = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
    console.log(this.items)


  }

  toggleReorder()
  {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


  ngOnInit()
  {
  }

}

import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{

  private num = 0
  private searchInput: string;
  private searchresults: any[] = [];
  private items = [];//posts
  private allData = [];
  information: any[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private list;
  private firstName: string;
  private lastName: string;


  constructor(private http: HttpClient, public router: Router, private dataService: DataService) { }



  ionViewWillEnter()
  {
    this.num = 0;
    this.items = [];
    this.loadLists();
    this.toggleInfiniteScroll();
  }

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


    this.http.post("http://localhost:4200/find-lists", postData, httpOptions)
      .subscribe(tdata =>
      {
        function arrayBufferToBase64(buffer)
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

        this.allData = tdata['results'];
        console.log(this.allData)
        for (let i = 0; i < this.allData.length; i++)
        {
          if (this.allData[i].user.pic != null)
            this.allData[i].user.pic = arrayBufferToBase64(this.allData[i].user.pic.data)
          else this.allData[i].user.pic = "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AwAAABA9Nf8A3PPPfzPvPPDPHbvnPPfPvPPvPHffPPHPPPXX/vP/AC0yw0ww+8wwx719hAKk8x0w4w404w6501+//wDe/wDPPvfLPPPPvPcYdMcQMPfvvPPPvPPPvPPPf/3/AM/627w586399+rXHPPLCdv/AO/99/O8Ptd99/fv/PdOfPPOcPevuezTRjzjTRHDvPN/de+PuvvPuf8A73//AC31yy40408tNOMMMONNA50824x6ww56w99//wD+/wDDPLHHDD7LKA0M8Us008YDzHDDjXDbvL3HbfvPfPHbfPfPfLfe4I4skME48obrPLHXPfHnTrnXf/X/AP8AM8dMtc/MsLjzzzjzTzzxtt+de/N+OdPP9t//AH33HzDTjPHrnt084Qk000wiDDTzbDDjjTDHDT//AP8A+8v/APvT/wD/AP8ATwww8844008b37z3f3Xbzznz3jb/AP7zz14x/wBc/wD4I4s888c08LH3jHHLrPLDP73ff/f/APyzw/023709mKPCNPPLIHyy/wCOfOe/OccO9ff/AP8A/wA/M9cuu+9d+/xxQyxxxflMdOscv+eveMfO9e//AP8A8+5888+8y27mPPOOPEFc+84968806984279//wD/AP7TrDTX77/PpD84wc0gej/LnzH/AO2219w6x/8A9/v989cN/wD3/wDw21/HPLLDKWz57z/7z7yxyzy3/wD/AP8A7yw4ww7z73111YHGLOMOEw306878y62w2119/wD/AP8Aw168491+916eNOFJNGBY2+29683+8x9888+6288z45/37z97bPKPPPPPPOb4f/8A/wD/AP5z/wC+/wD/AA3z991xx81+6ub/ADzjTTzjTzjztH7P/d/dPv8Av7/L3TTjPPLDcQts8888888880s888ZA03rXHbHP/wD77/8A89su53DRzjizyjzzzhDRDyTjzjxbL/8Af7//APzxyxw08p8OPNNKONPPPHPPPNPNPOPPNG1v+/8A/fOP/wD/AP8A97zxzzzzzyDzzyDzyBzyCDxzzzx7+P8A/wD/AP8A/8QAIREBAAICAgICAwAAAAAAAAAAAQARMEAhMUFQIFEQYXH/2gAIAQMBAT8Q90EH5n9x4fQnMPvAr8iyV6ALgV8kuIm+KMCXKrjdMQ53TvF23e2Ltu9sXbdHnEfT+m6/TxphzzhV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"
        }

        this.list = this.allData;
        this.addMoreItems()
      }, error =>
        {
          console.log('failure')
        });

  };

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
      //console.log('Done');
      this.addMoreItems();
      event.target.complete();

      //App logic to determine if all data is loaded
      //and disable the infinite scroll
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




  onInput($event)
  {
    let searchQuery = "http://www.omdbapi.com/?apikey=3a4e6009&s=" + this.searchInput;

    //const req = new HttpRequest('GET', searchQuery);

    this.http.get(searchQuery).subscribe({
      next: position =>
      {
        this.searchresults = position['Search'];
        if (this.searchresults !== undefined) this.searchresults.forEach(data =>
        {
          //console.log(data); //see data
          this.dataService.setData(42, this.searchresults);
          this.router.navigateByUrl('/search-results/42');
        });
      },
      error: msg => console.log('Error message: ', msg)
    });

  }

  clickEvent()
  {
    this.router.navigateByUrl('/stickers');
  }

  clickClicked(): void
  {
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:4200/create-lists", httpOptions)
      .subscribe(() =>
      {
        console.log("list created")
      }, error =>
        {
          console.log('failure')
        });*/
  }

  toggleSection(index)
  {
    this.information[index].open = !this.information[index].open;
  }
}
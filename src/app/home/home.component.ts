import { Component, OnInit } from '@angular/core';
import papers from "./../../assets/papers.json";
import { HttpClient } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BibdialogComponent } from '../bibdialog/bibdialog.component'

export interface bib_data
{
  bib: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected_bib;
  getbibfile(filename)
  {
    // and then:
    this.http.get('assets/bibtex/' + filename, {responseType: 'text'})
    .subscribe(data => 
      {
        this.selected_bib = data
      }
    );
  }
  mypapers = papers
  regular_papers = []
  demo_papers = []
  tutorials = []

  showbibtex(paper)
  {
    var mywindow = window.open("", "bibtex");
    mywindow.document.write(paper["bibtex"])
  }

  viewBib(selectedPaper) {
    // and then:
    this.http.get('assets/bibtex/' + selectedPaper, {responseType: 'text'})
    .subscribe(data => 
      {
        
        for (const line of data.split(/[\r\n]+/)){
          console.log(line);
          this.selected_bib = this.selected_bib + "\n" +line
        }

        this.selected_bib = data
        console.log('getting bib')
        console.log(this.selected_bib)
        var tmp = {
          bib: this.selected_bib
        }
        this.dialog.open(BibdialogComponent, {
          data: tmp
        });
      }
    );
    // this.dialog.open(BibdialogComponent, {
    //   data: bib
    // });
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {
    console.log(this.mypapers);
   }

  ngOnInit() {
    for(var i = 0; i < this.mypapers.length; i++)
    {
      var paper = this.mypapers[i]
      if(paper['type']==='demo')
      {
        this.demo_papers.push(paper)
      }
      else if(paper['type']==='tutorial')
      {
        this.tutorials.push(paper)
      }
      else
      {
        this.regular_papers.push(paper)
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import papers from "./../../assets/papers.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mypapers = papers
  regular_papers = []
  demo_papers = []
  tutorials = []

  showbibtex(paper)
  {
    var mywindow = window.open("", "bibtex");
    mywindow.document.write(paper["bibtex"])
  }

  constructor() {
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

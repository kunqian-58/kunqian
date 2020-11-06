import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface bib_data
{
  bib: string
}

@Component({
  selector: 'app-bibdialog',
  templateUrl: './bibdialog.component.html',
  styleUrls: ['./bibdialog.component.css']
})
export class BibdialogComponent implements OnInit {
  bibtex;
  massaged_bibtext = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: bib_data) {
    //  this.bibtext = data.bib.split("\n")
    this.bibtex = data.bib.split("\n")
    this.massaged_bibtext = data.bib.split("\n")
     console.log("in dialog")
     console.log(this.bibtex)

   }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../Column';
import { Person } from '../Person';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent {
  person:Person
  selectedId:number | null  = null
  childCol:Array<Column>
  columns:Array<Column>
  sex:Array<Column>
  sexVal:boolean=false

  constructor(private base:BaseService, private route: ActivatedRoute) {
    this.columns =base.getColumns()
    this.childCol =base.getChildCols()
    this.sex =base.getSex()
    // this.person = this.base.getPerson(this.selectedId)
    this.person = this.base.getChoosenPerson()

  }

  ngOnInit() {
    // this.person = this.base.getPerson(this.selectedId)
    this.person = this.base.getChoosenPerson()
    // if (this.selectedId!=null) {
    //   this.person = this.base.getPerson(this.selectedId)

    // }
      // this.person = this.base.getPersonById(this.selectedId)
  }
}

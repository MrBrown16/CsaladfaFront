import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { ActivatedRoute } from '@angular/router';
import { PersonNoId } from '../PersonNoId';
import { Column } from '../column';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent {
  person:any
  selectedId:any = null
  childCol:Array<Column>
  columns:Array<Column>


  constructor(private base:BaseService, private route: ActivatedRoute) {
    this.columns =base.getColumns()
    this.childCol =base.getChildCols()
  }

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get('id')
      this.person = this.base.getPersonById(this.selectedId)
  }
}

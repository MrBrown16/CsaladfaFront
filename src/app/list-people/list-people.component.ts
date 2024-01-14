import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { PersonWithId } from '../PersonWithId';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent {
  private columns:Array<Object>
  private childCols:Array<Object>
  private optionCols:Array<Object>
  private PeopleList:Array<PersonWithId> = new Array<PersonWithId>


  constructor(private base:BaseService, private router:Router){
    this.columns=base.getColumns()
    this.childCols=base.getChildCols()
    this.optionCols=base.getOptionCols()
    base.getPeople().subscribe((res:Array<PersonWithId>)=> {
      this.PeopleList=res
    })
  }

  deletePerson(id:number){
    this.base.delPerson(id)
  }
  editPerson(id:number){
    this.router.navigate(["/editPerson",id])
  }

}

import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { Person } from '../Person';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent {
  private columns:Array<Object>
  private childCols:Array<Object>
  private optionCols:Array<Object>
  peopleList:Array<Person> = new Array<Person>


  constructor(private base:BaseService, private router:Router){
    this.columns=base.getColumns()
    this.childCols=base.getChildCols()
    this.optionCols=base.getOptionCols()
    base.getPeople().subscribe((res:Array<Person>)=> {
      this.peopleList=res
    })
  }

  deletePerson(id:number){
    this.base.delPerson(id)
  }
  editPerson(person :Person){
    this.base.setChosenPerson(person)
    this.router.navigate(["/edit"])
  }

}

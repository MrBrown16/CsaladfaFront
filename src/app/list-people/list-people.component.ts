import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { Person } from '../Person';
import { Column } from '../Column';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent {
  columns:Array<Column>
  childCols:Array<Object>
  optionCols:Array<Object>
  peopleList:Array<Person> = new Array<Person>
  showDeathInfo = true;

  
  constructor(private base:BaseService, private router:Router){
    this.columns=base.getColumns()
    this.childCols=base.getChildCols()
    this.optionCols=base.getOptionCols()
    this.loadPeople()
  }
  loadPeople(){
    this.base.getPeople(true).subscribe((res:Array<Person>)=> {
      
      this.peopleList = res
    })
  }
  deletePerson(id:number){
    this.base.delPerson(id)
    // this.loadPeople()
  }
  editPerson(person :Person){
    this.base.setChosenPerson(person)
    this.router.navigate(["/edit",person.id])
  }
  
  
  isDeathDateInPast(person: Person): boolean {
    if (person.deathDate) {
      const deathDate = new Date(person.deathDate);
      const currentDate = new Date();
      return deathDate < currentDate;
    }
    return false;
  }
}

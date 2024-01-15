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
    this.person = this.base.getChoosenPerson()

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id']!=undefined && params['id']!=null) {
        const id = +params['id']; 
        console.log("there is an id")
        if (isNaN(id)) {
          console.log("id not a number")
          this.person = this.base.ifEmptyThenNull(new Person())
        }else{
          console.log("id is a number")
          this.loadPersonById(id);
          this.base.setChosenPerson(this.person)
        }
      } else {
        console.log("there is NO id")
        
        // Handle the case when 'id' parameter is not present
        this.person = this.base.getChoosenPerson()
      }
    });
  }

  loadPersonById(id: number) {
    this.base.getPerson(id).subscribe({
      next: (person: Person) => {
        console.log('Received person:', person);
        this.person=person
      },
      error: (error) => {
        console.error('Error getting person:', error);
      }
    });
  }
  newKid(){
    const newChild = { id: 0, name:"" };
    (this.person.children as { id: number; name: string }[]).push(newChild);
  }

  castToChildType(children: any): { id: number; name: string }[] {
    return children as { id: number; name: string }[];
  }
}

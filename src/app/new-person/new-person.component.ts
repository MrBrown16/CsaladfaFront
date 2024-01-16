import { ChangeDetectorRef, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../Column';
import { Person } from '../Person';
import { Observable, of } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';


@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent {
  person: Person
  selectedId: number | null = null
  childCol: Array<Column>
  columns: Array<Column>
  sex: Array<Column>
  sexVal: boolean = false
  id: number = 0
  
  constructor(private base: BaseService, private route: ActivatedRoute, private cdr:ChangeDetectorRef) {
    this.columns = base.getColumns()
    this.childCol = base.getChildCols()
    this.sex = base.getSex()
    this.person = this.base.getChoosenPerson()

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] != undefined && params['id'] != null) {
        this.id = +params['id'];
        console.log("there is an id")
        if (isNaN(this.id)) {
          console.log("id not a number")
          this.person = this.base.ifEmptyThenNull(new Person())
        } else {
          console.log("id is a number")
          this.loadPersonById(this.id);
          this.base.setChosenPerson(this.person)
        }
      } else {
        console.log("there is NO id")

        // Handle the case when 'id' parameter is not present
        this.person = this.base.getChoosenPerson()
      }
    });
  }
  
  
  toBoolean(sex: string) {
  return Boolean(sex)
  }

  searchPeople = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter((searchTerm) => searchTerm.length >= 3),
    switchMap((searchTerm) => this.base.getPersonByName(searchTerm))
  );

  resultFormatter = (result: { id: number; name: string; sex:boolean}) =>result.name;
  inputFormatter = (result: { id: number; name: string;sex:boolean }) =>  result.name;


  onSelectItem(event:NgbTypeaheadSelectItemEvent<{id:number;name:string; sex:boolean}>){
    event.preventDefault()
    if (event.item.sex) {
      console.log(event.item.name)
      this.person.motherName=event.item.name
      this.person.motherId=event.item.id
    }else{
      this.person.fatherName=event.item.name
      this.person.fatherId=event.item.id
    }
    // this.cdr.detectChanges();
  }

  loadPeopleByName(col: Column) {
    if (this.person[col.key] != null && this.person[col.key].length >= 3) {
      console.log(this.person[col.key])
      // console.log(col.key)
      this.base.getPersonByName(this.person[col.key]).subscribe((res: { id: number; name: string }[]) => {

      })

    }
  }


  loadPersonById(id: number) {
    this.base.getPerson(id).subscribe({
      next: (person: Person) => {
        console.log('Received person:', person);
        this.person = person
      },
      error: (error) => {
        console.error('Error getting person:', error);
      }
    });
  }
  newKid() {
    const newChild = { id: 0, name: "" };
    (this.person.children as { id: number; name: string }[]).push(newChild);
  }

  castToChildType(children: any): { id: number; name: string }[] {
    return children as { id: number; name: string }[];
  }
  zeroForId(child: any) {
    child.id = 0
  }

  save(person: Person) {
    if (person.id == 0 && this.id == 0) {
      this.base.postPerson(person)
    } else {
      this.base.putPerson(this.id, person)
    }
  }
  deleteP(id: number) {
    if (id != null && id != 0) {
      this.base.delPerson(id)
    }
  }
}

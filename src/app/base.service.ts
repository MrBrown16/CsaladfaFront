import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, find, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Person } from './Person';
import { Column } from './Column';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  chosenPerson: Person;


  private url = "http://localhost:8080/person/"

  private peopleList = new BehaviorSubject<Array<Person>>([new Person()])

  private childCol: Array<Column> = [
    { key: "id", text: "Id", type: "plain", size:50},
    { key: "name", text: "Név", type: "text", size:50},
  ]
  private columns: Array<Column> = [
    { key: "id", text: "Id", type: "number" , size:3},
    { key: "name", text: "Név", type: "text" , size:10},
    { key: "sex", text: "Nem", type: "radio" , size:5},
    { key: "birthDate", text: "Születési Dátum", type: "date" , size:9},
    { key: "birthLocation", text: "Születési hely", type: "text" , size:8},
    { key: "motherId", text: "Anyja Azonosítója", type: "number" , size:7},
    { key: "motherName", text: "Anyja Neve", type: "text" , size:8},
    { key: "fatherId", text: "Apja Azonosítója", type: "number" , size:7},
    { key: "fatherName", text: "Apja Neve", type: "text" , size:8},
    { key: "deathDate", text: "Halálozási Dátum", type: "date" , size:9},
    { key: "deathLocation", text: "Halálozási hely", type: "text" , size:7},
    { key: "children", text: "Gyermekei", type: "list" , size:11},
  ]
  private optionCols: Array<Column> = [
    { key: "delete", text: "Töröl", type: "button", size:50 },
    { key: "edit", text: "Módosít", type: "button", size:50}
  ]
  private sex: Array<Column> = [
    { key: "false", text: "Férfi", type: "radio", size:50},
    { key: "true", text: "Nő", type: "radio" , size:50}
  ]

  constructor(private http: HttpClient, private router: Router) {
    this.loadPeople()
    this.chosenPerson = new Person()
  }

  private loadPeople() {
    return this.http.get<Array<Person>>(this.url + "firstfifty").subscribe((res: Array<Person>) => {
        console.log(res)
        const processedPeople = res.map(person => {
          console.log(person)
          this.ifNullThenEmpty(person);
          return person;
        });
        this.peopleList.next(processedPeople);
      })
    }

    postPerson(body: Person) {
    console.log(body, "post")
    this.http.post(this.url + "create", this.ifEmptyThenNull(body)).subscribe({
      next: (res) => {
        console.log("successfull post")
        this.loadPeople()
        this.router.navigate(["/list-people"])
      },
      error: (err) => console.log("Error in post ", err)
    })
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.url + id).pipe(
      map((res: Person) => {
        console.log('Successfully got person:', res);
        this.ifNullThenEmpty(res)
        return res;
      }),
      catchError((error) => {
        console.error('Error in getPerson:', error);
        return throwError(() => error); // Pass a factory function to throwError
      })
    );
  }
  getPersonByName(name:string): Observable<Array<{id:number;name:string;sex:boolean}>> {
    console.log(name)
    return this.http.get<{id:number;name:string;sex:boolean}[]>((this.url+"reference/"+name)).pipe(
      map((res:{id:number;name:string; sex:boolean}[]) => {
        console.log('Successfully got person:', res);
        return res;
      }),
      catchError((error) => {
        console.error('Error in getPersonByName:', error);
        return throwError(() => error); // Pass a factory function to throwError
      })
    );
  }

  putPerson(id: number, body: Person) {
    console.log(id,body, "put")
    this.http.put(this.url + "update/" + id, this.ifEmptyThenNull(body)).subscribe({
      next: (res) => {
        console.log("successfull put"+ res)
        this.loadPeople()
        this.router.navigate(["/list-people"])
      },
      error: (err) => console.log("Error in put ", err)
    })
  }

  delPerson(id: number) {
    this.http.delete(this.url + "del/" + id).subscribe({
      next: (res) => {
        console.log("successfull del"+res)
        this.loadPeople()
        this.router.navigate(["/list-people"])
      },
      error: (err) => console.log("Error in del ", err)
    })
  }

  setChosenPerson(person: Person) {
    this.chosenPerson = person
  }

  getChoosenPerson() {
    return this.chosenPerson
  }
  getPeople(reload:boolean) {
    if (reload) {
      this.loadPeople()
    }
    return this.peopleList
  }
  getColumns() {
    return this.columns
  }
  getOptionCols() {
    return this.optionCols
  }
  getChildCols() {
    return this.childCol
  }
  getSex() {
    return this.sex
  }

  public ifNullThenEmpty(person: Person) {
    this.columns.forEach(col => {
      if (person[col['key']] == null) {

        if (person[col['key']] == null) {
          // Check the type of the property and set it accordingly
          if (typeof person[col['key']] == 'string') {
            person[col['key']] = '';
          } else if (typeof person[col['key']] == 'number') {
            person[col['key']] = 0;
          } else if (typeof person[col['key']] == 'boolean') {
            person[col['key']] = false;
          }
        }
      }
    });
    return person
  }

  ifEmptyThenNull(person: Person): Person {
    const result: Person = {} as Person;

    for (const key in person) {
      if (person.hasOwnProperty(key)) {
        const value = person[key];

        if (key == 'children' && Array.isArray(value)) {
          // If the property is 'children' and it's an array, apply the check for each child
          result[key] = value.map((child: any) => ({
            id: typeof child.id == 'number' && child.id == 0 ? null : child.id,
            name: typeof child.name == 'string' && child.name.length < 3 ? null : child.name,
          }));
        } else if (typeof value == 'number' && value == 0) {
          result[key] = null;
        } else if (typeof value == 'string' && value.length < 3) {
          result[key] = null;
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  }
}


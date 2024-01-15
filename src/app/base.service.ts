import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, find } from 'rxjs';
import { Router } from '@angular/router';
import { Person } from './Person';
import { Column } from './Column';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  chosenPerson: Person;


  private url="http://localhost:8080/person/"

  private peopleList= new BehaviorSubject<any>([])

  private childCol:Array<Column>=[
    {key:"id", text:"Id", type:"plain"},
    {key:"name", text:"Név", type:"text"},
  ]
  private columns:Array<Column>=[
    {key:"id", text:"Id", type:"plain"},
    {key:"name", text:"Név", type:"text"},
    {key:"sex", text:"Nem", type:"radio"},
    {key:"birthDate", text:"Születési Dátum", type:"date"},
    {key:"birthLocation", text:"Születési hely", type:"text"},
    {key:"motherId", text:"Anyja Azonosítója", type:"number"},
    {key:"motherName", text:"Anyja Neve", type:"text"},
    {key:"fatherId", text:"Apja Azonosítója", type:"number"},
    {key:"fatherName", text:"Apja Neve", type:"text"},
    {key:"deathDate", text:"Halálozási Dátum", type:"date"},
    {key:"deathLocation", text:"Halálozási hely", type:"text"},
    {key:"children", text:"Gyermekei", type:"list"},
  ]
  private optionCols:Array<Column>=[
    {key:"delete", text:"Töröl", type:"button"},
    {key:"edit", text:"Módosít", type:"button"}
  ]
  private sex:Array<Column>=[
    {key:false, text:"Férfi", type:"radio"},
    {key:true, text:"Nő", type:"radio"}
  ]



  constructor(private http:HttpClient, private router:Router) {
    this.loadPeople()
    this.getPerson(1)
    this.chosenPerson= new Person()
  }

  private loadPeople(){
    return this.http.get(this.url+"firstfifty").subscribe({
      next:(res)=>{
        this.peopleList.next(res)
      },
      error:(err)=>console.log("Error in get ",err),
    })
  }
  // getPersonById(id:number):Person{
  //   let person = new Person();
  //   this.peopleList.subscribe((res)=>{
  //     res.find((pers:Person)=>{
  //       if (pers.id==id) {
  //        person= pers
  //        console.log("person match")
  //       }else{
  //         console.log("no match for id "+id+" : "+pers.id)
  //       }
  //       return person
  //     })})
  //     return person;
  //   }

  postPerson(body:Person){
    this.http.post(this.url+"create",body).subscribe({
      next:(res)=>{
        console.log("successfull post")
        this.loadPeople()
        this.router.navigate(["/list-people"])
      },
      error:(err)=>console.log("Error in post ",err)
    })
  }
  getPerson(id:number){
    return this.http.get(this.url+id).subscribe((res:Object)=>{
      // this.peopleList.next(Array.of(res))
      console.log("successfull get" + res)
      return res
      // this.router.navigate(["/list-people"])
    })
  }
  // getPerson(id:number){
    //   let person:Person;
    //   this.http.get(this.url+id).subscribe({
      //     next:(res)=>{
        //       // this.peopleList.next(Array.of(res))
        //       console.log("successfull get" + res)
        //       person = res
        //       // this.router.navigate(["/list-people"])
        //     },
        //     error:(err)=>console.log("Error in getPerson ",err)
        //   })
  //   if (person) {
    //     console.log(person)
    //     return person
    //   }
    //   console.log(person)
    //   console.log("first return doesn't work")
    //   return new Person()
    // }

    putPerson(id:number,body:Person){
      this.http.put(this.url+"create/"+id,body).subscribe({
      next:(res)=>{
        console.log("successfull put")
        this.loadPeople()
        this.router.navigate(["/list-people"])
      },
      error:(err)=>console.log("Error in put ",err)
    })
  }

  delPerson(id:number){
    this.http.delete(this.url+"del/"+id).subscribe({
      next:(res)=>{
        console.log("successfull del")
        this.loadPeople()
        this.router.navigate(["/list-people"])
      },
      error:(err)=>console.log("Error in del ",err)
    })
  }




  setChosenPerson(person : Person) {
    this.chosenPerson = person
  }






  getChoosenPerson(){
    return this.chosenPerson
  }
  getPeople(){
    return this.peopleList
  }
  getColumns(){
    return this.columns
  }
  getOptionCols(){
    return this.optionCols
  }
  getChildCols(){
    return this.childCol
  }
  getSex(){
    return this.sex
  }




}

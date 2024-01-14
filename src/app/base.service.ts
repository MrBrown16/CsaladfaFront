import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, find } from 'rxjs';
import { Router } from '@angular/router';
import { PersonWithId } from './PersonWithId';
import { PersonNoId } from './PersonNoId';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  
  private url="http://localhost:8080/person/"  
  
  private peopleList= new BehaviorSubject<any>([])
  
  private childCol:Array<Object>=[
    {key:"id", text:"Id", type:"plain"},
    {key:"name", text:"Név", type:"text"},
  ]
  private columns:Array<Object>=[
    {key:"id", text:"Id", type:"plain"},
    {key:"name", text:"Név", type:"text"},
    {key:"sex", text:"Nem", type:"boolean"},
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
  private optionCols:Array<Object>=[
    {key:"delete", text:"Töröl", type:"button"},
    {key:"edit", text:"Módosít", type:"button"}
  ]



  constructor(private http:HttpClient, private router:Router) { 
    this.loadPeople()
  }

  private loadPeople(){
    return this.http.get(this.url,).subscribe({
      next:(res)=>{
        this.peopleList.next(res)
      },
      error:(err)=>console.log("Error in get ",err),
    })
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
  getPersonById(id:number){
     return this.peopleList.subscribe((res)=>{
     return res.find((pers:any)=>{
       if (pers.id===id) {
         return pers 
       }else{
        return new PersonNoId()
       }
    })})
  }
  
  postPerson(body:PersonNoId){
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
    this.http.get(this.url+id).subscribe({
      next:(res)=>{
        console.log("successfull get" + res)
        this.router.navigate(["/list-people"])
      },
      error:(err)=>console.log("Error in put ",err)
    })
  }
  putPerson(id:number,body:PersonWithId){
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


}
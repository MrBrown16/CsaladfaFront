export class Person {

    "id": number|null
    "name": string
    "sex": boolean
    "birthDate": string
    "birthLocation": string
    "motherId": number|null
    "motherName": string
    "fatherId": number|null
    "fatherName": string
    "deathDate": string
    "deathLocation": string
    "children": [{"id":number, "name":string}] |[]

    constructor(){
      this.id=null
      this.name =""
      this.sex=false
      this.birthDate=""
      this.birthLocation=""
      this.motherId=null
      this.motherName=""
      this.fatherId=null
      this.fatherName=""
      this.deathDate=""
      this.deathLocation=""
      this.children=[]
    }
}

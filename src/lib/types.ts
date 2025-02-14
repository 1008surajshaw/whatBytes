export interface User{
    id : number;
    name : string;
    email : string;
    password : string;
    createdAt :Date;
 }

 export interface PatientType{
     id : number;
     name : string;
     age : number;
     gender : string;
     medicalHistory : string;
     createdAt :Date;
     updatedAt :Date;
  
 }

 export interface DoctorType{
   id: number;
   name: string;
   specialization: string;
   experience: number;
   createdAt:Date;
   updatedAt:Date;

 }
  
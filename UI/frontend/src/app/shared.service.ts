import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="http://localhost:5057/api";
  readonly PhotoUrl="http://localhost:5057/Photos/";

  constructor(private http:HttpClient) { }

  getDeptList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Department');
  }
  addDepartment(value:any){
    return this.http.post(this.APIUrl+'/Department',value);
  }
  updateDepartment(value:any){
    return this.http.put(this.APIUrl+'/Department',value);
  }
  deleteDepartment(value:any){
    return this.http.delete(this.APIUrl+'/Department/'+value);
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee');
  }
  addEmployee(value:any){
    return this.http.post(this.APIUrl+'/Employee',value);
  }
  updateEmployee(value:any){
    return this.http.put(this.APIUrl+'/Employee',value);
  }
  deleteEmployee(value:any){
    return this.http.delete(this.APIUrl+'/Employee/'+value);
  }

  uploadPhoto(value:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile',value)
  }

  
  getDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee/GetDepartmentNames');
  }
}

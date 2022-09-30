import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.scss']
})
export class ShowEmployeeComponent implements OnInit {

  empList:any=[];
  modalTitle:string='';
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  constructor( private service: SharedService) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:'',
      Department:'',
      DateOfJoin:'',
      ProfilePicture:'dummy.jpg',
      Status:1
    }
    this.modalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.getEmpList();
  }

  editClick(item:any){
    this.emp=item;
    console.log(this.emp);
    this.modalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }
  deleteclick(item:any){
    if(confirm('Are you Sure?')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(res=>{
        alert(res.toString());
        this.getEmpList();
      });
    }
  }

  getEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.empList=data;
      console.log(this.empList);
    });
  }
}

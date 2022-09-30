import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() emp:any;
  EmployeeId:string='';
  EmployeeName:string='';
  Department:string='';
  DateOfJoin:string='';
  ProfilePicture:string='';
  PhotoFilePath:string='';
  Status:string='';

  DepartmentList:any=[];

  ngOnInit(): void {
    // this.DepartmentId=this.dep.DepartmentId;
    // this.DepartmentName=this.dep.DepartmentName;
    // this.Status = this.dep.Status;
    this.getDepartmentList();
  }

  getDepartmentList(){
    this.service.getDepartmentNames().subscribe(res=>{
      this.DepartmentList = res;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoin = this.emp.DateOfJoin;
      this.ProfilePicture = this.emp.ProfilePicture;
      this.PhotoFilePath = this.service.PhotoUrl+this.ProfilePicture;
      console.log(this.PhotoFilePath)
    });
  }

  addEmployee(){
    var value = {
      EmployeeId : this.EmployeeId,
      EmployeeName : this.EmployeeName,
      Department : this.Department,
      DateOfJoin : this.DateOfJoin,
      ProfilePicture : this.ProfilePicture,
      Status : this.Status
    };
    console.log(value)
    this.service.addEmployee(value).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateEmployee(){
    var value = {
      EmployeeId : this.EmployeeId,
      EmployeeName : this.EmployeeName,
      Department : this.Department,
      DateOfJoin : this.DateOfJoin,
      ProfilePicture : this.ProfilePicture,
      Status : this.Status
    };

    this.service.updateEmployee(value).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadProfilePicture(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();

    formData.append('uploadedFile',file,file.name);

    this.service.uploadPhoto(formData).subscribe(res=>{
      this.ProfilePicture = res.toString();
      this.PhotoFilePath = this.service.PhotoUrl+this.ProfilePicture;
    });
  }
}

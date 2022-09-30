import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() dep:any;
  DepartmentId:string='';
  DepartmentName:string='';
  Status:string='';

  ngOnInit(): void {
    this.DepartmentId=this.dep.DepartmentId;
    this.DepartmentName=this.dep.DepartmentName;
    this.Status = this.dep.Status;
  }

  addDepartment(){
    var value = {
      DepartmentId : this.DepartmentId,
      DepartmentName : this.DepartmentName,
      Status : this.Status
    };
    console.log(value)
    this.service.addDepartment(value).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateDepartment(){
    var value = {
      DepartmentId : this.DepartmentId,
      DepartmentName : this.DepartmentName,
      Status : this.Status
    };

    this.service.updateDepartment(value).subscribe(res=>{
      alert(res.toString());
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.scss']
})
export class ShowDepartmentComponent implements OnInit {

  deptList:any=[];
  modalTitle:string='';
  ActivateAddEditDepComp:boolean=false;
  dep:any;
  constructor( private service: SharedService) { }

  ngOnInit(): void {
    this.getDeptList();
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:"",
      Status:1
    }
    this.modalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.getDeptList();
  }

  getDeptList(){
    this.service.getDeptList().subscribe(data=>{
      this.deptList=data;
      console.log(this.deptList);
    });
  }

}

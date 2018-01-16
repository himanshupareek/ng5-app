import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TargetService } from '../target.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Target } from '../target';
import { ParamMap } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {Location} from '@angular/common';
import { TargetPerformance } from '../targetPerformance';
import { debounce } from 'rxjs/operators/debounce';
import { CompanyStatus } from '../companyStatus';
import { PerformanceConstants } from '../PerformanceConst';
import { StatusConstants } from '../statusConst';

@Component({
  selector: 'app-target-edit',
  templateUrl: './target-edit.component.html',
  styleUrls: ['./target-edit.component.css']
})
export class TargetEditComponent implements OnInit {

  @ViewChild('f') editedForm : NgForm;

  editMode : boolean = true;
  editedItemIndex : number;
  startedEditSubscription : Subscription;
  editedItem : Target;
  
  target : Target;
  id : number;

  performances = [
     new TargetPerformance(0, new PerformanceConstants().Performance_Poor ),
     new TargetPerformance(1, new PerformanceConstants().Performance_Average ),
     new TargetPerformance(2, new PerformanceConstants().Performance_Good ),
     new TargetPerformance(3, new PerformanceConstants().Performance_Best ),
  ];

  statuses = [
    new CompanyStatus(0, new StatusConstants().Status_Researching ),
    new CompanyStatus(1, new StatusConstants().Status_Pending ),
    new CompanyStatus(2, new StatusConstants().Status_Approved ),
    new CompanyStatus(3, new StatusConstants().Status_Declined ),
 ];

  selectedPerformance:number;
  selectedStatus:number;
  
  constructor(private targetService : TargetService, private route : ActivatedRoute,
              private _location : Location, private router : Router,) { }

  ngOnInit() {
    // this.startedEditSubscription = this.targetService.startedEditing.subscribe(
    //   (index : number) => {
    //     debugger
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       //this.editedItem = this.targetService.getTarget(index);
    //       this.editedItem = new Target("d", "dd",11, "dd");

    //       this.editedForm.setValue({
    //         status : 'this.editedItem.status',
    //         companyInfo : 'this.editedItem.companyInfo',
    //         contacts : 111,
    //         performance : 'this.editedItem.financialPerformance'
    //       })
    //   }
    // )
    
    this.route.paramMap.subscribe(
      (params : ParamMap) => {
        //Add Target
        if(params.get('id') == null)
        {
          this.id = -1,
          this.target = new Target("", "", 0, ""),
          this.selectedPerformance = 0,
          this.selectedStatus = 0,
          this.editMode = false
        } 
        else{
          this.id = +params.get('id'),
          this.target = this.targetService.getTarget(this.id),
          // this.selectedPerformance = new TargetPerformance(
          //   this.performances.find((x) => x.name == this.target.financialPerformance).id,
          //   this.target.financialPerformance  
          // )
          this.selectedPerformance = this.performances.find((x) => x.name == this.target.financialPerformance).id,
          this.selectedStatus = this.statuses.find((x) => x.name == this.target.status).id,
          this.editMode = true
        }
      }
    )
  }
  onSubmit(form : NgForm)
  {
    const status = form.value.status;
    const companyInfo = form.value.companyInfo;
    const contacts = form.value.KeyContacts;
    //const performance = form.value.financialPerformance;
    
    let performId = form.value.financialPerformance;
    let performance = this.performances.find( (x) => x.id == performId ).name;

    let statusId = form.value.status;
    let statusName = this.statuses.find( (x) => x.id == statusId ).name;

    this.selectedPerformance =  performId;
    this.selectedStatus =  statusId;
    const targetObj = new Target(statusName, companyInfo, contacts, performance);

    if(this.editMode)
    {
      this.targetService.updateTarget(this.id, targetObj)
    }
    else{
      this.targetService.addTarget(targetObj)
    }

    this.editMode = true;
    form.reset();
    this.backLocation();
  }

  onCancel(){
    this.backLocation();
  }

  private backLocation() : void{
    debugger;
    this.router.navigate(["../"], {relativeTo : this.route});
  }
}

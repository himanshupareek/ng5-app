import { Component, OnInit, OnDestroy } from '@angular/core';
import { Target } from '../target';
import { TargetService } from '../target.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit, OnDestroy {

  targets : Target[] = [];
  subscription : Subscription;

  constructor(private targetService : TargetService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.targets = this.targetService.getTargets();

    this.subscription = this.targetService.targetChanged.subscribe(
      (targs : Target[]) => this.targets = targs
    )

    this.cols = [
      {field: 'status', header: 'Status'},
      {field: 'companyInfo', header: 'Company Info'},
      {field: 'KeyContacts', header: 'Contact'},
      {field: 'financialPerformance', header: 'Performance'}
  ];

  }

  cols: any[];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewTargetClick() : void {
    this.router.navigate(['newTarget'], { relativeTo : this.route })
  }

  
}

import { 
  Component, OnChanges, Input, 
  trigger, state, animate, transition, style, OnInit
} from '@angular/core';

import { TargetService } from '../target.service';
import { ActivatedRoute, Params, Router, ParamMap } from "@angular/router";
import { Target } from '../target';
import { debug } from 'util';
import { Location } from '@angular/common';
import { TargetPerformance } from '../targetPerformance';
import { BarChartData } from '../barChartData';
import { retry } from 'rxjs/operators/retry';
import { debounce } from 'rxjs/operators/debounce';
import { PerformanceConstants } from '../PerformanceConst';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('1 => 0', animate('600ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})
export class TargetDetailComponent implements OnInit {

  target : Target;
  id : number;
  @Input() isVisible : boolean = true;
  chartBtnText : string = "Hide Chart";
  barChartData : BarChartData[] ;

  constructor(private targetService : TargetService,
              private route : ActivatedRoute,
              private router : Router,
              private location : Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params : ParamMap) => {
        this.id = +params.get('id'),
        this.target = this.targetService.getTarget(this.id);
        this.barChartData = this.getBarChartData(this.target.financialPerformance);
      }
    )
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  getBarChartData(financialPerformance : string) : BarChartData[]{
    switch(financialPerformance){
      case new PerformanceConstants().Performance_Poor:
        return new BarChartData().barChartDataPoor;
      case new PerformanceConstants().Performance_Average:
        return new BarChartData().barChartDataAverage;
      case new PerformanceConstants().Performance_Good:
        return new BarChartData().barChartDataGood;
      case new PerformanceConstants().Performance_Best:
        return new BarChartData().barChartDataBest;
      default:
        return new BarChartData().barChartDataAverage;
    }
  }

  onEditTargetClick(){
    this.targetService.startedEditing.next(this.id);
    this.router.navigate(['../', this.id, 'edit'], { relativeTo : this.route })
  }

  onDeleteTarget(){
    this.targetService.deleteTarget(this.id);
    this.router.navigate(["../"], {relativeTo : this.route});
  }

  toggleChart(){
    this.isVisible = !this.isVisible;
    this.chartBtnText = this.chartBtnText == "Show Chart" ? "Hide Chart" : "Show Chart";
  }
}

import { Injectable } from '@angular/core';
import { Target } from './target';
import { Subject } from 'rxjs/Subject';
import { StatusConstants } from './statusConst';
import { PerformanceConstants } from './PerformanceConst';

@Injectable()
export class TargetService {

  startedEditing = new Subject<number>();
  targetChanged = new Subject<Target[]>();
  
  constructor() { }

  private targets : Target[] = [
    new Target(
        new StatusConstants().Status_Researching, 
        "ABC Company",
        1234567890,
        new PerformanceConstants().Performance_Average
    ),
    new Target(
      new StatusConstants().Status_Pending, 
      "DEF Company",
      9998887777,
      new PerformanceConstants().Performance_Best
    ),
    new Target(
      new StatusConstants().Status_Approved, 
      "GHI Company",
      1112223333,
      new PerformanceConstants().Performance_Good
    ),
    new Target(
      new StatusConstants().Status_Declined, 
      "JKL Company",
      8889990000,
      new PerformanceConstants().Performance_Best
    )
  ]


    getTargets()
    {
        return this.targets.slice();
    }

    getTarget(index : number)
    {
        return this.targets[index];
    }

    updateTarget(index : number, target : Target){
        this.targets[index] = target;
        this.targetChanged.next(this.targets.slice())
    }

    addTarget(target : Target){
      this.targets.push(target);
      this.targetChanged.next(this.targets.slice())
    }

    deleteTarget(id : number){
      this.targets.splice(id, 1);
      this.targetChanged.next(this.targets.slice())
    }
}

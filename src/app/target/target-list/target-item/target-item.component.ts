import { Component, OnInit, Input } from '@angular/core';
import { Target } from '../../target';

@Component({
  selector: 'app-target-item',
  templateUrl: './target-item.component.html',
  styleUrls: ['./target-item.component.css']
})
export class TargetItemComponent implements OnInit {

  @Input() target : Target;
  @Input() index : number;

  constructor() { }

  ngOnInit() {
  }

}

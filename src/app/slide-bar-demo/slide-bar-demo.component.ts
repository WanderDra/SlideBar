import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-slide-bar-demo',
  templateUrl: './slide-bar-demo.component.html',
  styleUrls: ['./slide-bar-demo.component.scss']
})
export class SlideBarDemoComponent implements OnInit, AfterViewInit {

  @Output() max = 200;
  @Output() min = 0;

  private _value: number = 0;
  imgMaxWidth = 400;
  imgWidthStr = `${this.imgMaxWidth}px`;


  set value(val: number){
    if (val > this.max){
      this._value = this.max;
    } else if (val < this.min){
      this._value = this.min;
    }else{
      this._value = val;
    }
    this.imgWidthStr = `${this.imgMaxWidth * (this._value / 100)}px`;
  }

  get value(){
    return this._value;
  }


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.value = 100;
  }

}

import { Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.scss']
})
export class SlideBarComponent implements OnInit, OnDestroy {

  

  barWidth: number = 220;
  @Input() lineWidth?: number;
  lineWidthStr: string = ``
  barWidthStr: string = ``
  filledLineWidthStr: string = ``;

  @ViewChild('line') line?: ElementRef;

  @Input() min: number = 0;
  @Input() max: number = 100;

  private _value = 0;
  @Output() valueChange = new EventEmitter<number>();

  mouseX: number = 0;

  isMouseDown: boolean = false;

  private _translate$ = new BehaviorSubject(0);

  set translate(value: number){
    if (value < this.line?.nativeElement.getBoundingClientRect().left){
      this._translate$.next(0);
    } else if (value > this.lineWidth + this.line?.nativeElement.getBoundingClientRect().left){
      this._translate$.next(this.lineWidth!);
    } else{
      this._translate$.next(value - this.line?.nativeElement.getBoundingClientRect().left);
    }
  }

  get translate(){
    return this._translate$.value;
  }

  @Input() set value(val: number){
    this._value = val;
    this.setValue(val);
  }

  get value(){
    return this._value;
  }

  translateStr: string = `translateX(0px)`

  constructor() {
   }

  ngOnInit(): void {
    this._translate$.subscribe(mouseX => {
      this.translateStr = `translateX(${mouseX}px)`
      this.filledLineWidthStr = `${mouseX}px`
    });
    this.lineWidthStr = `${this.lineWidth}px`
    this.barWidthStr = `${this.lineWidth!+20}px`
    
  }

  onMouseMove(event: MouseEvent){
    if(this.isMouseDown){
      this.translate = event.offsetX;
    }
    this.valueChange.emit(this.getValue());
    
  }

  onMouseDown(){
    this.isMouseDown = true;
  }

  onMouseUp(){
    this.isMouseDown = false;
  }

  getValue(){
    const length = this.max - this.min;
    return this.min + (length / this.lineWidth!) * this.translate;
  }

  setValue(val: number){
    const length = this.max - this.min;
    this.translate = (this.lineWidth! / length) * (val - this.min) + this.line?.nativeElement.getBoundingClientRect().left;
  }

  ngOnDestroy(){
    this._translate$.unsubscribe();
  }


}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  @Input()
  collapsible: boolean | undefined;
  @Input()
  closable: boolean | undefined;
  @Input()
  title: string | undefined;
  @Input()
  color: string | undefined;
  @Input()
  leftColor: boolean | undefined;
  @Input()
  loading: boolean | undefined;
  @Input()
  collapsed: boolean | undefined;
  closed: boolean | undefined;
  constructor() {
    if (this.collapsed === undefined) {
      this.collapsed = false;
    }
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doSomething(this.loading);
  }

  doSomething(input: boolean | undefined): void {
  }

  toggle(): void {
    this.collapsed = !this.collapsed;
  }
  close(): void {
    this.closed = true;
  }
}

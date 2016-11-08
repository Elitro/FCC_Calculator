import { ArithmeticService } from './../arithmetic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  centralPanel: Array<any> = new Array<any>();

  buttonsPerRow: number = 4;

  constructor(private service: ArithmeticService) {
  }

  ngOnInit() {
    this.centralPanel = [
      7, 8, 9, '+',
      4, 5, 6, '-',
      1, 2, 3, 'x',
      '±', 0, '.', '/'
    ];
  }

  getButtonSize(buttonsPerRow: number): string {
    let size = 12 / buttonsPerRow;
    return 'col-xs-' + size;
  }

  getButtonColor(index: number, buttonsPerRow: number): string {
    if (index % buttonsPerRow === 0) {
      return 'btn-default';
    } else {
      return 'btn-primary';
    }
  }

  pressButton(input: any) {
    this.service.inputEvent(input);
  }

}

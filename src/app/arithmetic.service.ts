import { Injectable } from '@angular/core';

@Injectable()
export class ArithmeticService {

  result: number = 0;
  buffer: string = '';
  cleanFlag = 0;
  finalResult: number = null;
  signalBuffer: string = '';

  firstOperation: boolean = true;

  constructor() { }

  applyOperation(signal: string, a: number, b: number) {
    console.log('a:', a, 'b:', b, 'oper:', signal);
    if (signal === '+') {
      return a + b;
    } else if (signal === 'x') {
      return a * b;
    } else if (signal === '-') {
      return a - b;
    } else if (signal === '/') {
      return a / b;
    }
  }

  inputEvent(input: any) {

    if (input === 'C') {
      this.buffer = '';
      this.result = 0;
      this.cleanFlag = 0;
      this.finalResult = null;
      this.firstOperation = true;

    } else if (input === '=') {
      this.buffer = '';
      this.result = this.applyOperation(this.signalBuffer, this.finalResult, this.result);
      this.cleanFlag = 1;
      this.finalResult = null;
      this.firstOperation = true;

    } else if (input === '+' || input === '-' || input === 'x' || input === '/') {
      this.buffer = this.buffer.concat(this.result.toString()).concat(input);
      this.cleanFlag = 1;
      if (!this.firstOperation) {
        this.finalResult = this.applyOperation(input, this.finalResult, this.result);
      }
      this.signalBuffer = input;
      this.firstOperation = false;
    } else if (input === '±') {
      this.result = this.result * (-1);
    } else if (input === '.') {

    } else {
      if (this.cleanFlag === 1) {
        this.result = input;
      } else {
        this.result = parseInt(this.result.toString().concat(input), 10);
        this.finalResult = this.finalResult === null ? this.result : this.finalResult;
      }
    }
  }

}

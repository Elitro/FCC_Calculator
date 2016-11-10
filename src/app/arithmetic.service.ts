import { Injectable } from '@angular/core';

@Injectable()
export class ArithmeticService {

  result: number = 0;
  /*
  buffer: string = '';
  cleanFlag = 0;
  finalResult: number = null;
  
  firstOperation: boolean = true;*/

  operationString: string = '';
  currentOperation: string = '';
  lastOperation: string = '';
  signalBuffer: string = '';
  finalResult: string = '';

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

  breakActionsIntoArray(input: string): Array<any> {
    let currentBuffer = '';
    let arrayOfOperations: Array<any> = new Array<any>();

    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i) !== 'x' && input.charAt(i) !== '/' && input.charAt(i) !== '+') {
        currentBuffer = currentBuffer.concat(input.charAt(i));
      } else if (input.charAt(i) === '-') {
        if (input.charAt(i + 1) && input.charAt(i + 1) === '-') {
          arrayOfOperations.push(input.charAt(i));
          currentBuffer = '';
          currentBuffer = currentBuffer.concat(input.charAt(i + 1));
          i++;
        }
      } else {
        arrayOfOperations.push(currentBuffer);
        arrayOfOperations.push(input.charAt(i));

        currentBuffer = '';
      }
    }

    arrayOfOperations.push(currentBuffer);

    console.log('actions:', arrayOfOperations);

    return arrayOfOperations;
  }

  executeOperations(operationString: string): number {
    let result = 0;
    let arrayOfOperations: Array<any> = this.breakActionsIntoArray(operationString);

    result = parseFloat(arrayOfOperations[0]);

    for (let i = 0; i < arrayOfOperations.length - 1; i = i + 2) {
      result = this.applyOperation(arrayOfOperations[i + 1], result, parseFloat(arrayOfOperations[i + 2]));
    }

    return result;
  }

  clearVars(): void {
    this.currentOperation = '';
    this.operationString = '';
    this.lastOperation = '';
  }

  inputEvent(input: any) {

    this.finalResult = '';

    if (input === 'C') {
      this.clearVars();

    } else if (input === '=') {
      if (this.currentOperation && this.signalBuffer.length === 0) {
        this.operationString = this.operationString.concat(this.currentOperation);
        console.log(this.operationString);
        this.finalResult = this.executeOperations(this.operationString).toString();
        this.clearVars();
      }
    } else if (input === '+' || input === '-' || input === 'x' || input === '/') {
      if (this.signalBuffer.length === 0) {
        this.lastOperation = this.currentOperation;
      }
      this.currentOperation = input;
      this.signalBuffer = input;

    } else if (input === '±') {
      // If the last action wasn't an operation
      if (this.signalBuffer.length === 0) {
        this.currentOperation = (parseFloat(this.currentOperation) * (-1)).toString();
      }

    } else if (input === '.') {
      this.currentOperation = this.currentOperation.toString().concat(input);

    } else {
      input = input.toString();
      if (this.signalBuffer.length > 0) {
        this.operationString = this.operationString.concat(this.lastOperation).concat(this.signalBuffer);
        this.currentOperation = input;
        this.signalBuffer = '';
        this.lastOperation = '';
      } else {
        this.currentOperation = this.currentOperation.concat(input);
      }
    }
  }

}

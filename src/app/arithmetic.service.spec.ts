/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArithmeticService } from './arithmetic.service';

describe('Service: Arithmetic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArithmeticService]
    });
  });

  it('should ...', inject([ArithmeticService], (service: ArithmeticService) => {
    expect(service).toBeTruthy();
  }));
});

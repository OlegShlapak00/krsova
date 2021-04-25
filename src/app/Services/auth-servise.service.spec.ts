import { TestBed } from '@angular/core/testing';

import { AuthServiseService } from './auth-servise.service';

describe('AuthServiseService', () => {
  let service: AuthServiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

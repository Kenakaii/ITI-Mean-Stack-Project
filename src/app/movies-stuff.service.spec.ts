import { TestBed } from '@angular/core/testing';

import { MoviesStuffService } from './movies-stuff.service';

describe('MoviesStuffService', () => {
  let service: MoviesStuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesStuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

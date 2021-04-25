import { TruckStatusPipe } from './truck-status.pipe';

describe('TruckStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TruckStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

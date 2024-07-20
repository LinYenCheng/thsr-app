import { expect, describe, it } from 'vitest';
import { getTravelTime } from './util';

describe.concurrent('util', () => {
  it('should calculate the correct travel time', () => {
    const date = '2023-12-10';
    const start = '08:00';
    const end = '10:30';
    const expectedTravelTime = '02:30';

    const result = getTravelTime({ date, start, end });

    expect(result).toBe(expectedTravelTime);
  });
});

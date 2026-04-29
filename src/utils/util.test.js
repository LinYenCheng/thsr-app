import { describe, it, expect } from 'vitest';
import { getTravelTime } from './util';

describe('util Functions', () => {
  it('should calculate the correct travel time', () => {
    const date = '2026-04-28';
    const start = '10:00';
    const end = '11:30';
    const travelTime = getTravelTime({ date, start, end });
    expect(travelTime).toBe('01:30');
  });
});

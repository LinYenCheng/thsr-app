import { describe, expect, it } from 'vitest';
import Root from './Root';
import { render, screen } from './utils/test-utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<Root />);
    expect(screen.getByText(/高鐵時刻表班次快速查詢/i)).toBeInTheDocument();
  });
});

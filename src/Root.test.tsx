import { describe, it, expect } from 'vitest';
import { render, screen } from './utils/test-utils';
import Root from './Root';

describe('Root Component', () => {
  it('renders the application title', () => {
    render(<Root />);
    expect(screen.getByText(/高鐵時刻表班次快速查詢/i)).toBeInTheDocument();
  });
});

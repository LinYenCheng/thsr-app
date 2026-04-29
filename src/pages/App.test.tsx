import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import App from './App';

describe('App Component', () => {
  it('renders the application title', () => {
    render(<App />);
    expect(screen.getByText(/高鐵時刻表班次快速查詢/i)).toBeInTheDocument();
  });
});

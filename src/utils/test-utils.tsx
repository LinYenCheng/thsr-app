/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/export */
import { cleanup, render } from '@testing-library/preact';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options
  });

export * from '@testing-library/preact';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render, vi };

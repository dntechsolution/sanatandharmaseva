import { describe, expect, it } from 'vitest';
import config from '../astro.config.mjs';

describe('local development experience', () => {
  it('does not inject the Astro inspection toolbar into the website preview', () => {
    expect(config.devToolbar).toEqual({ enabled: false });
  });
});

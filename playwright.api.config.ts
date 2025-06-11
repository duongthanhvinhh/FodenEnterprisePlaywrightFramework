import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.ENV_NAME ? `./environments/.env.${process.env.ENV_NAME}` : `./environments/.env.dev`
})

export default defineConfig({
  testDir: './tests/api-tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html', { open: 'on-failure' }]],
  
  use: {
    baseURL: process.env.BOOKER_API_BASE_URL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'apiTests',
      testDir: './tests/api-tests',
    }
  ],
});
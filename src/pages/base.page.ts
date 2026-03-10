import { type Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import type { StepTracker } from '../utils/step-tracker';

export abstract class BasePage {
  private testName = 'unknown';
  private stepTracker?: StepTracker;

  constructor(protected readonly page: Page) {}

  setTestName(name: string): void {
    this.testName = name.replace(/[^a-zA-Z0-9_\- ]/g, '_');
  }

  setStepTracker(tracker: StepTracker): void {
    this.stepTracker = tracker;
  }

  async takeScreenshot(): Promise<void> {
    const dir = path.join('screenshots', this.testName);
    fs.mkdirSync(dir, { recursive: true });

    const fileName = this.stepTracker?.getNextScreenshotName() || 'screenshot';
    await this.page.screenshot({
      path: path.join(dir, `${fileName}.png`),
      fullPage: true,
    });
  }
}
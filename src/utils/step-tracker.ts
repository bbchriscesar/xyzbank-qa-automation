export class StepTracker {
  private counter = 0;

  getNextScreenshotName(): string {
    this.counter++;
    const paddedCounter = String(this.counter).padStart(2, '0');
    return `${paddedCounter}-auto-capture`;
  }

  reset(): void {
    this.counter = 0;
  }
}
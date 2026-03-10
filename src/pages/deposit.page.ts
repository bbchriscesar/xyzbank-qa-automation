import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DepositPage extends BasePage {
  private readonly amountInput: Locator;
  private readonly depositButton: Locator;

  constructor(page: Page) {
    super(page);
    this.amountInput = this.page.getByPlaceholder('amount');
    this.depositButton = this.page.getByRole('form').getByRole('button', { name: 'Deposit' });
  }

  async deposit(amount: string): Promise<void> {
    await this.amountInput.pressSequentially(amount);
    await this.depositButton.click();

    await this.takeScreenshot();
  }

  async getValidationMessage(): Promise<string> {
    return this.amountInput.evaluate((el) => (el as HTMLInputElement).validationMessage);
  }

  async expectValidationMessage(message: string): Promise<void> {
    const actualMessage = await this.getValidationMessage();

    await this.amountInput.evaluate((el) => (el as HTMLInputElement).reportValidity());
    await this.takeScreenshot();
    expect(actualMessage).toBe(message);
  }

  async expectDepositSuccess(): Promise<void> {
    await expect(this.page.locator('body')).toContainText('Deposit Successful');
  }
}
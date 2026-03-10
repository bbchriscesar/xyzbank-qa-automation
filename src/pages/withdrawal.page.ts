import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class WithdrawalPage extends BasePage {
  private readonly amountInput: Locator;
  private readonly withdrawButton: Locator;

  constructor(page: Page) {
    super(page);
    this.amountInput = this.page.getByPlaceholder('amount');
    this.withdrawButton = this.page.getByRole('form').getByRole('button', { name: 'Withdraw' });
  }

  async withdraw(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
    await this.withdrawButton.click();
    await this.takeScreenshot();
  }

  async expectWithdrawalSuccess(): Promise<void> {
    await expect(this.page.locator('body')).toContainText('Transaction successful');
  }
}
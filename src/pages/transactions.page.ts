import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { TransactionRow } from '../types';

export class TransactionsPage extends BasePage {
  private readonly transactionTable: Locator;
  private readonly tableRows: Locator;
  private readonly backButton: Locator;
  private readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.transactionTable = this.page.locator('table.table');
    this.tableRows = this.transactionTable.locator('tbody tr');
    this.backButton = this.page.getByRole('button', { name: 'Back' });
    this.resetButton = this.page.getByRole('button', { name: 'Reset' });
  }

  async waitForTransactionsToLoad(): Promise<void> {
    await this.transactionTable.waitFor({ state: 'visible' });
  }

  async expectTransactionExists(amount: string, type: TransactionRow['type']): Promise<void> {
    const row = this.tableRows.filter({
      has: this.page.locator('td', { hasText: amount }),
    }).filter({
      has: this.page.locator('td', { hasText: type }),
    });

    try {

      await expect(row.first()).toBeVisible({ timeout: 5000 });
    } catch (error) {

      await this.goBack();
      await this.page.getByRole('button', { name: 'Transactions' }).click();
      await this.waitForTransactionsToLoad();


      await expect(row.first()).toBeVisible();
    }

    await this.takeScreenshot();
  }

  async getTransactionCount(): Promise<number> {
    return this.tableRows.count();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async resetTransactions(): Promise<void> {
    await this.resetButton.click();
  }
}
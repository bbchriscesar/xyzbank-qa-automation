import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  readonly welcomeMessage: Locator;
  private readonly depositTab: Locator;
  private readonly withdrawlTab: Locator;
  private readonly transactionsTab: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = this.page.getByText(/Welcome .+ !!/);
    this.depositTab = this.page.getByRole('button', { name: 'Deposit' });
    this.withdrawlTab = this.page.getByRole('button', { name: 'Withdrawl' });
    this.transactionsTab = this.page.getByRole('button', { name: 'Transactions' });
    this.logoutButton = this.page.getByRole('button', { name: 'Logout' });
  }

  async expectLoggedInAs(customerName: string): Promise<void> {
    await expect(this.welcomeMessage).toContainText(customerName);
  }

  async goToDeposit(): Promise<void> {
    await this.depositTab.click();
  }

  async goToWithdrawl(): Promise<void> {
    await this.withdrawlTab.click();
  }

  async goToTransactions(): Promise<void> {
    await this.transactionsTab.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { CustomerName } from '../types';

export class LoginPage extends BasePage {
  private readonly customerLoginButton: Locator;
  private readonly customerDropdown: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.customerLoginButton = this.page.getByRole('button', { name: 'Customer Login' });
    this.customerDropdown = this.page.locator('#userSelect');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async navigate(): Promise<void> {
    await this.page.goto(process.env.BASE_URL!);
    await this.customerLoginButton.waitFor({ state: 'visible' });
  }

  async expectBankPageLoaded(): Promise<void> {
    await expect(this.page.getByRole('strong')).toContainText('XYZ Bank');
    await expect(this.page.getByRole('button', { name: 'Customer Login' })).toBeVisible();
  }

  async loginAsCustomer(customerName: CustomerName): Promise<void> {
    await this.customerLoginButton.click();
    await this.customerDropdown.selectOption({ label: customerName });
    await this.loginButton.click();
    await this.takeScreenshot();
  }
}
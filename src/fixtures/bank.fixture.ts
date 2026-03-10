import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { DepositPage } from '../pages/deposit.page';
import { WithdrawalPage } from '../pages/withdrawal.page';
import { TransactionsPage } from '../pages/transactions.page';
import { StepTracker } from '../utils/step-tracker';

type BankPages = {
  stepTracker: StepTracker;
  loginPage: LoginPage;
  accountPage: AccountPage;
  depositPage: DepositPage;
  withdrawalPage: WithdrawalPage;
  transactionsPage: TransactionsPage;
};

export const test = base.extend<BankPages>({
  stepTracker: async ({}, use, testInfo) => {
    const tracker = new StepTracker();
    await use(tracker);
  },

  loginPage: async ({ page, stepTracker }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    loginPage.setTestName(testInfo.title);
    loginPage.setStepTracker(stepTracker);
    await use(loginPage);
  },

  accountPage: async ({ page, stepTracker }, use, testInfo) => {
    const accountPage = new AccountPage(page);
    accountPage.setTestName(testInfo.title);
    accountPage.setStepTracker(stepTracker);
    await use(accountPage);
  },

  depositPage: async ({ page, stepTracker }, use, testInfo) => {
    const depositPage = new DepositPage(page);
    depositPage.setTestName(testInfo.title);
    depositPage.setStepTracker(stepTracker);
    await use(depositPage);
  },

  withdrawalPage: async ({ page, stepTracker }, use, testInfo) => {
    const withdrawalPage = new WithdrawalPage(page);
    withdrawalPage.setTestName(testInfo.title);
    withdrawalPage.setStepTracker(stepTracker);
    await use(withdrawalPage);
  },

  transactionsPage: async ({ page, stepTracker }, use, testInfo) => {
    const transactionsPage = new TransactionsPage(page);
    transactionsPage.setTestName(testInfo.title);
    transactionsPage.setStepTracker(stepTracker);
    await use(transactionsPage);
  },
});

export { expect } from '@playwright/test';
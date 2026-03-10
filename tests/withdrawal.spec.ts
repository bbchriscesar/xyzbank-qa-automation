import { test } from '../src/fixtures/bank.fixture';
import { CUSTOMERS, AMOUNTS, ACCOUNTS } from '../src/constants';
import { seedBankStorage } from '../src/utils/local-storage-seeder';

test.describe('Withdrawal Flow', () => {
  test.beforeEach(async ({ page, loginPage, accountPage }) => {
    await test.step('Seed account via localStorage and login', async () => {
      await seedBankStorage(page, [
        { accountNo: ACCOUNTS.HARRY_POTTER.DOLLAR, balance: AMOUNTS.SEED_DEPOSIT_NUM },
      ]);
      await loginPage.navigate();
      await loginPage.expectBankPageLoaded();
      await loginPage.loginAsCustomer(CUSTOMERS.HARRY_POTTER);
      await accountPage.expectLoggedInAs(CUSTOMERS.HARRY_POTTER);
    });
  });

  test('should withdraw money and verify transaction', async ({
    accountPage,
    withdrawalPage,
    transactionsPage,
  }) => {
    await test.step('Navigate to Withdrawl tab and withdraw funds', async () => {
      await accountPage.goToWithdrawl();
      await withdrawalPage.withdraw(AMOUNTS.WITHDRAWAL);
      await withdrawalPage.expectWithdrawalSuccess();
    });

    await test.step('Navigate to Transactions and verify withdrawal', async () => {
      await accountPage.goToTransactions();
      await transactionsPage.waitForTransactionsToLoad();
      await transactionsPage.expectTransactionExists(AMOUNTS.WITHDRAWAL, 'Debit');
    });
  });
});
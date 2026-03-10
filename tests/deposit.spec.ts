import { test } from '../src/fixtures/bank.fixture';
import { CUSTOMERS, AMOUNTS } from '../src/constants';

test.describe('Deposit Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.expectBankPageLoaded();
  });

  test('should deposit money and verify transaction', async ({
    loginPage,
    accountPage,
    depositPage,
    transactionsPage,
  }) => {
    await test.step('Login as customer', async () => {
      await loginPage.loginAsCustomer(CUSTOMERS.HARRY_POTTER);
      await accountPage.expectLoggedInAs(CUSTOMERS.HARRY_POTTER);
    });

    await test.step('Navigate to Deposit tab and deposit funds', async () => {
      await accountPage.goToDeposit();
      await depositPage.deposit(AMOUNTS.DEPOSIT);
      await depositPage.expectDepositSuccess();
    });

    await test.step('Navigate to Transactions and verify deposit', async () => {
      await accountPage.goToTransactions();
      await transactionsPage.waitForTransactionsToLoad();
      await transactionsPage.expectTransactionExists(AMOUNTS.DEPOSIT, 'Credit');
    });
  });
});
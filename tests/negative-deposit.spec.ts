import { test, expect } from '../src/fixtures/bank.fixture';
import { CUSTOMERS } from '../src/constants';

test.describe('Negative Deposit Tests', () => {
  test.beforeEach(async ({ loginPage, accountPage }) => {
    await loginPage.navigate();
    await loginPage.expectBankPageLoaded();
    await loginPage.loginAsCustomer(CUSTOMERS.HARRY_POTTER);
    await accountPage.expectLoggedInAs(CUSTOMERS.HARRY_POTTER);
    await accountPage.goToDeposit();
  });

  test('should not accept empty deposit', async ({ depositPage }) => {
    await test.step('Submit deposit with empty amount', async () => {
      await depositPage.deposit('');
    });

    await test.step('Verify validation message "Please fill out this field."', async () => {
      await depositPage.expectValidationMessage('Please fill out this field.');
    });
  });

  test('should not accept non-numeric deposit', async ({ depositPage }) => {
    await test.step('Submit deposit with non-numeric value', async () => {

      await depositPage.deposit('abc');
    });

    await test.step('Verify validation message "Please fill out this field."', async () => {
      await depositPage.expectValidationMessage('Please fill out this field.');
    });
  });
});
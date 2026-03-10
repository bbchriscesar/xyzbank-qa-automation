import type { Page } from '@playwright/test';

interface AccountSeed {
  accountNo: number;
  balance: number;
}


const BANK_USERS = {
  '1': { fName: 'Hermoine', lName: 'Granger', postCd: 'E859AB', id: 1, accountNo: [1001, 1002, 1003] },
  '2': { fName: 'Harry', lName: 'Potter', postCd: 'E725JB', id: 2, accountNo: [1004, 1005, 1006] },
  '3': { fName: 'Ron', lName: 'Weasly', postCd: 'E55555', id: 3, accountNo: [1007, 1008, 1009] },
  '4': { fName: 'Albus', lName: 'Dumbledore', postCd: 'E55656', id: 4, accountNo: [1010, 1011, 1012] },
  '5': { fName: 'Neville', lName: 'Longbottom', postCd: 'E89898', id: 5, accountNo: [1013, 1014, 1015] },
};

const CURRENCIES = ['Dollar', 'Pound', 'Rupee'];

function buildAccountData(seeds: AccountSeed[], date: string): Record<string, object> {
  const accounts: Record<string, object> = {};
  const balanceMap = new Map(seeds.map((s) => [s.accountNo, s.balance]));

  for (const user of Object.values(BANK_USERS)) {
    for (let i = 0; i < user.accountNo.length; i++) {
      const accNo = user.accountNo[i];
      accounts[String(accNo)] = {
        accountNo: accNo,
        userId: user.id,
        currency: CURRENCIES[i],
        amount: balanceMap.get(accNo) ?? 0,
        date: date,
      };
    }
  }

  return accounts;
}


export async function seedBankStorage(page: Page, seeds: AccountSeed[] = []): Promise<void> {
  const now = new Date().toISOString();
  const users = Object.fromEntries(
    Object.entries(BANK_USERS).map(([key, user]) => [key, { ...user, date: now }]),
  );
  const accounts = buildAccountData(seeds, now);

  await page.addInitScript(
    ({ usersJson, accountsJson }) => {
      localStorage.setItem('User', usersJson);
      localStorage.setItem('Account', accountsJson);
      localStorage.setItem('maxAccountNo', '1015');
      localStorage.setItem('maxUserId', '5');
    },
    {
      usersJson: JSON.stringify(users),
      accountsJson: JSON.stringify(accounts),
    },
  );
}
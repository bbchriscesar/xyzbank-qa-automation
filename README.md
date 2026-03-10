# XYZ Bank QA Automation

Playwright + TypeScript test automation for the [XYZ Bank demo application](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login).

## Architecture

```
xyzbank-qa-automation/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Template for env vars
├── playwright.config.ts          # Playwright configuration with dotenv
├── src/
│   ├── pages/                    # Page Object Model classes
│   │   ├── base.page.ts          # Abstract base with shared utilities
│   │   ├── login.page.ts         # Customer login flow
│   │   ├── account.page.ts       # Account dashboard & tab navigation
│   │   ├── deposit.page.ts       # Deposit form interactions
│   │   ├── withdrawal.page.ts    # Withdrawal form interactions
│   │   └── transactions.page.ts  # Transaction table assertions
│   ├── fixtures/
│   │   └── bank.fixture.ts       # Custom Playwright fixtures (DI for pages)
│   └── types/
│       └── index.ts              # Shared TypeScript interfaces/types
├── tests/
│   ├── deposit.spec.ts           # Core deposit + transaction verification
│   ├── withdrawal.spec.ts        # Withdrawal + transaction verification
│   └── negative-deposit.spec.ts  # Negative tests (empty, non-numeric)
└── screenshots/                  # Auto-generated at key steps
```

## Design Decisions

- **Page Object Model**: Each page/tab is its own class. Locators are `private readonly` — tests interact only through semantic methods.
- **Fixtures**: Custom `test.extend` injects page objects — tests declare what they need via destructuring.
- **Separation of Concerns**: Pages own locators + actions. Tests own flow orchestration + assertions (via `test.step` blocks).
- **Environment**: `dotenv` loads `.env` at config level. `BASE_URL` and `DEFAULT_CUSTOMER` are configurable without code changes.
- **Screenshots**: Captured at key steps (post-login, post-deposit, transactions view) and saved to `screenshots/`.

## Setup

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env   # already present, edit if needed
```

## Run Tests

```bash
# All tests
npm test

# Specific suites
npm run test:deposit
npm run test:withdrawal
npm run test:negative

# Headed mode (see browser)
npm run test:headed

# View HTML report
npm run report
```

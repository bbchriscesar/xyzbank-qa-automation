# XYZ Bank QA Automation

Playwright + TypeScript test automation for the [XYZ Bank demo application](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login).

## Architecture

```
xyzbank-qa-automation/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Template for env vars
├── .github/workflows/            # CI/CD (GitHub Actions)
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
- **Fixtures**: Custom `test.extend` is used to inject page objects. This approach ensures **Lazy Initialization** — only the pages declared in a test's parameters are instantiated. This saves hardware resources (CPU/Memory) as the test suite grows, while also removing boilerplate code from `beforeEach` hooks.
- **Separation of Concerns**: Pages own locators + actions. Tests own flow orchestration + assertions (via `test.step` blocks).
- **Environment**: `dotenv` loads `.env` at config level. `BASE_URL` is configurable without code changes.
- **Screenshots**: Captured at key steps (post-login, post-deposit, transactions view) and saved to `screenshots/`.
- **Comment-Free Codebase**: All source code is kept clean of comments for better readability and maintainability.

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (chromium)
npx playwright install --with-deps chromium

# Create environment file from template
cp .env.example .env
```

## Run Tests

```bash
# All tests (headless)
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

## CI/CD (GitHub Actions)

This project includes a `.github/workflows/playwright.yml` file that:
- Executes automatically on every **push** or **pull request** to the `main` branch.
- Can be triggered manually via **workflow_dispatch**.
- Configures `BASE_URL` directly in the cloud environment.
- Uploads the **Playwright Report** (30-day retention).
- Uploads **Screenshots** as artifacts specifically on failure for easier debugging.

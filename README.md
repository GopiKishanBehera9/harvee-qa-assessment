# Harvee Technologies QA Automation Assessment

## Overview
This repository contains the test suite and automation framework for the QA Automation Engineer assessment at Harvee Technologies[cite: 2]. It includes manual test coverage strategy, Page Object Model (POM) automation scripts using Playwright and JavaScript, and technical problem-solving documentation.

## Project Structure
```text
harvee-qa-assessment/
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   └── checkout.spec.js
├── README.md
├── ANSWERS.md
└── AI_USAGE.md

## Setup & Execution Instructions
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
    npm install
3. Run tests in headless mode across all browsers (Chromium, Firefox, WebKit):
    npx playwright test

4. Run tests with Playwright UI mode:
    npx playwright test --ui   

## Test Mapping Table (Manual vs Automated)

| Automated Test Name                  |                  Description / Verification                  |
|                                      |                                                              |
|TC01_Login_Validation`                |                   Validates locked out user error handling   |
|TC02_Sort_Products_Price_Low_High`    |      Validates ascending price sorting across product list   |
|TC03_Cart_Badge_And_Item_Removal`     |        Checks cart badge counter updates and item removals   |
|TC04_Full_Checkout_Flow_Calculations` |      End-to-end checkout flow and order completion message   |
|TC05_Missing_Field_Validation`        | Parameterized checks for missing mandatory checkout fields   |
|TC06_Direct_URL_Access_After_Logout`  | Security validation preventing unauthorized inner URL access |


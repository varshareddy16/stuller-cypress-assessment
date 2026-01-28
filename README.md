## Cypress Automation Assessment 

This project contains three tasks completed using Cypress.
The goal was to demonstrate UI automation, API + UI validation, and debugging/refactoring skills.

## Task 1 – UI Automation (End-to-End Workflow)
Purpose

Task 1 was to automate a realistic user flow on the Stuller website using Cypress.

What I automated

Cypress QA Automation Assessment

This project demonstrates my approach to UI automation, API testing, and debugging flaky tests using Cypress.
It includes three tasks as part of the assessment.

Project Structure
cypress/
  e2e/
    workflow.cy.js     → Task 1 (UI End-to-End flow)
    api-ui.cy.js       → Task 2 (API + UI validation)
    debug.cy.js        → Task 3 (Refactoring flaky test)
  fixtures/
    user.json          → Login data
    testData.json      → SKU and special instructions
  support/
    commands.js       → Reusable commands (login, search, cart actions)

cypress.config.js
package.json
README.md

Setup Instructions
Prerequisites

Node.js installed (LTS version recommended)

npm

Steps

Download and unzip the project

Open terminal inside project folder

Install dependencies:

npm install

How to Run Tests
Run with Cypress UI (best for demo)
npx cypress open


Then select and run:

workflow.cy.js → Task 1

api-ui.cy.js → Task 2

debug.cy.js → Task 3

Run all tests headless
npx cypress run

# Task 1 – UI End-to-End Workflow

File: cypress/e2e/workflow.cy.js

This test automates a real user flow:

Login using credentials from fixture

Search SKU from homepage

Open product

Add product to cart

Verify SKU exists in cart

Add special instructions

Verify instructions appear

Why I designed it this way

Used fixtures (user.json, testData.json) → keeps data separate from code

Used custom commands → reusable login/search logic

Used cy.contains() and visible selectors → more stable than brittle CSS classes

Avoided hard waits (cy.wait) → used Cypress retry with should() instead

This reflects real-world E2E automation design.

# Task 2 – API + UI Hybrid Validation

File: cypress/e2e/api-ui.cy.js

This test validates consistency between backend and frontend.

Flow:

Login (price visible only after login)

Read SKU from fixture

Call API using cy.request()

Validate:

Status code = 200

SKU

Price.Value

Description

Status

Search same SKU in UI using cy.searchFromHome() command

Compare API values with UI values

# Why this is important

This ensures the data shown to users in UI is coming correctly from backend.
This type of hybrid validation is commonly used in real projects to catch integration issues.

Task 3 – Debugging & Reliability Improvements

File: cypress/e2e/debug.cy.js

This task focuses on improving an intentionally flaky test.

What was wrong in the original test

Used many cy.wait() hard waits

Used brittle selectors like eq(8)

Assumed fixed load time

Failed randomly depending on timing

What I changed

Removed hard waits and used conditional waits (should, contains)

Replaced index-based selectors with visible element selectors

Added validation before actions (element visible/enabled)

Added 2 additional test cases

Improved structure for readability

Result

Tests are now:

More stable

Easier to understand

Easier to maintain

Less dependent on timing

Framework Design Decisions

Why I used commands.js
Login, search, and cart actions are reused across tests.
Creating custom commands:

Avoids code duplication

Makes tests cleaner

Improves maintainability

Example:

cy.loginStuller(username, password)
cy.searchFromHome(sku)

This is a standard practice.

# Assumptions

Some UI/API data may not perfectly match (as mentioned in assessment note).

Login is required to view pricing.

Selectors may need adjustment if UI changes significantly, but current approach is designed to be flexible.

# Future Improvements

If this was a long-term project, I would add:

Page Object Model for larger scale

CI integration (GitHub Actions / Jenkins)

Reporting (screenshots, videos, HTML reports)

Environment handling using env variables

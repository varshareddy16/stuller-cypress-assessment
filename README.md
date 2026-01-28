# Cypress Automation Assessment

This project contains three tasks completed using Cypress.  
The goal is to demonstrate UI automation, API + UI validation, and debugging/refactoring flaky tests.

---

## Tech Stack
- Cypress (E2E testing)
- JavaScript
- Node.js
- Fixtures for test data
- Custom Cypress commands

---

## Project Structure

cypress/e2e/
- workflow.cy.js → Task 1 (UI End-to-End flow)  
- api-ui.cy.js → Task 2 (API + UI validation)  
- debug.cy.js → Task 3 (Refactor flaky test)

cypress/fixtures/
- user.json → login credentials  
- testData.json → SKU and special instructions  

cypress/support/
- commands.js → reusable commands (login, search, cart actions)

---

## Setup Instructions

1. Install Node.js  
2. Open project folder in VS Code  
3. Run this in terminal:
   ```bash
   npm install
4. Open Cypress:
 npx cypress open
 
 ---
 How to Run Tests
- Open Cypress Test Runner
- Select E2E Testing
- Choose Chrome
- Click any test file:
 - workflow.cy.js
- api-ui.cy.js
- debug.cy.js
Or run all tests headless:
 npx cypress run
 
 ---
 
# Task 1 – UI Automation (End-to-End Workflow)

## What I automated

A real user flow on the Stuller website:
- Login to application
- Search product using SKU
- Open product page
- Add product to cart
- Verify SKU is present in cart
- Add special instructions
- Verify instructions appear

## Why I used commands.js

 - To avoid duplicate code
 - To keep login, search, cart logic reusable
 - Makes code cleaner and easier to maintain

Example:
- cy.loginStuller()
- cy.searchFromHome()
- cy.setCartSpecialInstructions()

- This shows real-world framework approach.

---
# Task 2 – API + UI Hybrid Validation

In this task I validated data between backend (API) and frontend (UI).

## What I validated

Using cy.request():
- HTTP status code = 200
- SKU from API matches UI
- Price from API matches UI (after login)
- Description matches product title
- Status matches availability text

# Why this is important

Sometimes UI can show wrong data even if backend is correct.
This test ensures data consistency between layers, which is common in real projects.

---

# Task 3 – Debugging & Refactoring Flaky Tests

This task was about improving an existing unstable test.

## What was wrong originally

- Used hard waits like cy.wait(3000)
- Used brittle selectors like eq(8)
- Tests were failing randomly
- Long chained commands caused re-render issues
## What I changed
- Removed hard waits and used:
 - cy.contains()
 - should('be.visible')
- Replaced index-based selectors with meaningful selectors
- Broke long chains into smaller stable steps
- Used .filter(':visible') to avoid hidden elements

## Why this improves stability

- Tests now wait for real UI behavior
- Less dependency on DOM order
- Less flaky failures
- More maintainable test

---

# Framework Design Decisions

- Used fixtures for test data → easier to change data
- Used custom commands → reusable functions
- Avoided hard waits → improved stability
- Used flexible selectors → tests survive UI changes
- Added defensive checks → tests don’t break when optional fields are missing

# Assumptions

- Some UI elements (like price or ship date) may require login
- API may return different structure depending on auth
- Cart UI structure can change, so selectors are flexible

---

# Future Improvements

If I get more time, I would:

- Add more test cases for different scenarios
- Make selectors more stable if developers add test IDs
- Improve reuse of commands to reduce duplicate code
- Add basic test reports
- Run tests in CI pipeline like GitHub Actions

 ---

# Summary

This project shows:
- Realistic UI automation
- API + UI validation
- Debugging flaky tests
- Clean Cypress structure
- Practical test design approach



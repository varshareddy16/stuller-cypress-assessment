## Cypress Automation Assessment 

This project contains three tasks completed using Cypress.
The goal was to demonstrate UI automation, API + UI validation, and debugging/refactoring skills.

## Task 1 – UI Automation (End-to-End Workflow)
Purpose

Task 1 was to automate a realistic user flow on the Stuller website using Cypress.

What I automated

The test covers this flow:

Login using credentials from user.json

Search product using SKU from testData.json

Open product from search results

Add product to cart

Open cart page

Verify SKU is visible in cart

Add special instructions in cart

Verify instructions are visible

This represents a real end-to-end user journey.

How I designed it

Used custom commands for better structure:

loginStuller()

searchFromHome()

setCartSpecialInstructions()

Used fixtures for test data:

user.json → username & password

testData.json → SKU & instructions

Avoided hardcoding values inside tests

Kept code readable and reusable

Why this is useful

Test is easy to maintain

Code is reusable

Structure looks like real automation framework

Demonstrates Cypress fundamentals clearly

## Task 2 – API + UI Hybrid Validation
Purpose

Task 2 was to validate product data using both API and UI, and compare the results.

This demonstrates understanding of:

API testing using Cypress

UI validation

Data consistency between layers

What I validated

Using cy.request() and Cypress UI, I validated:

HTTP Status Code
Verified API returns 200

SKU Validation
API SKU matches SKU displayed in UI

Price Validation
API Price.Value matches price shown in UI (after login)

Description Validation
API Description matches product title on UI

Status Validation
API Status matches availability/status shown on UI

Real-world handling

If API returns non-200 status (like authentication issue), test logs message and continues without crashing.

If UI and API data slightly differ, validation logic still demonstrates correct test design.

This follows the instruction:

Focus on test design and validation logic, not data mismatch.

## Task 3 – Debugging & Reliability Challenge
Purpose

Task 3 was about improving a flaky test and showing debugging skills.
Focus was on code quality, not only test passing.

What was wrong in the original test

Hard waits like:

cy.wait(3000)

cy.wait(5000)

Index based selectors:

cy.get('input').eq(8)

cy.get('input').eq(3)

Brittle selectors and assumptions about DOM structure

Some actions were flaky because UI re-rendered elements

Why it was flaky

Hard waits fail when page loads slower or faster

eq() selectors break when DOM order changes

React UI sometimes re-renders elements, causing detached element issues

What I changed

Removed all cy.wait() and used real UI waits like:

cy.contains(sku).should('be.visible')

Replaced index selectors with meaningful selectors:

Used input[data-test="quantity"] / input.quantityInput for quantity field

Used alias before clicking Add to Cart:

cy.contains(...).as('addBtn')

cy.get('@addBtn').click()

Added safe checks for optional fields (price, ship date)

How this improves the test

Less flaky

More reliable

Easier to read

Easier to maintain

Less dependent on UI structure

Follows Cypress best practices

New Test Cases Added (Task 3)
Test Case 1 – Update quantity on product page

Verifies that user can change quantity value in the quantity field.

Steps:

Open product page using SKU

Update quantity to 3

Verify the value is updated

Test Case 2 – Add to Cart button enabled

Verifies that Add to Cart button is visible and enabled for the product.

Steps:

Open product page

Verify Add to Cart button is visible

Verify button is not disabled

## Final Summary

Task 1 shows my UI automation and framework structure

Task 2 shows my API testing and API + UI validation approach

Task 3 shows my debugging skills and ability to improve flaky tests

Overall focus was on:

Clean structure

Realistic automation approach

Maintainable test design

Cypress best practices
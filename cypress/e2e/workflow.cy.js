describe('Task 1 - E2E Workflow', () => {
  it('logs in, searches SKU, adds to cart, verifies cart has item, verifies SKU + instructions', () => {

    // Load login details from fixture
    cy.fixture('user').then(({ username, password }) => {
      cy.loginStuller(username, password); // login first
    });

    cy.fixture('testData').then(({ sku, specialInstructions }) => {

      // Search for product after login
      cy.searchFromHome(sku);

      // Click the product using SKU
      cy.contains(sku, { timeout: 30000 })
        .filter(':visible')
        .first()
        .click();

      // Make sure product page is opened
      cy.contains(sku, { timeout: 30000 }).should('be.visible');

      // Just logging URL to confirm we are on product page
      cy.url().then((url) => cy.log('URL BEFORE ADD TO CART: ' + url));

      // Click Add to Cart button
      cy.contains('button, a, [role="button"]', /add\s*to\s*cart/i, { timeout: 30000 })
        .filter(':visible')
        .first()
        .scrollIntoView()
        .should('be.enabled')
        .click({ force: true });


      // Open cart page
      cy.visit('https://www.stuller.com/cart');

      // Check that same SKU is showing in cart
      cy.contains(sku, { timeout: 30000 }).should('be.visible');

      // Just confirming that cart page has some cart related text
      cy.get('body', { timeout: 30000 })
        .invoke('text')
        .then((t) => {
          const text = (t || '').toLowerCase();
          expect(text).to.match(/cart|item|shopping/i);
        });

      // Enter special instructions in the field
      cy.contains(/special instructions/i, { timeout: 30000 })
        .scrollIntoView()
        .should('be.visible')
        .parent()
        .find('textarea, input')
        .filter(':visible')
        .first()
        .clear({ force: true })
        .type(specialInstructions, { force: true });
        
      // Confirm instructions text is visible on page
      cy.contains(specialInstructions, { timeout: 30000 }).should('exist');
    });
  });
});

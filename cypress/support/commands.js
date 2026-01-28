Cypress.Commands.add('loginStuller', (username, password) => {
  cy.visit('https://www.stuller.com/');

  // Open login popup
  cy.contains(/log in|sign in/i, { timeout: 20000 })
    .filter(':visible')
    .first()
    .click({ force: true });

  // Wait until something from account area is visible
  cy.get('.menu-item-badge, a[href*="account"], a[href*="logout"]', { timeout: 30000 })
    .should('exist');

  // Enter username
  cy.get('input[placeholder*="User"], input[placeholder*="user"]', { timeout: 20000 })
    .filter(':visible')
    .first()
    .should('be.visible')
    .clear({ force: true })
    .type(username, { log: false });

  // Enter password
  cy.get('input[placeholder*="Pass"], input[placeholder*="pass"], input[type="password"]', { timeout: 20000 })
    .filter(':visible')
    .first()
    .should('be.visible')
    .clear({ force: true })
    .type(password, { log: false });

  // Click login button
  cy.get('button.sbtn.sbtn-primary.u-border-radius-xlarge.w-100.mb-4', { timeout: 20000 })
    .filter(':visible')
    .first()
    .should('be.visible')
    .and('not.be.disabled')
    .scrollIntoView()
    .click('center', { force: true });

  // Make sure login popup is closed
  cy.get('input[placeholder="Username..."]', { timeout: 20000 })
    .should('not.exist');

  // Confirm user is logged in by checking account/logout links
  cy.get('.menu-item-badge, a[href*="account"], a[href*="logout"]', { timeout: 30000 })
    .should('exist');

  // Final check that login really worked
  cy.get('body', { timeout: 30000 }).should(($b) => {
    const t = $b.text().toLowerCase();
    expect(
      t.includes('account') || t.includes('sign out') || t.includes('logout'),
      'Expected account/logout indicator after login'
    ).to.eq(true);
  });
});


Cypress.Commands.add('searchFromHome', (sku) => {
  // Go to home page before searching
  cy.visit('https://www.stuller.com/');

  // Find search box and enter SKU
  cy.get('input', { timeout: 20000 })
    .filter('[type="search"], [placeholder*="Search"], [aria-label*="Search"], .autocomplete-input')
    .filter(':visible')
    .first()
    .should('be.visible')
    .click({ force: true })
    .type('{selectall}{backspace}', { force: true })
    .type(`${sku}{enter}`, { delay: 10 });

  // Make sure we moved to search results page
  cy.url({ timeout: 20000 }).should('include', 'search');
});


// Used for entering special instructions in cart
Cypress.Commands.add('setCartSpecialInstructions', (sku, specialInstructions) => {
  const escaped = escapeRegExp(sku);

  // Try to find cart section where this SKU exists
  const cartItemSel =
    '[data-testid*="cart"], [data-test*="cart"], [class*="cart"], li, tr';

  cy.get(cartItemSel, { timeout: 20000 })
    .filter(`:contains("${sku}")`)
    .first()
    .as('skuCartItem');

  // First try to find instruction field inside that item
  cy.get('@skuCartItem').then(($item) => {
    const $field = $item.find(
      'textarea[name*="instruction"], textarea[id*="instruction"], textarea[placeholder*="instruction"],' +
        'input[name*="instruction"], input[id*="instruction"], input[placeholder*="instruction"],' +
        'textarea, input'
    );

    if ($field.length) {
      cy.wrap($field.first())
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true })
        .type('{selectall}{backspace}', { force: true })
        .type(specialInstructions, { delay: 10, force: true });

      return;
    }

    // If not found, try using label text like "Special Instructions"
    cy.contains(/special instructions|instructions/i, { timeout: 10000 })
      .scrollIntoView()
      .then(($label) => {
        const $container = $label.closest('div, section, form');
        const $alt = $container.find('textarea, input');
        if ($alt.length) {
          cy.wrap($alt.first())
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(specialInstructions, { delay: 10, force: true });
        }
      });
  });

  // Just confirming that instructions text appears somewhere on page
  cy.contains(new RegExp(escapeRegExp(specialInstructions), 'i'), { timeout: 20000 }).should('exist');
});



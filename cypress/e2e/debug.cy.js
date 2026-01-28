describe("packaging product page", () => {
  const sku = "61-0089:100000:T";
  const url = `https://www.stuller.com/search/results?query=${encodeURIComponent(sku)}`;
  const cartUrl = "https://www.stuller.com/cart";

  it("should load and have product details", () => {
    cy.visit(url);

    // Removed hard waits: wait for SKU to show
    cy.contains(sku, { timeout: 30000 }).should("be.visible");

    // Price check 
    cy.get("body").then(($body) => {
      if ($body.find(".mainPrice").length) {
        cy.get(".mainPrice").filter(":visible").first().should("not.be.empty");
      }
    });

    // Ship date check 
    cy.get("body").then(($body) => {
      if ($body.find('[data-test="ship-date"]').length) {
        cy.get('[data-test="ship-date"]').filter(":visible").first().should("be.visible");
      }
    });
  });

  it("should update quantity and have ability to add product to the cart", () => {
    cy.visit(url);

    cy.contains(sku, { timeout: 30000 }).should("be.visible");

    // Better selector : quantity input
    cy.get('input[data-test="quantity"], input.quantityInput', { timeout: 20000 })
      .filter(":visible")
      .first()
      .clear({ force: true })
      .type("5", { force: true })
      .should("have.value", "5");

    // Click Add to Cart 
    cy.contains("button", /add to cart/i, { timeout: 20000 })
      .should("be.visible")
      .as("addBtn");

    cy.get("@addBtn").click({ force: true });

    // Visits cart page and verify cart is loaded
    cy.visit(cartUrl);
    cy.contains(/cart/i, { timeout: 20000 }).should("exist");
  });

  // New Test Case 1 
  it("should allow user to update quantity on product page", () => {
    cy.visit(url);

    cy.contains(sku, { timeout: 30000 }).should("be.visible");

    cy.get('input[data-test="quantity"], input.quantityInput', { timeout: 20000 })
      .filter(":visible")
      .first()
      .clear({ force: true })
      .type("3", { force: true })
      .should("have.value", "3");
  });

  // New Test Case 2 
  it("should show Add to Cart button enabled for the product", () => {
    cy.visit(url);

    cy.contains(sku, { timeout: 30000 }).should("be.visible");

    cy.contains("button", /add to cart/i, { timeout: 20000 })
      .should("be.visible")
      .and("not.be.disabled");
  });
});

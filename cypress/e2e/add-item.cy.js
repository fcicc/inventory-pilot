describe("Add Inventory Item", () => {
  it("should allow a user to add a new item", () => {
    // Click on the "Add New Item" link
    cy.get('a[href="/items/add"]').click();

    // Enter the item details
    cy.get("#name").type("Test Item");
    cy.get("#description").type("This is a test item.");
    cy.get("#quantity").type("10");
    cy.get("#price").type("10.00");

    // Click on the "Add Item" button
    cy.get('button[type="submit"]').click();

    // Verify that the new item is displayed in the inventory list
    cy.get("table tbody tr:last-child")
      .should("contain", "Test Item")
      .and("contain", "This is a test item.")
      .and("contain", "10")
      .and("contain", "$10.00");
  });
});

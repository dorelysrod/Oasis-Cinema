/// <reference types="cypress" />
describe("Quick Booking Page", () => {
    beforeEach(() => {
      cy.visit("/quick-booking"); 
    });
  
    it("should display the navbar", () => {
      cy.get("nav").should("be.visible");
    });
  
    it("should show movie selection dropdown", () => {
      cy.get(".movie-select").should("exist").and("be.visible");
    });
  
    it("should ensure footer is correctly positioned", () => {
      cy.scrollTo("bottom");
      cy.get(".footer").should("be.visible");
    });
  });
  
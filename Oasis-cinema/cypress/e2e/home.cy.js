/// <reference types="cypress" />
it("should display the movies in a carousel", () => {
    cy.visit("/"); 

    cy.get(".carousel-container").should("be.visible");
  
    cy.get(".movie-image").should("have.length.greaterThan", 0);
  });
  
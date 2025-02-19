/// <reference types="cypress" />
describe("Movies Page", () => {
    beforeEach(() => {
      cy.visit("/movies"); 
    });
  
    it("should display the movies page correctly", () => {
      cy.get(".movie-title").should("contain.text", "Movies");
    });
  
    it("should display a list of movies", () => {
      cy.get(".movie-card").should("have.length.greaterThan", 0); 
    });
  
    it("should show footer when scrolled to bottom", () => {
      cy.scrollTo("bottom"); 
      cy.get(".footer-container").should("have.class", "visible"); 
    });
  });
  
beforeEach(() => {
  cy.visit("/");
});

describe("testing movieApp", () => {
  it("should find input and type", () => {
    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
  });

  it("should find form", () => {
    cy.get("form").should("have.id", "searchForm");
  });

  it("should be able to click", () => {
    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
    cy.get("button").click();
    cy.get("div").contains("Interstellar");
  });

  it("should be able to show errormessage", () => {
    cy.get("input").type(" ").should("have.value", " ");
    cy.get("button").click();
    cy.get("div").contains("Inga sökresultat att visa");
    cy.get("p");
  });
});

describe("mock api-call", () => {
  it("should call mocked api", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "movies",
    }).as("moviecall");

    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
    cy.get("button").click();
    cy.wait("@moviecall").its("request.url").should("contain", "Interstellar");

    cy.get("h3").contains("Interstellar");
  });

  it("should call mocked api with empty list", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "emptyMoviesList",
    }).as("moviecall");

    cy.get("input").type("In").should("have.value", "In");
    cy.get("button").click();
    cy.wait("@moviecall").its("request.url").should("contain", "In");

    cy.get("div").contains("Inga sökresultat att visa");
  });
});

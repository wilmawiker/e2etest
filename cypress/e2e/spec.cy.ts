describe("testing movieApp", () => {
  it("should visit", () => {
    cy.visit("http://localhost:1234/");
  });

  it("should find input and type", () => {
    cy.visit("http://localhost:1234/");

    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
  });

  it("should find form", () => {
    cy.visit("http://localhost:1234/");
    cy.get("form").should("have.id", "searchForm");
  });

  it("should be able to click", () => {
    cy.visit("http://localhost:1234/");

    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
    cy.get("button").click();
    cy.get("div").should("contain", "Interstellar");
  });

  it("should be able to show errormessage", () => {
    cy.visit("http://localhost:1234/");

    cy.get("input").type(" ").should("have.value", " ");
    cy.get("button").click();
    cy.get("div").should("contain", "Inga sökresultat att visa");
    cy.get("p");
  });
});

describe("mock api-call", () => {
  it("should call mocked api", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "movies",
    }).as("moviecall");

    cy.visit("http://localhost:1234/");

    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
    cy.get("button").click();
    cy.wait("@moviecall").its("request.url").should("contain", "Interstellar");

    cy.get("h3").should("contain", "Interstellar");
  });

  it("should call mocked api", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "emptyMoviesList",
    }).as("moviecall");

    cy.visit("http://localhost:1234/");

    cy.get("input").type("In").should("have.value", "In");
    cy.get("button").click();
    cy.wait("@moviecall").its("request.url").should("contain", "In");

    cy.get("div").should("contain", "Inga sökresultat att visa");
  });
});

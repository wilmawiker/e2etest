import { IMovie } from "../../src/ts/models/Movie";

let testData: IMovie[] = [
  { Title: "Interstellar", imdbID: "1", Type: "", Poster: "", Year: "" },
];

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
    /* cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", testData).as(
      "moviecall"
    ); */

    cy.visit("http://localhost:1234/");

    cy.get("input").type("Interstellar").should("have.value", "Interstellar");
    cy.get("button").click();
    //cy.wait("@moviecall").its("request.url").should("contain", "");
    cy.get("div").should("contain", "Interstellar");
  });
  it("should be able to show errormessage", () => {
    cy.visit("http://localhost:1234/");

    cy.get("input").type(" ").should("have.value", " ");
    cy.get("button").click();
    //cy.wait("@moviecall").its("request.url").should("contain", "");
    cy.get("div").should("contain", "Inga sökresultat att visa");
    cy.get("p");
  });
});

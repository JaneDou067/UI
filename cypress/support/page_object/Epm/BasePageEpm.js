export class BasePage {


    //#region Selectors


    //#endregion






    openSite(url) {
        cy.visit(url);
        return this;
    }

    checkPageUrl(includesText) {
        cy.url().should('include', includesText);
        return this;
    }
}
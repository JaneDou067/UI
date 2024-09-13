export class BasePageEpm {


    //#region Selectors

    get headerLogo() {
        return cy.get('.header__logo-container')
    }

    //#endregion


    openSiteEpm() {
        cy.visit('https://www.epam.com/');
        this.headerLogo.should('be.visible')

        return this;
    }

}
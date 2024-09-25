export class BasePageEpm {


    //#region Selectors //todo: probably it is typo?

    get headerLogo() {
        return cy.get('.header__logo-container')
    }

    //#endregion //todo: probably it is typo?


    openSiteEpm() { //todo: you can rename it just - visit(), so when you are using it - would be not homePageEpm.openSiteEpm(), but homePageEpm.visit()
        cy.visit('https://www.epam.com/');
        this.headerLogo.should('be.visible')

        return this;
    }

}

export class BasePageEpm {


    get headerLogo() {
        return cy.get('.header__logo-container')
    }



    visit() {
        cy.visit('https://www.epam.com/');
        this.headerLogo.should('be.visible')

        return this;
    }

}
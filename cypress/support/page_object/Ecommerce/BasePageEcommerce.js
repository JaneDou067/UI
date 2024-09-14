export class BasePageEcommerce {


    //#region Selectors

    get headerLogo() {
        return cy.get('.header-logo')
    }

    get emailField() {
        return cy.get('#Email')
    }

    get passwordField() {
        return cy.get('#Password')
    }





    //#endregion


    openSite(){
        cy.visit('https://demowebshop.tricentis.com/');
        this.headerLogo.should('be.visible');

        return this;
    }
















}
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

    get productItem() {
        return cy.get('.page-body [class^="product"]>a[href="/album-3"]')
    }


    get SuccessBanner() {
        return cy.get('.bar-notification.success[style*="display: block"]')
    }

    //#endregion


    openSite(){
        cy.visit('https://demowebshop.tricentis.com/');
        this.headerLogo.should('be.visible');

        return this;
    }



    checkSuccess(text){
        this.SuccessBanner.should('exist').and('contain',(text))

        return this;
    }




}
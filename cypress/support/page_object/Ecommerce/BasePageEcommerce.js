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

    get productItem() { //todo: it is not product item - it is first product name, and if it is changed - your locator would fail, because it contains its name, so use productTitleList (.product-title a)
        return cy.get('.page-body [class^="product"]>a[href="/album-3"]')
    }


    get SuccessBanner() {//todo: small first letter
        return cy.get('.bar-notification.success[style*="display: block"]')
    }

    //#endregion


    openSite(){ //todo: it is better to name it visit()
        cy.visit('https://demowebshop.tricentis.com/');
        this.headerLogo.should('be.visible');

        return this;
    }



    checkSuccess(text){
        this.SuccessBanner.should('exist').and('contain',(text))

        return this;
    }




}
export class BasePageEcommerce {


    get headerLogo() {
        return cy.get('.header-logo')
    }

    get emailField() {
        return cy.get('#Email')
    }

    get passwordField() {
        return cy.get('#Password')
    }

    get productTitleList() {
        return cy.get('.product-title a')
    }

    get productNameInsideCartOrWishlist() {
        return cy.get('.product a')
    }

    get successBanner() {
        return cy.get('.bar-notification.success[style*="display: block"]')
    }



    visit() {
        cy.visit('https://demowebshop.tricentis.com/');
        this.headerLogo.should('be.visible');

        return this;
    }


    checkSuccess(text) {
        this.successBanner.should('exist').and('contain', (text))

        return this;
    }


}
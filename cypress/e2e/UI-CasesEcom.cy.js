
import HomePageEcommerce from "../support/page_object/HomePageEcommerce";


describe('Ecom site checks', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });

    it('Verify that allows register a User', () => {
        new HomePageEcommerce()
            .openSite()
            .visitHeaderLink('Register')
            .inputRequiredFields()
            .submitButtonClick()
            .successMessage.contains('Your registration completed')
    });

    it('Verify that allows login a User', () => {
        new HomePageEcommerce()
            .openSite()
            .visitHeaderLink('Log in')
            // .inputRequiredFields()
            // .submitButtonClick()
            // .successMessage.contains('Your registration completed')
    });
























});
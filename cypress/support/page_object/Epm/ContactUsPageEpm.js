import HomePage from "./HomePageEpm";

export default class ContactUsPageEpm extends HomePage {



    //#region Selectors
    get contactSubmitButton() {
        return cy.get('.button-ui')
    }
    get requiredFields() {
        return cy.get('[aria-required="true"]')
    }
    get errorHandledFieldsList() {
        return cy.get('[aria-invalid="true"]')
    }

    //#endregion



    submitContactForm(){
        this.contactSubmitButton.should('be.visible').click()

        return this;
    }





























}

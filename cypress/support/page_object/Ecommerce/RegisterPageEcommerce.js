import {BasePageEcommerce} from "./BasePageEcommerce";


export default class RegisterPageEcommerce extends BasePageEcommerce {

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

    get registerSubmitButton() {
        return cy.get('#register-button')
    }

    get firstNameField() {
        return cy.get('#FirstName')
    }

    get lastNameField() {
        return cy.get('#LastName')
    }

    get confirmPasswordField() {
        return cy.get('#ConfirmPassword')
    }

    get successMessageBanner() {
        return cy.get('.result')
    }




    //#endregion


    inputRegisterRequiredFields() {
        const timestamp = Date.now();
        const uniqueNames = `Name-${timestamp}`;
        const uniqueEmail = `test-${timestamp}@example.com`;
        const uniquePassword = `Password${timestamp}`;

        this.firstNameField.type(uniqueNames);
        this.lastNameField.type(uniqueNames);
        this.emailField.type(uniqueEmail);
        this.passwordField.type(uniquePassword);
        this.confirmPasswordField.type(uniquePassword);

        return this;
    }

    submitButtonClick() {
        this.registerSubmitButton.should('be.visible').click();

        return this;
    }



}
export const registerPageEcommerce = new RegisterPageEcommerce();
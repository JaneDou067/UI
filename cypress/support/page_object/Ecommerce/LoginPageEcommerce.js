import {BasePageEcommerce} from "./BasePageEcommerce";



export default class LoginPageEcommerce extends BasePageEcommerce {

    //#region Selectors

    get loginSubmitButton() {
        return cy.get('.login-button')
    }

    get logoutButton() {
        return cy.get('.ico-logout')
    }


    //#endregion


    inputLoginRequiredFields() {
        cy.fixture('profile').then((credentials) => {
            this.emailField.type(credentials.email);
            this.passwordField.type(credentials.password);
        });
        return this;
    }

    submitButtonClick() {//todo:clickSubmitButton
        this.loginSubmitButton.should('be.visible').click();

        return this;
    }



}
export const
    loginPageEcommerce = new LoginPageEcommerce();


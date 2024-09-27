import {BasePageEcommerce} from "./BasePageEcommerce";


export default class LoginPageEcommerce extends BasePageEcommerce {


    get loginSubmitButton() {
        return cy.get('.login-button')
    }

    get logoutButton() {
        return cy.get('.ico-logout')
    }


    inputLoginRequiredFields() {
        cy.fixture('profile').then((credentials) => {
            this.emailField.type(credentials.email);
            this.passwordField.type(credentials.password);
        });
        return this;
    }

    clickSubmitButton() {
        this.loginSubmitButton.should('be.visible').click();

        return this;
    }


}
export const
    loginPageEcommerce = new LoginPageEcommerce();


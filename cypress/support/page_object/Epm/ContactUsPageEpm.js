import {BasePageEpm} from "./BasePageEpm";
import HomePageEpm from './HomePageEpm';

export default class ContactUsPageEpm extends BasePageEpm {



    get contactSubmitButton() {
        return cy.get('.button-ui')
    }

    get requiredFields() {
        return cy.get('[aria-required="true"]')
    }

    get firstNameInput() {
        return cy.get('input[name="user_first_name"]')
    }

    get lastNameInput() {
        return cy.get('input[name="user_last_name"]')
    }

    get userEmailInput() {
        return cy.get('input[name="user_email"]')
    }

    get userPhoneInput() {
        return cy.get('input[name="user_phone"]')
    }

    get sourceOfKnownDropdown() {
        return cy.get('[name="user_comment_how_hear_about"] +.select2  .select2-selection')
    }

    get gdrpCheckbox() {
        return cy.get('input[name="gdprConsent"]')
    }



    clickSubmitButton() {
        this.contactSubmitButton.click()

        return this;
    }

    clickHeaderLogo() {
        this.headerLogo.click()
        return new HomePageEpm();
    }


}

export const contactUsPage = new ContactUsPageEpm();
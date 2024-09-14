import {BasePageEpm} from "./BasePageEpm";
import HomePageEpm from './HomePageEpm';

export default class ContactUsPageEpm extends BasePageEpm {



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
        this.contactSubmitButton.click()

        return this;
    }

    returnHome() {
        this.headerLogo.click()
        return new HomePageEpm();
    }



}

export const  contactUsPage = new ContactUsPageEpm();
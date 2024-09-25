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



    submitContactForm(){ //todo" please use action on the name (clickSubmitButton())
        this.contactSubmitButton.click()

        return this;
    }

    returnHome() { //todo: it is better to use action, that you make in the name - clickHeaderLogo()
        this.headerLogo.click()
        return new HomePageEpm();
    }



}

export const  contactUsPage = new ContactUsPageEpm();
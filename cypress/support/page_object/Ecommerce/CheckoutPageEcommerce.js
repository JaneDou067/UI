import {BasePageEcommerce} from "./BasePageEcommerce";


export default class CheckoutPageEcommerce extends BasePageEcommerce{

    get firstNameCheckoutField() {
        return cy.get('input#BillingNewAddress_FirstName')
    }
    get lastNameCheckoutField() {
        return cy.get('input#BillingNewAddress_LastName')
    }
    get emailCheckoutField() {
        return cy.get('input#BillingNewAddress_Email')
    }
    get countryIdCheckoutField() {
        return cy.get('select#BillingNewAddress_CountryId')
    }
    get cityCheckoutField() {
        return cy.get('input#BillingNewAddress_City')
    }
    get mainAddressCheckoutField() {
        return cy.get('input#BillingNewAddress_Address1')
    }
    get postalCodeCheckoutField() {
        return cy.get('input#BillingNewAddress_ZipPostalCode')
    }
    get phoneNumberCheckoutField() {
        return cy.get('input#BillingNewAddress_PhoneNumber')
    }
    get continueCheckoutButton() {
        return cy.get('#billing-buttons-container input')
    }
    get selectCreditCardRadioButton() {
        return cy.get('#paymentmethod_2')
    }
    get proceedWithPaymentButton() {
        return cy.get('.payment-method-next-step-button')
    }
    get cardHolderNameFiled() {
        return cy.get('#CardholderName')
    }
    get cardNumberField() {
        return cy.get('#CardNumber')
    }
    get cardCodeField() {
        return cy.get('#CardCode')
    }
    get proceedWithCheckoutButton() {
        return cy.get('.payment-info-next-step-button')
    }
    get confirmOrderButton() {
        return cy.get('.confirm-order-next-step-button\n')
    }
    get pageTitle() {
        return cy.get('.title')
    }


    inputCheckoutRequiredFields() {
        cy.fixture('checkoutUser').then((data) => {
            this.firstNameCheckoutField.type(data.firstName);
            this.lastNameCheckoutField.type(data.lastName);
            this.emailCheckoutField.type(data.email);
            this.countryIdCheckoutField.select(data.country); // Use select for dropdown
            this.cityCheckoutField.type(data.city);
            this.mainAddressCheckoutField.type(data.address);
            this.postalCodeCheckoutField.type(data.postalCode);
            this.phoneNumberCheckoutField.type(data.phoneNumber);
        });
        return this;
    }

    submitUserDataCheckout(){
        this.continueCheckoutButton.click()

        return this;
    }

    enterPaymentDetails() {
        this.selectCreditCardRadioButton.click()
        this.proceedWithPaymentButton.click()

        cy.fixture('checkoutPayment').then((data) => {
            this.cardHolderNameFiled.type(data.holderName);
            this.cardNumberField.type(data.cardNumber);
            this.cardCodeField.type(data.cardCode);
        });

        this.proceedWithCheckoutButton.click()
        this.confirmOrderButton.click()

        return this;
    }



}
export const  checkoutPageEcommerce = new CheckoutPageEcommerce();
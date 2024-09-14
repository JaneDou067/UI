import {BasePageEcommerce} from "./BasePageEcommerce";
import CheckoutPageEcommerce from "./CheckoutPageEcommerce";


export default class CartPageEcommerce extends BasePageEcommerce {

    //#region Selectors
    get removeFromCartCheckbox() {
        return cy.get('.remove-from-cart input')
    }

    get updateCartButton() {
        return cy.get('.update-cart-button')
    }

    get checkoutButton() {
        return cy.get('.checkout-button')
    }

    get agreeTermsCheckbox() {
        return cy.get('.terms-of-service input')
    }
    get checkoutAsGuestButton() {
        return cy.get('.checkout-as-guest-button')
    }



//#endregion

    removeItemFromCart() {
        this.removeFromCartCheckbox.check()
        this.updateCartButton.click()
    }

    visitCheckoutPage() {
        this.agreeTermsCheckbox.check()
        this.checkoutButton.click()
        this.checkoutAsGuestButton.click()

        return CheckoutPageEcommerce;
    }


};
export const  cartPageEcommerce = new CartPageEcommerce();
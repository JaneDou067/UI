import {BasePageEcommerce} from "./BasePageEcommerce";
import CheckoutPageEcommerce from "./CheckoutPageEcommerce";


export default class CartPageEcommerce extends BasePageEcommerce {


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

    get cartSummarySection() {
        return cy.get('.order-summary-content')
    }


    removeItemFromCart() {
        this.removeFromCartCheckbox.check()
        this.updateCartButton.click()

        return this;
    }

    visitCheckoutPage() {
        this.agreeTermsCheckbox.check()
        this.checkoutButton.click()
        this.checkoutAsGuestButton.click()

        return new CheckoutPageEcommerce();
    }


};
export const cartPageEcommerce = new CartPageEcommerce();
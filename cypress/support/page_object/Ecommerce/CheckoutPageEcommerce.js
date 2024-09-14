import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import CartPageEcommerce from "./CartPageEcommerce";
import WishlistPageEcommerce from "./WishlistPageEcommerce";
import HomePageEcommerce from "./HomePageEcommerce";
import ProductPageEcommerce from "./ProductPageEcommerce";



export default class CheckoutPageEcommerce extends BasePageEcommerce{

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

//#endregion






































}
export const  checkoutPageEcommerce = new CheckoutPageEcommerce();
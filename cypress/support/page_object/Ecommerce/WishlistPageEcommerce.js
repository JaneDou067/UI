import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import CartPageEcommerce from "./CartPageEcommerce";
import CheckoutPageEcommerce from "./CheckoutPageEcommerce";
import HomePageEcommerce from "./HomePageEcommerce";
import ProductPageEcommerce from "./ProductPageEcommerce";



export default class WishlistPageEcommerce extends BasePageEcommerce{

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

//#endregion




































}
export const  wishlistPageEcommerce = new WishlistPageEcommerce();



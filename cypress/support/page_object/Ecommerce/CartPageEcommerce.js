import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import WishlistPageEcommerce from "./WishlistPageEcommerce";
import CheckoutPageEcommerce from "./CheckoutPageEcommerce";
import HomePageEcommerce from "./HomePageEcommerce";
import ProductPageEcommerce from "./ProductPageEcommerce";



export default class CartPageEcommerce extends BasePageEcommerce{

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

//#endregion
































}
export const  cartPageEcommerce = new CartPageEcommerce();
import {BasePageEcommerce} from "./BasePageEcommerce";



export default class WishlistPageEcommerce extends BasePageEcommerce{


    get pageTitle() {
        return cy.get('h1')
    }



}
export const  wishlistPageEcommerce = new WishlistPageEcommerce();



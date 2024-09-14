import {BasePageEcommerce} from "./BasePageEcommerce";



export default class WishlistPageEcommerce extends BasePageEcommerce{

    //#region Selectors
    get pageTitle() {
        return cy.get('h1')
    }


    //#endregion











}
export const  wishlistPageEcommerce = new WishlistPageEcommerce();



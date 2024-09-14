import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import CartPageEcommerce from "./CartPageEcommerce";
import ProductPageEcommerce from "./ProductPageEcommerce";


export default class HomePageEcommerce extends BasePageEcommerce {

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

    get LoginPageLink() {
        return cy.get('.ico-login')
    }

    // get subGroupLinks() {
    //     return cy.get('[href="/computers"] + .top-menu-triangle + .sublist.firstLevel a')
    // }

    get digitalCategoryPage() {
        return cy.get('.top-menu [href="/digital-downloads"]')
    }

    get apparelAndShoesCategoryPage() {
        return cy.get('.top-menu [href="/apparel-shoes"]')
    }

    get menuTab() {
        return cy.get('.top-menu [href="/computers"]')
    }
    get cartPageLink() {
        return cy.get('.header-links .ico-cart')
    }


    //#endregion


    visitRegisterPage() {
        this.registerPageLink.click()
        this.headerLogo.should('be.visible')

        return RegisterPageEcommerce;
    }

    visitLoginPage() {
        this.LoginPageLink.click()
        this.headerLogo.should('be.visible')

        return LoginPageEcommerce;
    }

    hoverOverCategory() {
        this.menuTab.trigger('mouseover');

        return this;
    }

    visitApparelAndShoesCategoryPage() {
        this.apparelAndShoesCategoryPage.click()
        cy.url().should('include', '/apparel-shoes')

        return ProductPageEcommerce;
    }


    visitDigitalCategoryPage() {
        this.digitalCategoryPage.should('be.visible').click()

        return ProductPageEcommerce;
    }

    visitCartPage() {
        this.cartPageLink.click()

        return CartPageEcommerce;
    }


}
export const homePageEcommerce = new HomePageEcommerce();





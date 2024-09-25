import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import CartPageEcommerce from "./CartPageEcommerce";
import ProductPageEcommerce from "./ProductPageEcommerce";


export default class HomePageEcommerce extends BasePageEcommerce {

    //#region Selectors
    get registerPageLink() {//todo: word Page is redundant, because you link name is Register
        return cy.get('.ico-register')
    }

    get LoginPageLink() {//todo: don't use capital letters at the beginning
        return cy.get('.ico-login')
    }

    // get subGroupLinks() { //todo: don't leave commented code
    //     return cy.get('[href="/computers"] + .top-menu-triangle + .sublist.firstLevel a')
    // }

    get digitalCategoryPage() { //todo: it is not category page, digitalDownloadsLink (or tab)
        return cy.get('.top-menu [href="/digital-downloads"]')
    }

    get apparelAndShoesCategoryPage() { //todo: it is not page, it is link or tab
        return cy.get('.top-menu [href="/apparel-shoes"]')
    }

    get menuTab() {//todo: it is not menu tab - it is computerMenuTab
        return cy.get('.top-menu [href="/computers"]')
    }
    get cartPageLink() {
        return cy.get('.header-links .ico-cart')
    }


    //#endregion


    visitRegisterPage() { //todo: name it with action word clickRegisterLink()
        this.registerPageLink.click()
        this.headerLogo.should('be.visible')

        return RegisterPageEcommerce; //todo return new RegisterPageEcommerce(); (and for other methods - the same)
    }

    visitLoginPage() { //todo: name it with action
        this.LoginPageLink.click()
        this.headerLogo.should('be.visible')

        return LoginPageEcommerce;
    }

    hoverOverCategory() {//todo: use "Computer"in the name, it is not common category
        this.menuTab.trigger('mouseover');

        return this;
    }

    visitApparelAndShoesCategoryPage() {
        this.apparelAndShoesCategoryPage.click()
        cy.url().should('include', '/apparel-shoes')

        return ProductPageEcommerce;
    }


    visitDigitalCategoryPage() {//todo: click
        this.digitalCategoryPage.should('be.visible').click()

        return ProductPageEcommerce;
    }

    visitCartPage() {
        this.cartPageLink.click()

        return CartPageEcommerce;
    }


}
export const homePageEcommerce = new HomePageEcommerce();





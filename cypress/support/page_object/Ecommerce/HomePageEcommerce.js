import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import CartPageEcommerce from "./CartPageEcommerce";
import ProductPageEcommerce from "./ProductPageEcommerce";


export default class HomePageEcommerce extends BasePageEcommerce {


    get registerLink() {
        return cy.get('.ico-register')
    }

    get loginLink() {
        return cy.get('.ico-login')
    }

    get digitalDownloadsLink() {
        return cy.get('.top-menu [href="/digital-downloads"]')
    }

    get apparelAndShoesCategoryLink() {
        return cy.get('.top-menu [href="/apparel-shoes"]')
    }

    get computerMenuTab() {
        return cy.get('.top-menu [href="/computers"]')
    }

    get cartHeaderLink() {
        return cy.get('.header-links .ico-cart')
    }

    get computersSubMenuLinks() {
        return cy.get('.sublist.active li')
    }


    clickRegisterLink() {
        this.registerLink.click()
        this.headerLogo.should('be.visible')

        return new RegisterPageEcommerce();
    }

    clickLoginPage() {
        this.loginLink.click()
        this.headerLogo.should('be.visible')

        return new LoginPageEcommerce();
    }

    hoverOverComputerCategory() {
        this.computerMenuTab.trigger('mouseover');

        return this;
    }

    clickApparelAndShoesCategoryLink() {
        this.apparelAndShoesCategoryLink.click()
        cy.url().should('include', '/apparel-shoes')

        return new ProductPageEcommerce();
    }


    clickDigitalCategoryLink() {
        this.digitalDownloadsLink.should('be.visible').click()

        return new ProductPageEcommerce();
    }

    clickCartLink() {
        this.cartHeaderLink.click()

        return new CartPageEcommerce();
    }


}
export const homePageEcommerce = new HomePageEcommerce();





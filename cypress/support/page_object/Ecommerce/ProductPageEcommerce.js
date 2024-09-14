import {BasePageEcommerce} from "./BasePageEcommerce";
import RegisterPageEcommerce from "./RegisterPageEcommerce";
import LoginPageEcommerce from "./LoginPageEcommerce";
import CartPageEcommerce from "./CartPageEcommerce";
import CheckoutPageEcommerce from "./CheckoutPageEcommerce";
import HomePageEcommerce from "./HomePageEcommerce";


export default class ProductPageEcommerce extends BasePageEcommerce{

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

    get sortingDropdown() {
        return cy.get('#products-orderby')
    }
    get nameAscSortingOption() {
        return "Name: A to Z";
    }
    get nameDescSortingOption() {
        return "Name: Z to A";
    }

    get priceAscSortingOption() {
        return "Price: Low to High";
    }

    get priceDescSortingOption() {
        return "Price: High to Low";
    }

    get productTitles() {
        return cy.get('.product-title a')
    }

    get productPrices() {
        return cy.get('.prices span')
    }

    get pageSizeDropdown() {
        return cy.get('#products-pagesize')
    }

    get pageSize4Option() {
        return "4";
    }

    get pageSize8Option() {
        return "8";
    }

    get pageSize12Option() {
        return "12";
    }

    get productItem() {return cy.get('.page-body [class^="product"]>a[href="/album-3"]')}
    get addToWishListButton() {return cy.get('.add-to-wishlist-button')}
    get addToCartButton() {return cy.get('.add-to-cart-button')}

//#endregion


    selectNameAscSortingOption() {
        this.sortingDropdown.select(this.nameAscSortingOption);
        cy.url().should('include', 'orderby=5');

        return this;
    }

    checkIfTitlesSortedAscending() {
        return this.productTitles.then($links => {
            const titles = $links.map((index, link) => Cypress.$(link).text()).get();
            for (let i = 0; i < titles.length - 1; i++) {
                if (titles[i].localeCompare(titles[i + 1]) > 0) {
                    return false;
                }
            }
            return true;
        });
    }

    selectNameDescSortingOption() {
        this.sortingDropdown.select(this.nameDescSortingOption);
        cy.url().should('include', 'orderby=6');

        return this;
    }

    checkIfTitlesSortedDescending() {
        return this.productTitles.then($links => {
            const titles = $links.map((index, link) => Cypress.$(link).text()).get();
            for (let i = 0; i < titles.length - 1; i++) {
                if (titles[i].localeCompare(titles[i + 1]) < 0) {
                    return false;
                }
            }
            return true;
        });
    }

    selectPriceAscSortingOption() {
        this.sortingDropdown.select(this.priceAscSortingOption);
        cy.url().should('include', 'orderby=10');

        return this;
    }

    checkIfPricesSortedAscending() {
        return this.productPrices.then(prices => {
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] > prices[i + 1]) {
                    return false;
                }
            }
            return true;
        });
    }

    selectPriceDescSortingOption() {
        this.sortingDropdown.select(this.priceDescSortingOption);
        cy.url().should('include', 'orderby=11');

        return this;
    }

    checkIfPricesSortedDescending() {
        return this.productPrices.then(prices => {
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    return false;
                }
            }
            return true;
        });
    }

    select4PageSizeOption() {
        this.pageSizeDropdown.select(this.pageSize4Option);
        cy.url().should('include', 'pagesize=4');

        return this;
    }

    select8PageSizeOption() {
        this.pageSizeDropdown.select(this.pageSize8Option);
        cy.url().should('include', 'pagesize=8');

        return this;
    }

    select12PageSizeOption() {
        this.pageSizeDropdown.select(this.pageSize12Option);
        cy.url().should('include', 'pagesize=12');

        return this;
    }








    selectProduct() {
        this.productItem.should('exist').click()

        return this;
    }












































}
export const  productPageEcommerce = new ProductPageEcommerce();



import {BasePageEcommerce} from "./BasePageEcommerce";
import WishlistPageEcommerce from "./WishlistPageEcommerce";

export const sortOption = Object.freeze({
    NAME_ASC: 'Name: A to Z',
    NAME_DESC: 'Name: Z to A',
    PRICE_ASC: 'Price: Low to High',
    PRICE_DESC: 'Price: High to Low'
})


export default class ProductPageEcommerce extends BasePageEcommerce {


    get sortingDropdown() {
        return cy.get('#products-orderby')
    }

    get productTitlesList() {
        return cy.get('.product-title a')
    }

    get productPricesList() {
        return cy.get('.prices span')
    }

    get pageSizeDropdown() {
        return cy.get('#products-pagesize')
    }

    get wishlistHeaderLink() {
        return cy.get('.header-links .ico-wishlist')
    }

    get addToWishListButton() {
        return cy.get('.add-to-wishlist-button')
    }

    get addToCartButton() {
        return cy.get('.product-box-add-to-cart-button')
    }

    get productNameOnProductPage() {
        return cy.get('.product-name')
    }


    checkIfTitlesSortedAscending() {
        return this.productTitlesList.then($links => {
            const titles = $links.map((index, link) => Cypress.$(link).text()).get();
            for (let i = 0; i < titles.length - 1; i++) {
                if (titles[i].localeCompare(titles[i + 1]) > 0) {
                    return false;
                }
            }
            return true;
        });
    }


    checkIfTitlesSortedDescending() {
        return this.productTitlesList.then($links => {
            const titles = $links.map((index, link) => Cypress.$(link).text()).get();
            for (let i = 0; i < titles.length - 1; i++) {
                if (titles[i].localeCompare(titles[i + 1]) < 0) {
                    return false;
                }
            }
            return true;
        });
    }


    checkIfPricesSortedAscending() {
        return this.productPricesList.then(prices => {
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] > prices[i + 1]) {
                    return false;
                }
            }
            return true;
        });
    }


    checkIfPricesSortedDescending() {
        return this.productPricesList.then(prices => {
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    return false;
                }
            }
            return true;
        });
    }


    selectSortOption(value) {
        if (!Object.values(sortOption).includes(value)) {
            throw new Error(`Invalid sort option. Allowed are: ${Object.values(sortOption)}`)
        }
        this.sortingDropdown.select(value);
        return this;
    }


    selectItemsPerPage(number) {
        if (![4, 8, 12].includes(number)) {
            throw new Error('Invalid number for items per page. Allowed values are 4, 8, 12.')
        }
        this.pageSizeDropdown.select(number.toString());
        cy.url().should('include', `pagesize=${number}`);
        return this;
    }

    selectProduct(productIndex) {
        this.productTitleList.eq(productIndex).click()

        return this;
    }

    saveProductName(savedProductNameValue) {
        this.productNameOnProductPage.invoke('text').then((text) => {
            let savedProductName = text;
            cy.wrap(savedProductName).as(savedProductNameValue);
        });

        return this;
    }

    clickAddToWishlistBtn() {
        this.addToWishListButton.click()

        return this;
    }


    visitWishlistPage() {
        this.wishlistHeaderLink.click()
        this.headerLogo.should('be.visible')

        return new WishlistPageEcommerce();
    }


    addToCart(prouctIndex) {
        this.addToCartButton.eq(prouctIndex)
            .click()

        return this;
    }


}
export const productPageEcommerce = new ProductPageEcommerce();



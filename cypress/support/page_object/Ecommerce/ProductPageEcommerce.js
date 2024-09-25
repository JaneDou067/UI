import {BasePageEcommerce} from "./BasePageEcommerce";
import WishlistPageEcommerce from "./WishlistPageEcommerce";


export default class ProductPageEcommerce extends BasePageEcommerce {

    //#region Selectors
    get registerPageLink() {
        return cy.get('.ico-register')
    }

    get sortingDropdown() {
        return cy.get('#products-orderby')
    }

    get nameAscSortingOption() { //todo: do not keep string in getters, you can use string in your method
        return "Name: A to Z";
    }

    get nameDescSortingOption() { //todo: do not keep string in getters, you can use string in your method
        return "Name: Z to A";
    }

    get priceAscSortingOption() { //todo: do not keep string in getters, you can use string in your method
        return "Price: Low to High";
    }

    get priceDescSortingOption() { //todo: do not keep string in getters, you can use string in your method
        return "Price: High to Low";
    }

    get productTitles() {//todo productTitlesList
        return cy.get('.product-title a')
    }

    get productPrices() { //todo: list
        return cy.get('.prices span')
    }

    get pageSizeDropdown() {
        return cy.get('#products-pagesize')
    }

    get pageSize4Option() { //todo: do not keep string in getters, you can use string in your method
        return "4";
    }

    get pageSize8Option() { //todo: do not keep string in getters, you can use string in your method
        return "8";
    }

    get pageSize12Option() { //todo: do not keep string in getters, you can use string in your method
        return "12";
    }

    get wishlistPageLink() {//todo: wishlistHeaderLink (not page)
        return cy.get('.header-links .ico-wishlist')
    }

    get addToWishListButton() {
        return cy.get('.add-to-wishlist-button')
    }

    get addToCartButton() { //todo: it is the button for 3rd album, the item could change, please, use list of this buttons
        return cy.get('[data-productid="53"] .product-box-add-to-cart-button')
    }

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

    //todo: try one parametrized method for all selection options: (and for sorting try the same approach, but you have different value in url, so for this use "case" approach
    // selectItemsPerPage(number) {
    //     this.pageSizeDropdown.select(number);
    //     cy.url().should('include', `pagesize=${number}`);
    //     return this;
    // }

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


    selectProduct() {//todo: when you change the locator to list, you can use number of product as a parameter
        this.productItem.should('exist').click()

        return this;
    }

    addWishlist() { //todo: clickAddToWishlistBtn()
        this.addToWishListButton.click()

        return this;
    }


    visitWishlistPage() {
        this.wishlistPageLink.click()
        this.headerLogo.should('be.visible')

        return WishlistPageEcommerce;
    }


    addToCart() {
        this.addToCartButton.click()

        return this;
    }


}
export const productPageEcommerce = new ProductPageEcommerce();



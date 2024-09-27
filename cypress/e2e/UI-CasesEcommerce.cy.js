import {homePageEcommerce} from "../support/page_object/Ecommerce/HomePageEcommerce";
import {checkoutPageEcommerce} from "../support/page_object/Ecommerce/CheckoutPageEcommerce";
import ProductPageEcommerce, {
    productPageEcommerce,
    sortOption
} from "../support/page_object/Ecommerce/ProductPageEcommerce";
import {cartPageEcommerce} from "../support/page_object/Ecommerce/CartPageEcommerce";


describe('Ecommerce site checks', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });

    it('Verify that allows register a User', () => {
        homePageEcommerce
            .visit()
            .clickRegisterLink()
            .inputRegisterRequiredFields()
            .clickSubmitButton()
            .successMessageBanner.should('contain','Your registration completed')
    });

    it('Verify that allows login a User', () => {
        homePageEcommerce
            .visit()
            .clickLoginPage()
            .inputLoginRequiredFields()
            .clickSubmitButton()
            .logoutButton.should('be.visible')
    });

    it('Verify that ‘Computers’ group has 3 sub-groups with correct names', () => {
        homePageEcommerce
            .visit()
            .hoverOverComputerCategory()
            .computersSubMenuLinks
                .should('be.visible')
                .and('have.length', 3)
                .and('contain','Desktops')
                .and('contain','Notebooks')
                .and('contain','Accessories')
    });

    it('Verify that allows sorting items (Name ASC)', () => {
        homePageEcommerce
            .visit()
            .clickApparelAndShoesCategoryLink()
            .selectSortOption(sortOption.NAME_ASC)
            .checkIfTitlesSortedAscending().then(isSorted => {
                expect(isSorted).to.be.true;
            });
    });

    it('Verify that allows sorting items (Name DESC)', () => {
        homePageEcommerce
            .visit()
            .clickApparelAndShoesCategoryLink()
            .selectSortOption(sortOption.NAME_DESC)
            .checkIfTitlesSortedDescending().then(isSorted => {
                expect(isSorted).to.be.true;
            });
    });

    it('Verify that allows sorting items (Price ASC)', () => {
        homePageEcommerce
            .visit()
            .clickApparelAndShoesCategoryLink()
            .selectSortOption(sortOption.PRICE_ASC)
            .checkIfPricesSortedAscending().then(isSorted => {
                expect(isSorted).to.be.true;
            });
    });

    it('Verify that allows sorting items (Price DESC)', () => {
        homePageEcommerce
            .visit()
            .clickApparelAndShoesCategoryLink()
            .selectSortOption(sortOption.PRICE_DESC)
            .checkIfPricesSortedDescending().then(isSorted => {
                expect(isSorted).to.be.true;
            });
    });


    it('Verify that allows changing number of items on page ', () => {
        homePageEcommerce
            .visit()
            .clickApparelAndShoesCategoryLink()
            .selectItemsPerPage(4)
            .productTitlesList.should('have.length', 4);
        productPageEcommerce
            .selectItemsPerPage(8)
            .productTitlesList.should('have.length', 8);
        productPageEcommerce
            .selectItemsPerPage(12)
            .productTitlesList.should('have.length', 12);
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        homePageEcommerce
            .visit()
            .clickDigitalCategoryLink()
            .selectProduct(1)
            .saveProductName('NameOfProdOnProdPage')
            .clickAddToWishlistBtn()
            .checkSuccess('The product has been added to your wishlist')
            .visitWishlistPage()
            .pageTitle.should('contain', 'Wishlist')
        cy.get('@NameOfProdOnProdPage').then(savedProductName => {
            productPageEcommerce
                .productNameInsideCartOrWishlist
                .invoke("text")
                .then((textFromWishlist) => {
                    expect(textFromWishlist).to.equal(savedProductName.trim());
                });
        });
    });

    it('Verify that allows adding an item to the card', () => {
        homePageEcommerce
            .visit()
            .clickCartLink()
            .cartSummarySection
                .should('contain.text','Your Shopping Cart is empty!')
        homePageEcommerce
            .visit()
            .clickDigitalCategoryLink()
            .addToCart(1)
            .checkSuccess('The product has been added to your shopping cart')
        homePageEcommerce
            .clickCartLink()
            .productNameInsideCartOrWishlist.should('exist')
    });

    it('Verify that allows removing an item from the card', () => {
        homePageEcommerce
            .visit()
            .clickDigitalCategoryLink()
            .addToCart(1)
        homePageEcommerce
            .clickCartLink()
            .productNameInsideCartOrWishlist.should('exist')
        cartPageEcommerce
            .removeItemFromCart()
            .productNameInsideCartOrWishlist.should('not.exist')
    });

    it('Verify that allows checkout an item ', () => {
        homePageEcommerce
            .visit()
            .clickDigitalCategoryLink()
            .addToCart(1)
        homePageEcommerce
            .clickCartLink()
            .productNameInsideCartOrWishlist.should('exist')
        cartPageEcommerce
            .visitCheckoutPage()
            .inputCheckoutRequiredFields()
            .submitUserDataCheckout()
            .enterPaymentDetails()
        cy.url().should('include', '/checkout/completed/')
        checkoutPageEcommerce
            .pageTitle.should('contain','Your order has been successfully processed!')
    });


});
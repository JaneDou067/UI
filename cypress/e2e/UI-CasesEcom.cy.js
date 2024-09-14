import HomePageEcommerce, {homePageEcommerce} from "../support/page_object/Ecommerce/HomePageEcommerce";
import {BasePageEcommerce} from "../support/page_object/Ecommerce/BasePageEcommerce";
import RegisterPageEcommerce, {registerPageEcommerce} from "../support/page_object/Ecommerce/RegisterPageEcommerce";
import LoginPageEcommerce, {loginPageEcommerce} from "../support/page_object/Ecommerce/LoginPageEcommerce";
import CartPageEcommerce from "../support/page_object/Ecommerce/CartPageEcommerce";
import WishlistPageEcommerce from "../support/page_object/Ecommerce/WishlistPageEcommerce";
import CheckoutPageEcommerce from "../support/page_object/Ecommerce/CheckoutPageEcommerce";
import {productPageEcommerce} from "../support/page_object/Ecommerce/ProductPageEcommerce";


describe('Ecom site checks', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });

    it('Verify that allows register a User', () => {
        homePageEcommerce
            .openSite()
            .visitRegisterPage()
        registerPageEcommerce
            .inputRegisterRequiredFields()
            .submitButtonClick()
            .successMessageBanner.contains('Your registration completed')
    });

    it('Verify that allows login a User', () => {
        homePageEcommerce
            .openSite()
            .visitLoginPage()
        loginPageEcommerce
            .inputLoginRequiredFields()
            .submitButtonClick()
            .logoutButton.should('be.visible')
    });

    it('Verify that ‘Computers’ group has 3 sub-groups with correct names', () => {
        homePageEcommerce
            .openSite()
            .hoverOverCategory()
            const subGroupNames = ['Desktops', 'Notebooks', 'Accessories'];
            subGroupNames.forEach((name) => {
                cy.get('.sublist.firstLevel').contains(name).should('be.visible');
        });
    });

    it('Verify that allows sorting items (Name ASC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce
            .selectNameAscSortingOption()
        .checkIfTitlesSortedAscending().then(isSorted => {
            expect(isSorted).to.be.true;
        });
    });

    it('Verify that allows sorting items (Name DESC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce
            .selectNameDescSortingOption()
            .checkIfTitlesSortedDescending().then(isSorted => {
            expect(isSorted).to.be.true;
        });
    });

    it('Verify that allows sorting items (Price ASC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce
            .selectPriceAscSortingOption()
            .checkIfPricesSortedAscending().then(isSorted => {
            expect(isSorted).to.be.true;
        });
    });

    it('Verify that allows sorting items (Price DESC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce
            .selectPriceDescSortingOption()
            .checkIfPricesSortedDescending().then(isSorted => {
            expect(isSorted).to.be.true;
        });
    });


    it('Verify that allows changing number of items on page ', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce
            .select4PageSizeOption()
            .productTitles.should('have.length', 4);
        productPageEcommerce
            .select8PageSizeOption()
            .productTitles.should('have.length', 8);
        productPageEcommerce
            .select12PageSizeOption()
            .productTitles.should('have.length', 12);
    });

    it.only('Verify that allows adding an item to the Wishlist', () => {
        homePageEcommerce
            .openSite()
            .visitDigitalCategoryPage()
        productPageEcommerce
            .selectProduct()
            .addWishlist()
            .checkSuccess('The product has been added to your wishlist')
            .visitRegisterPage('Wishlist')
            .productItem.should('exist')

    });

    it('Verify that allows adding an item to the card', () => {
        new HomePageEcommerce()
            .openSite()
            .visitDigitalCategoryPage()
            .selectProduct()
            .addToCart()
            .checkSuccess('The product has been added to your shopping cart')
            .visitRegisterPage('Shopping cart')
            .productItem.should('exist')
    });




























});
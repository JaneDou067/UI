import  {homePageEcommerce} from "../support/page_object/Ecommerce/HomePageEcommerce";
import  {registerPageEcommerce} from "../support/page_object/Ecommerce/RegisterPageEcommerce";
import  {loginPageEcommerce} from "../support/page_object/Ecommerce/LoginPageEcommerce";
import  {cartPageEcommerce} from "../support/page_object/Ecommerce/CartPageEcommerce";
import  {wishlistPageEcommerce} from "../support/page_object/Ecommerce/WishlistPageEcommerce";
import  {checkoutPageEcommerce} from "../support/page_object/Ecommerce/CheckoutPageEcommerce";
import  {productPageEcommerce} from "../support/page_object/Ecommerce/ProductPageEcommerce";


describe('Ecommerce site checks', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });

    it('Verify that allows register a User', () => {
        homePageEcommerce
            .openSite()
            .visitRegisterPage()
        registerPageEcommerce //todo: continue chain
            .inputRegisterRequiredFields()
            .submitButtonClick()
            .successMessageBanner.contains('Your registration completed') //todo: for assertion it is better to use should("contain" or "include" or "contain.text" etc)
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
                cy.get('.sublist.firstLevel').contains(name).should('be.visible');//todo: it is bad approach - your selector shows 4 items. Try cy.get('.sublist.active'), it contains 3 li elements,
                //so check its quantity is 3, and contains each of your subgroupNames, and try not to use forEach here - it is only 3 items in the list, so use should 3 times
        });
    });

    it('Verify that allows sorting items (Name ASC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce//todo: continue the chain
            .selectNameAscSortingOption()
        .checkIfTitlesSortedAscending().then(isSorted => {
            expect(isSorted).to.be.true;
        });
    });

    it('Verify that allows sorting items (Name DESC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce //todo: continue the chain
            .selectNameDescSortingOption()
            .checkIfTitlesSortedDescending().then(isSorted => {
            expect(isSorted).to.be.true;
        });
    });

    it('Verify that allows sorting items (Price ASC)', () => {
        homePageEcommerce
            .openSite()
            .visitApparelAndShoesCategoryPage()
        productPageEcommerce //todo: continue the chain
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
        productPageEcommerce //todo: continue the chain
            .select4PageSizeOption()
            .productTitles.should('have.length', 4);
        productPageEcommerce
            .select8PageSizeOption()
            .productTitles.should('have.length', 8);
        productPageEcommerce
            .select12PageSizeOption()
            .productTitles.should('have.length', 12);
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        homePageEcommerce
            .openSite()
            .visitDigitalCategoryPage()
        productPageEcommerce //todo: continue the chain
            .selectProduct()
            .addWishlist()
            .checkSuccess('The product has been added to your wishlist')
            .visitWishlistPage()
        wishlistPageEcommerce//todo: continue the chain
            .pageTitle.should('contain','Wishlist' )
        wishlistPageEcommerce
            .productItem.should('exist') //todo: when you will use list here, then this check would be bad - you can or try to remember the name of selected item before adding
        // and then compare it with value in cart (it is harder option, but you can try if you want and ask for my help), or - check that no items is on wishlist at the beginning, and then check - it has

    });

    it('Verify that allows adding an item to the card', () => {
        homePageEcommerce
            .openSite()
            .visitDigitalCategoryPage()
        productPageEcommerce //todo: continue the chain
            .addToCart()
            .checkSuccess('The product has been added to your shopping cart')
        homePageEcommerce //todo: continue the chain
            .visitCartPage()
        cartPageEcommerce//todo: continue the chain
            .productItem.should('exist')
    });

    it('Verify that allows removing an item from the card', () => {
        homePageEcommerce
            .openSite()
            .visitDigitalCategoryPage()
        productPageEcommerce//todo: continue the chain in all test
            .addToCart()
        homePageEcommerce
            .visitCartPage()
        cartPageEcommerce
            .productItem.should('exist')
        cartPageEcommerce
            .removeItemFromCart()
        cartPageEcommerce
            .productItem.should('not.exist')
    });

    it('Verify that allows checkout an item ', () => {
        homePageEcommerce
            .openSite()
            .visitDigitalCategoryPage()
        productPageEcommerce//todo: continue the chain
            .addToCart()
        homePageEcommerce
            .visitCartPage()
        cartPageEcommerce
            .productItem.should('exist')
        cartPageEcommerce
            .visitCheckoutPage()
        checkoutPageEcommerce
            .inputCheckoutRequiredFields()
            .submitUserDataCheckout()
            .enterPaymentDetails()
        cy.url().should('include','/checkout/completed/')
        checkoutPageEcommerce
            .pageTitle.contains('Your order has been successfully processed!')//todo: use should
    });


});
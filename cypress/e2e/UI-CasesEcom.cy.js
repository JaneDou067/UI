
import HomePageEcommerce from "../support/page_object/HomePageEcommerce";


describe('Ecom site checks', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });

    it('Verify that allows register a User', () => {
        new HomePageEcommerce()
            .openSite()
            .visitHeaderLink('Register')
            .inputRequiredFields()
            .submitButtonClick()
            .successMessage.contains('Your registration completed')
    });

    it('Verify that allows login a User', () => {
        new HomePageEcommerce()
            .openSite()
            .visitHeaderLink('Log in')
            .inputRequiredFields()
            .submitButtonClick()
            .logoutButton.should('be.visible')
    });

    it('Verify that ‘Computers’ group has 3 sub-groups with correct names', () => {
        new HomePageEcommerce()
            .openSite()
            .hoverOption()
            .checkSubMenuOptions(['Desktops','Notebooks','Accessories'])
    });

    it('Verify that allows sorting items (different options)', () => {
        new HomePageEcommerce()
            .openSite()
            .visitCategoryPage()
            .checkItemsSorting([
                ['Name: Z to A', 'orderby=6'],
                ['Price: Low to High', 'orderby=10'],
                ['Price: High to Low', 'orderby=11'],
                ['Created on', 'orderby=15']
            ]);
    });

    it('Verify that allows changing number of items on page', () => {
        new HomePageEcommerce()
            .openSite()
            .visitCategoryPage()
            .checkPageSize([
                ['4', 'pagesize=4'],
                ['8', 'pagesize=8'],
                ['12', 'pagesize=12']
            ]);
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        new HomePageEcommerce()
            .openSite()
            .visitCategoryPage()
            .selectProduct()
            .addWishlist()
            .SuccessBanner.should('exist')
    });




























});
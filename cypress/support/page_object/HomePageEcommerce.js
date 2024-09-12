export default class HomePageEcommerce {

    //#region Selectors
    get headerLogo() { return cy.get('.header-logo')}
    get headerLink() { return cy.get('.header-links')}
    get submitButtonRegister() { return cy.get('#register-button')}
    get submitButtonLogin() { return cy.get('.login-button')}
    get firstNameField() {return cy.get('#FirstName')}
    get lastNameField() {return cy.get('#LastName')}
    get emailField() {return cy.get('#Email')}
    get passwordField() {return cy.get('#Password')}
    get confirmPasswordField() {return cy.get('#ConfirmPassword')}
    get successMessage() {return cy.get('.result')}
    get logoutButton() {return cy.get('.ico-logout')}
    get menuTab(){ return cy.get('.top-menu [href="/computers"]')}
    get subMenu(){ return cy.get('[href="/computers"] + .top-menu-triangle + .sublist.firstLevel')}
    get categoryPage(){ return cy.get('.top-menu [href="/digital-downloads"]')}
    get sorting() {return cy.get('#products-orderby')}
    get pageSize() {return cy.get('#products-pagesize')}
    get productItem() {return cy.get('.page-body [class^="product"]>a[href="/album-3"]')}
    get addToWishListBtn() {return cy.get('.add-to-wishlist-button')}
    get SuccessBanner() {return cy.get('.bar-notification.success[style*="display: block"]')}
    get addToCartBtn() {return cy.get('.add-to-cart-button')}












    //#endregion



    openSite(){
        cy.visit('https://demowebshop.tricentis.com/');
        this.headerLogo.should('be.visible');

        return this;
    }

    visitHeaderLink(page) {
        this.headerLink.contains(page).click()

        return this;
    }

    inputRequiredFields() {
        cy.url().then(url => {
            if (url.includes('/register')) {
                const timestamp = Date.now();
                const uniqueNames = `Name-${timestamp}`;
                const uniqueEmail = `test-${timestamp}@example.com`;
                const uniquePassword = `Password${timestamp}`;

                this.firstNameField.type(uniqueNames);
                this.lastNameField.type(uniqueNames);
                this.emailField.type(uniqueEmail);
                this.passwordField.type(uniquePassword);
                this.confirmPasswordField.type(uniquePassword);
            } else if (url.includes('/login')) {
                cy.fixture('profile').then((credentials) => {
                    this.emailField.type(credentials.email);
                    this.passwordField.type(credentials.password);
                });
            }
        });

        return this;
    }

    submitButtonClick() {
        cy.url().then(url => {
            if (url.includes('/register')) {
                this.submitButtonRegister.should('be.visible').click();
            } else if (url.includes('/login')) { // Fixed the regular expression delimiter issue
                this.submitButtonLogin.should('be.visible').click();
            }
        });

        return this;
    }

    hoverOption() {
        this.menuTab.trigger('mouseover');

        return this;
    }

    checkSubMenuOptions (texts) {
        texts.forEach(text => {
            this.subMenu.contains(text).should('be.visible');
        });

        return this;
    }

    visitCategoryPage(){
        this.categoryPage.should('be.visible').click()
        this.sorting.should('be.visible')

        return this;
    }

    checkItemsSorting(sortOptions) {
        sortOptions.forEach(option => {
            const sortName = option[0];
            const sortUrlParam = option[1];

            this.sorting.find('option').contains(sortName).should('exist');
            this.sorting.select(sortName);

            cy.url().should('include', sortUrlParam);
        });

        return this;
    }

    checkPageSize(pageSizeOptions) {
        pageSizeOptions.forEach(option => {
            const dropdownOption = option[0];
            const pageSizeUrlParam = option[1];

            this.pageSize.find('option').contains(dropdownOption).should('exist');
            this.pageSize.select(dropdownOption);

            cy.url().should('include', pageSizeUrlParam);
        });

        return this;
    }

    selectProduct() {
        this.productItem.should('exist').click()

        return this;
    }

    addWishlist() {
        this.addToWishListBtn.click()

        return this;
    }

    addToCart() {
        this.addToCartBtn.click()

        return this;
    }

    checkSuccess(text){
    this.SuccessBanner.should('exist').and('contain',(text))

        return this;
    }













































}





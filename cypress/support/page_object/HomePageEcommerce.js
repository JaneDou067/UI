export default class HomePageEcommerce {

    //#region Selectors
    get headerLogo() { return cy.get('.header-logo')}
    get policiesFooter() { return cy.get('.policies-links-wrapper a')}
    get regionTile() { return cy.get('.locations-viewer-23__carousel')}
    get headerLink() { return cy.get('.header-links')}
    get submitButton() { return cy.get('#register-button')}
    get firstNameField() {return cy.get('#FirstName')}
    get lastNameField() {return cy.get('#LastName')}
    get emailField() {return cy.get('#Email')}
    get passwordField() {return cy.get('#Password')}
    get confirmPasswordField() {return cy.get('#ConfirmPassword')}
    get successMessage() {return cy.get('.result')}




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

    inputRequiredFields(){
        const timestamp = Date.now();
        const uniqueNames = `Name-${Date.now()}`;
        const uniqueEmail = `test-${timestamp}@example.com`;
        const uniquePassword = `Password${timestamp}`;

        this.firstNameField.type(uniqueNames);
        this.lastNameField.type(uniqueNames);
        this.emailField.type(uniqueEmail);
        this.passwordField.type(uniquePassword);
        this.confirmPasswordField.type(uniquePassword);

        return this;
    }

    submitButtonClick(){
        this.submitButton.click();

        return this;
    }




    checkElementPresence(selector) {
        cy.get(selector).should('exist');

        return this;
    }





    checkFooterElements(texts) {
        texts.forEach(text => {
            this.policiesFooter.contains(text).should('be.visible');
        });

        return this;
    }

    checkRegionTile(texts) {
        texts.forEach(text => {
            this.regionTile.contains(text).should('be.visible');
        });

        return this;
    }









    checkCurrentPage(Url) {
        cy.url().should('include', Url);

        return this;
    }

    returnHome() {
        this.headerLogo.should('be.visible').click()
         return this;
    }


























}





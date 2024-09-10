export default class HomePage {

    //#region Selectors
    get modeToggle() { return cy.get('.header__vaulting-container .switch')}
    get headerLogo() { return cy.get('.header__logo-container')}
    get localeSelector() { return cy.get('.location-selector__button')}
    get policiesFooter() { return cy.get('.policies-links-wrapper a')}
    get regionTile() { return cy.get('.locations-viewer-23__carousel')}
    get regionSwitcher() { return cy.get('.tabs-23__link')}
    get searchIcon() { return cy.get('.header-search-ui')}
    get searchInput() { return cy.get('.header-search__input')}
    get searchSubmit() { return cy.get('.custom-search-button')}
    get headerLink() { return cy.get('[class*="top-navigation__"]')}
    get contactSubmit() { return cy.get('.button-ui')}
    get requiredFields() {return cy.get('[aria-required="true"]')}
    get errorHandledFields() {return cy.get('[aria-invalid="true"]')}
    get downloadButton() {return cy.get('[download]')}





    //#endregion



    openSite(){
        cy.visit('https://www.epam.com/');
        this.headerLogo.should('be.visible');

        return this;
    }

    handleExceptions() {
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
                return false;
            }
        });
        return this;
    }

    switchToggle(){
        this.modeToggle.should('be.visible').click();

        return this;
    }

    checkElementPresence(selector) {
        cy.get(selector).should('exist');

        return this;
    }

    chooseLocale(selector) {
        this.localeSelector.should('be.visible').click()
        cy.get(selector).should('be.visible').click()

        return this;
    }

    validateCareerSite() {
        cy.origin('https://careers.epam.ua', () => {
            cy.get('.no-touchevents[lang=\'uk-UA\']').should('exist')
        });
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

    switchRegion(region) {
        this.regionSwitcher.contains(region).click();

        return this;
    }

    runSearch(searchInputValue) {
        this.searchIcon.click();
        this.searchInput.type(searchInputValue);
        this.searchSubmit.click();

        return this;
    }

    visitHeaderLink(page) {
        this.headerLink.contains(page).click({force: true})

        return this;
    }

    submitForm(){
        this.contactSubmit.should('be.visible').click()

        return this;
    }

    checkValidation(){
        this.requiredFields.should('have.length', 8);
        this.errorHandledFields.should('have.length', 6);

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

    downloadContent(){
        this.downloadButton.should('be.visible').click()

        return this;
    }

    checkDownload(filename) {
        cy.readFile(`cypress/downloads/${filename}`).should('exist');

         return this;
    }

    deleteFile(filename) {
        cy.task('deleteFile', filename);

        return this;
    }

    checkDownloadRemoved(filename) {
        cy.readFile(`cypress/downloads/${filename}`).should('not.exist');

        return this;
    }



















}





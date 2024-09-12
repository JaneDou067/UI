export default class HomePageEpm { //todo: you need to get a practice with inheritance Base Page (contains all elements, that are present on all pages), HomePage (class HomePage extends BasePage ),
    // todo - AboutPage, ContuctUsPage() extends Base Page as well. .clickContactUsButton() will return new ContuctUsPage()

    //#region Selectors
    get modeToggle() {
        return cy.get('.header__vaulting-container .switch')
    }
    get headerLogo() { return cy.get('.header__logo-container')}
    get localeSelector() { return cy.get('.location-selector__button')}
    get policiesFooter() { return cy.get('.policies-links-wrapper a')}
    get regionTile() { return cy.get('.locations-viewer-23__carousel')}//todo: did you mean title?
    get regionSwitcher() { return cy.get('.tabs-23__link')}
    get searchIcon() { return cy.get('.header-search-ui')}
    get searchInput() { return cy.get('.header-search__input')}
    get searchSubmit() { return cy.get('.custom-search-button')}
    get headerLink() { return cy.get('[class*="top-navigation__"]')}
    get contactSubmit() { return cy.get('.button-ui')} //todo: please type name of element at the end (Button, Link, Field etc)
    get requiredFields() {return cy.get('[aria-required="true"]')}
    get errorHandledFields() {return cy.get('[aria-invalid="true"]')} //todo: it is better to use here "List" - errorHandledFieldList()
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

    checkElementPresence(selector) { //todo: you
        cy.get(selector).should('exist');

        return this;
    }

    chooseLocale(selector) { //todo: you can not keep locator as a parameter - it is unclear on your spec what you mean
        this.localeSelector.should('be.visible').click()
        cy.get(selector).should('be.visible').click()

        return this;
    }

    validateCareerSite() {
        cy.origin('https://careers.epam.ua', () => {
            cy.get('.no-touchevents[lang=\'uk-UA\']').should('exist') //todo: you should not keep "should" here, just on spec file. Each your test must be ended with "should" (and can contains more "should" inside it)
        }); //todo: do not use locator in methods - put it on getter like others locators
        return this;
    }

    checkFooterElements(texts) {
        texts.forEach(text => {
            this.policiesFooter.contains(text).should('be.visible'); //todo: you should not keep "should" her
        });

        return this;
    }

    checkRegionTile(texts) {
        texts.forEach(text => { //todo: why you used here forEach? in test you checked it 3 times, so I guess it is no need
            this.regionTile.contains(text).should('be.visible'); //todo: you should not keep "should" her
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
        cy.task('deleteFile', filename).then(success => {
            if (success) {
                cy.log('File deleted:', filename);
            } else {
                cy.log('File did not exist, no deletion needed:', filename);
            }
        });

        return this;
    }

    checkDownloadRemoved(filename) {
        cy.readFile(`cypress/downloads/${filename}`).should('not.exist');

        return this;
    }



















}





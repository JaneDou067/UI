import { BasePage } from './BasePageEpm';


export default class HomePage extends BasePage  { //todo: you need to get a practice with inheritance Base Page (contains all elements, that are present on all pages), HomePage (class HomePage extends BasePage ),
    // todo - AboutPage, ContuctUsPage() extends Base Page as well. .clickContactUsButton() will return new ContuctUsPage()

    //#region Selectors
    get modeToggle() {
        return cy.get('.header__vaulting-container .switch')
    }
    get darkModeIndicator() {
        return cy.get('.dark-mode');
    }
    get lightModeIndicator() {
        return cy.get('.light-mode');
    }
    get headerLogo() {
        return cy.get('.header__logo-container')
    }
    get localeSelector() {
        return cy.get('.location-selector__button')
    }
    get ukraineOption() {
        return cy.get('.location-selector__item [lang="uk"]')
    }
    get lightModeHeader() {
        return cy.get('.header__logo-container')
    }
    get regionTile() {
        return cy.get('.locations-viewer-23__carousel');
    }
    get apacRegionButton() {
        return cy.get('.tabs-23__title').contains('APAC');
    }
    get emeaRegionButton() {
        return cy.get('.tabs-23__title').contains('EMEA');
    }


    get regionSwitcher() { return cy.get('.tabs-23__link')}
    get searchIcon() { return cy.get('.header-search-ui')}
    get searchInput() { return cy.get('.header-search__input')}
    get searchSubmit() { return cy.get('.custom-search-button')}
    get headerLink() { return cy.get('[class*="top-navigation__"]')}

    get downloadButton() {return cy.get('[download]')}


    //#endregion

    //#region Statics
    static ukraineLocaleIndicator ='.no-touchevents[lang=\'uk-UA\']';

    static policyLinks = [
        '.footer-links a[href="/cookie-policy"]',
        '.footer-links  a[href*="privacy.epam.com"]',
        '.footer-links   a[href="/investors"]',
        '.footer-links  .links-item a[href*="/open-source"]',
        '.footer-links  a[href="/applicant-privacy-notice"]',
        '.footer-links  a[href="/web-accessibility-statement"]'
    ];



    //#endregion




    openSite(){
        cy.visit('https://www.epam.com/');

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

    checkDarkMode() {
        return this.darkModeIndicator;
    }

    checkLightMode() {
        return this.lightModeIndicator;
    }

    chooseLocale() {
        this.localeSelector.click()
        this.ukraineOption.click()

        return this;
    }

    getRegionTiles() {
        return this.regionTile;
    }

    switchToAPAC() {
        this.apacRegionButton.click();
        return this;
    }

    switchToEMEA() {
        this.emeaRegionButton.click();
        return this;
    }

    runSearch(searchInputValue) {
        this.searchIcon.click();
        this.searchInput.type('AI');
        this.searchSubmit.click();

        return this;
    }

    visitHeaderLink(page) {
        this.headerLink.contains(page).click({force: true})

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





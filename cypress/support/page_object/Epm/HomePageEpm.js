import {BasePageEpm} from './BasePageEpm';
import ContactUsPageEpm from './ContactUsPageEpm';
import AboutPageEpm from './AboutPageEpm';


export default class HomePageEpm extends BasePageEpm {

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

    get lightModeHeader() {
        return cy.get('.header__logo-container')
    }

    get localeSelector() {
        return cy.get('.location-selector__button')
    }

    get ukraineOption() {
        return cy.get('.location-selector__item [lang="uk"]')
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

    get SelectInHeaderContactOption() {
        return cy.get('.header__controls .cta-button__text');
    }

    get aboutPageSelector() {
        return cy.get('.top-navigation__item-link[href="/about"]');
    }

    get searchIcon() {
        return cy.get('.header-search-ui')
    }

    get searchInput() {
        return cy.get('.header-search__input')
    }

    get searchSubmit() {
        return cy.get('.custom-search-button')
    }


    //#endregion

    //#region Statics
    static ukraineLocaleIndicator = '.no-touchevents[lang=\'uk-UA\']';

    static policyLinks = [
        '.footer-links a[href="/cookie-policy"]',
        '.footer-links  a[href*="privacy.epam.com"]',
        '.footer-links   a[href="/investors"]',
        '.footer-links  .links-item a[href*="/open-source"]',
        '.footer-links  a[href="/applicant-privacy-notice"]',
        '.footer-links  a[href="/web-accessibility-statement"]'
    ];


    //#endregion




    handleExceptions() {
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
                return false;
            }
        });
        return this;
    }

    switchToggle() {
        this.modeToggle.click();
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

    runSearch() {
        this.searchIcon.click();
        this.searchInput.type('AI');
        this.searchSubmit.click();

        return this;
    }

    visitContactUsPage() {
        this.SelectInHeaderContactOption.click({force: true})

        return new ContactUsPageEpm;
    }

    visitAboutPage() {
        this.aboutPageSelector.click({force: true})

        return new AboutPageEpm;
    }


}
export const  homePageEpm = new HomePageEpm();


import {BasePageEpm} from './BasePageEpm';
import ContactUsPageEpm from './ContactUsPageEpm';
import AboutPageEpm from './AboutPageEpm';


export default class HomePageEpm extends BasePageEpm {


    get modeToggle() {
        return cy.get('.header__vaulting-container .switch')
    }

    get lightModeIndicator() {
        return cy.get('.light-mode');
    }

    get darkModeIndicator() {
        return cy.get('.dark-mode');
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

    get contactUsHeaderLink() {
        return cy.get('.header__content > a.header__control');
    }

    get aboutHeaderLink() {
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

    get policiesSectionList() {
        return cy.get('.footer-links a')
    }

    get searchResultsCounter() {
        return cy.get('.search-results__counter')
    }

    get searchResultsDescription() {
        return cy.get('.search-results__description')
    }

    switchToggle() {
        this.modeToggle.click();
        return this;
    }

    chooseUkrainianLocale() {
        this.localeSelector.click()
        this.ukraineOption.click()

        return this;
    }

    clickApacTab() {
        this.apacRegionButton.click();

        return this;
    }

    clickEmeaTab() {
        this.emeaRegionButton.click();

        return this;
    }

    runSearch(text) {
        this.searchIcon.click();
        this.searchInput.type(text);
        this.searchSubmit.click();

        return this;
    }

    clickContactUsHeaderLink() {
        this.contactUsHeaderLink.click({force: true})

        return new ContactUsPageEpm();
    }

    clickAboutHeaderLink() {
        this.aboutHeaderLink.click({force: true})

        return new AboutPageEpm();
    }


}
export const homePageEpm = new HomePageEpm();


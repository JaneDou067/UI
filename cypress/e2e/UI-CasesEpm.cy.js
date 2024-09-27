import {homePageEpm} from "../support/page_object/Epm/HomePageEpm";
import {contactUsPage} from "../support/page_object/Epm/ContactUsPageEpm";


describe('Main site checks', () => {
    beforeEach(() => {
        cy.clearCookies()         // Clears all browser cookies
        cy.clearLocalStorage()    // Clears all data in local storage
    });

    it('Site title check', () => {
        homePageEpm
            .visit()
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services');
    });

    it('Check the ability to switch Light / Dark mode', () => {
        homePageEpm
            .visit()
            .darkModeIndicator.should('exist');
        homePageEpm
            .switchToggle()
            .lightModeIndicator.should('exist');


    });

    it('Check that allow to change language to UA', () => {
        homePageEpm
            .visit()
            .chooseUkrainianLocale()
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
                return false;
            }
        });

        cy.origin('https://careers.epam.ua', () => {
            const languageSwitcherUA = cy.get('.location-selector__button')
            languageSwitcherUA.should('have.text', 'Україна (UA)');
            cy.url().should('eq', 'https://careers.epam.ua/');
        });
    });

    it('Check the policies list', () => {
        homePageEpm
            .visit()
            .policiesSectionList
            .should('be.visible')
            .and('contain.text', 'INVESTORS')
            .and('contain.text', 'COOKIE POLICY')
            .and('contain.text', 'OPEN SOURCE')
            .and('contain.text', 'PRIVACY POLICY')
            .and('contain.text', 'APPLICANT PRIVACY NOTICE')
            .and('contain.text', 'WEB ACCESSIBILITY')
            .and('contain.text', 'UK MODERN SLAVERY STATEMENT')
            .and('contain.text', 'Recruitment Fraud Disclaimer')
    });

    it('Check that it allows switching the location list by region', () => {
        homePageEpm
            .visit()
            .regionTile
                .should('be.visible')
                .and('contain.text', 'United States')
        homePageEpm
            .clickApacTab()
            .regionTile
                .should('be.visible')
                .and('contain.text', 'Australia')
        homePageEpm
            .clickEmeaTab()
            .regionTile
                .should('be.visible')
                .and('contain.text', 'Armenia')
    });

    it('Check the search function', () => {
        homePageEpm
            .visit()
            .runSearch('AI')
            .searchResultsCounter.should('contain.text', 'results for "AI"')
        homePageEpm
            .searchResultsDescription
                .find('strong')
                .should('contain.text', 'AI')

    });

    it('Check forms fields validation', () => {
        homePageEpm
            .visit()
            .clickContactUsHeaderLink()
            .clickSubmitButton()
            .requiredFields.should('have.length', 8);
        contactUsPage
            .firstNameInput
                .should('be.visible')
                .and('have.attr', 'aria-invalid', 'true')
        contactUsPage
            .lastNameInput
                .should('be.visible')
                .and('have.attr', 'aria-invalid', 'true')
        contactUsPage
            .userEmailInput
                .should('be.visible')
                .and('have.attr', 'aria-invalid', 'true')
        contactUsPage
            .userPhoneInput
                .should('be.visible')
                .and('have.attr', 'aria-invalid', 'true')
        contactUsPage
            .sourceOfKnownDropdown
                .should('be.visible')
                .and('have.attr', 'aria-invalid', 'true')
        contactUsPage
            .gdrpCheckbox
                .should('be.visible')
                .and('have.attr', 'aria-invalid', 'true')
    });

    it('Check that the Company logo on the header lead to the main page', () => {
        homePageEpm
            .visit()
            .clickContactUsHeaderLink()
        cy.url().should('include', '/about/who-we-are/contact')
        contactUsPage
            .clickHeaderLogo()
        cy.url().should('include', 'https://www.epam.com')

    });

    it('Check that allows to download report ', () => {
        homePageEpm
            .visit()
            .clickAboutHeaderLink()
            .clickDownloadButton()
        cy.readFile(`cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf`).should('exist')
    });

});
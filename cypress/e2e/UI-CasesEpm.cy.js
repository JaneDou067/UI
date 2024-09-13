import HomePageEpm, {homePageEpm} from "../support/page_object/Epm/HomePageEpm";
import {contactUsPage} from "../support/page_object/Epm/ContactUsPageEpm";
import {aboutPageEpm} from "../support/page_object/Epm/AboutPageEpm";



describe('First test suit', () => {
    beforeEach(() => {
        cy.clearCookies()         // Clears all browser cookies
        cy.clearLocalStorage()    // Clears all data in local storage
    });

    it('Main site checks', () => {
        new HomePageEpm()
            .openSiteEpm()
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services');
    });

    it('Check the ability to switch Light / Dark mode', () => {
        const homePage = new HomePageEpm();
        homePage.openSiteEpm();
        homePage.checkDarkMode().should('exist');
        homePage.switchToggle();
        homePage.checkLightMode().should('exist');
        homePage.switchToggle();
        homePage.lightModeHeader.should('be.visible');
    });

    it('Check that allow to change language to UA', () => {
        homePageEpm
            .openSiteEpm()
            .chooseLocale()
            .handleExceptions()
        let ukraineLocaleIndicator = HomePageEpm.ukraineLocaleIndicator;
        let args = { ukraineLocaleIndicator };
        cy.origin('https://careers.epam.ua', { args }, ({ ukraineLocaleIndicator }) => {
                cy.get(ukraineLocaleIndicator).should('exist');
        });
    });

    it('Check the policies list', () => {
            homePageEpm
                .openSiteEpm()

                HomePageEpm.policyLinks.forEach(linkSelector => {
                cy.get(linkSelector).should('be.visible');
            });
    });

    it('Check that it allows switching the location list by region', () => {
            const homePage = new HomePageEpm();
            homePage.openSiteEpm();
            homePage.getRegionTiles().contains('United States').should('be.visible');

            homePage.switchToAPAC();
            homePage.getRegionTiles().contains('Australia').should('be.visible');

            homePage.switchToEMEA();
            homePage.getRegionTiles().contains('Armenia').should('be.visible');
    });

    it('Check the search function', () => {
            homePageEpm
                .openSiteEpm()
                .runSearch()
                cy.url().should('include', 'https://www.epam.com/search?q=AI');
    });

    it('Check forms fields validation', () => {
            homePageEpm
                .openSiteEpm()
                .visitContactUsPage()

            contactUsPage
                .submitContactForm()
                .errorHandledFieldsList.should('have.length', 6);
            contactUsPage
                .requiredFields.should('have.length', 8);

    });

    it('Check that the Company logo on the header lead to the main page', () => {
        homePageEpm
            .openSiteEpm()
            .visitContactUsPage()
            cy.url().should('include', 'https://www.epam.com/about/who-we-are/contact')
        contactUsPage
            .returnHome()
            cy.url().should('include', 'https://www.epam.com')

    });

    it('Check that allows to download report ', () => {
        homePageEpm
            .openSiteEpm()
            .visitAboutPage()
            cy.url().should('include', 'https://www.epam.com/about')

        aboutPageEpm
            .downloadContent()
            cy.readFile(`cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf`).should('exist')
    });

});
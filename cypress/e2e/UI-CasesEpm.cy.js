import HomePageEpm from "../support/page_object/Epm/HomePageEpm";
import ContactUsPageEpm from "../support/page_object/Epm/ContactUsPageEpm";


describe('First test suit', () => {
    beforeEach(() => {
        cy.clearCookies()         // Clears all browser cookies
        cy.clearLocalStorage()    // Clears all data in local storage
    });

    it('Main site checks', () => {
        new HomePageEpm()
            .openSite()
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services');
    });

    it('Check the ability to switch Light / Dark mode', () => {
        const homePage = new HomePageEpm();
        homePage.openSite();
        homePage.checkDarkMode().should('exist');
        homePage.switchToggle();
        homePage.checkLightMode().should('exist');
        homePage.switchToggle();
        homePage.lightModeHeader.should('be.visible');
    });

    it('Check that allow to change language to UA', () => {
        new HomePageEpm()
            .openSite()
            .chooseLocale()
            .handleExceptions()
        let ukraineLocaleIndicator = HomePageEpm.ukraineLocaleIndicator;
        let args = { ukraineLocaleIndicator };
        cy.origin('https://careers.epam.ua', { args }, ({ ukraineLocaleIndicator }) => {
                cy.get(ukraineLocaleIndicator).should('exist');
        });
    });

    it('Check the policies list', () => {
        new HomePageEpm()
            .openSite()

            HomePageEpm.policyLinks.forEach(linkSelector => {
            cy.get(linkSelector).should('be.visible');
        });

    });

    it('Check that it allows switching the location list by region', () => {
        const homePage = new HomePageEpm();
        homePage.openSite();
        homePage.getRegionTiles().contains('United States').should('be.visible');

        homePage.switchToAPAC();
        homePage.getRegionTiles().contains('Australia').should('be.visible');

        homePage.switchToEMEA();
        homePage.getRegionTiles().contains('Armenia').should('be.visible');
    });

    it('Check the search function', () => {
        new HomePageEpm()
            .openSite()
            .runSearch()

        cy.url().should('include', 'https://www.epam.com/search?q=AI');
    });

    it.only('Check forms fields validation', () => {
         new HomePageEpm()
            .openSite()
            .visitHeaderLink('Contact Us')
         const contactUsPageEpm = new ContactUsPageEpm();
            contactUsPageEpm.submitContactForm()
            contactUsPageEpm.requiredFields.should('have.length', 8);
            contactUsPageEpm.errorHandledFieldsList.should('have.length', 6);

    });

    it('Check that the Company logo on the header lead to the main page', () => {
        new HomePageEpm()
            .openSite()
            .visitHeaderLink('About')
            .checkCurrentPage('https://www.epam.com/about')
            .returnHome()
            .checkCurrentPage('https://www.epam.com')
    });

    it('Check that allows to download report ', () => {
        new HomePageEpm()
            .openSite()
            .deleteFile('EPAM_Corporate_Overview_Q4_EOY.pdf') //todo: you don't need these two lines here - you can put actions on "downloadContent()" method
            .checkDownloadRemoved('EPAM_Corporate_Overview_Q4_EOY.pdf')//todo: for the first run of your test these two lines would not work because of empty folder
            .visitHeaderLink('About')
            .checkCurrentPage('https://www.epam.com/about')
            .downloadContent()
            .checkDownload('EPAM_Corporate_Overview_Q4_EOY.pdf')

    });

});
import HomePageEpm from "../support/page_object/HomePageEpm";


describe('First test suit', () => {
    beforeEach(() => {
        cy.clearCookies()         // Clears all browser cookies
        cy.clearLocalStorage()    // Clears all data in local storage
    });

    it('Check the title is correct', () => {
        new HomePageEpm()
            .openSite()
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services');
    });

    it('Check the ability to switch Light / Dark mode', () => {
        new HomePageEpm()
            .openSite()
            .checkElementPresence('.dark-mode')
            .switchToggle()
            .checkElementPresence('.light-mode')
            .switchToggle()

        cy.get('.header__logo-light').should('be.visible')

    });

    it('Check that allow to change language to UA', () => {
        new HomePageEpm()
            .openSite()
            .chooseLocale('.location-selector__item [lang="uk"]')
            .handleExceptions()
            .validateCareerSite()
    });

    it('Check the policies list', () => {
        new HomePageEpm()
            .openSite()
            .checkFooterElements(['COOKIE POLICY', 'WEB ACCESSIBILITY', 'PRIVACY POLICY','INVESTORS', 'OPEN SOURCE','APPLICANT PRIVACY NOTICE'])
    });

    it('Check that allow to switch location list by region', () => {
        new HomePageEpm()
            .openSite()
            .checkRegionTile(['United States'])
            .switchRegion('APAC')
            .checkRegionTile(['Australia'])
            .switchRegion('EMEA')
            .checkRegionTile(['Armenia'])
    });

    it('Check the search function', () => {
        new HomePageEpm()
            .openSite()
            .runSearch('AI')
            .checkCurrentPage('https://www.epam.com/search?q=AI')
    });

    it('Check forms fields validation', () => {
        new HomePageEpm()
            .openSite()
            .visitHeaderLink('Contact Us')
            .submitForm()
            .checkValidation()
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
            .deleteFile('EPAM_Corporate_Overview_Q4_EOY.pdf')
            .checkDownloadRemoved('EPAM_Corporate_Overview_Q4_EOY.pdf')
            .visitHeaderLink('About')
            .checkCurrentPage('https://www.epam.com/about')
            .downloadContent()
            .checkDownload('EPAM_Corporate_Overview_Q4_EOY.pdf')

    });

});
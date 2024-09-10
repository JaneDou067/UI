import HomePage from "../support/page_object/HomePage";


describe('First test suit', () => {
    beforeEach(() => {
        cy.clearCookies()         // Clears all browser cookies
        cy.clearLocalStorage()    // Clears all data in local storage
    });

    it('Check the title is correct', () => {
        new HomePage()
            .openSite()
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services');
    });

    it('Check the ability to switch Light / Dark mode', () => {
        new HomePage()
            .openSite()
            .checkElementPresence('.dark-mode')
            .switchToggle()
            .checkElementPresence('.light-mode')
            .switchToggle()

        cy.get('.header__logo-light').should('be.visible')

    });

    it('Check that allow to change language to UA', () => {
        new HomePage()
            .openSite()
            .chooseLocale('.location-selector__item [lang="uk"]')
            .handleExceptions()

            .validateCareerSite()
    });

    it('Check the policies list', () => {
        new HomePage()
            .openSite()
            .checkFooterElements(['COOKIE POLICY', 'WEB ACCESSIBILITY', 'PRIVACY POLICY','INVESTORS', 'OPEN SOURCE','APPLICANT PRIVACY NOTICE'])
    });

    it('Check that allow to switch location list by region', () => {
        new HomePage()
            .openSite()
            .checkRegionTile(['United States'])
            .switchRegion('APAC')
            .checkRegionTile(['Australia'])
            .switchRegion('EMEA')
            .checkRegionTile(['Armenia'])
    });

    it('Check the search function', () => {
        new HomePage()
            .openSite()
            .runSearch('AI')
            .checkCurrentPage('https://www.epam.com/search?q=AI')
    });

    it('Check forms fields validation', () => {
        new HomePage()
            .openSite()
            .visitHeaderLink('Contact Us')
            .submitForm()
            .checkValidation()
    });

    it('Check that the Company logo on the header lead to the main page', () => {
        new HomePage()
            .openSite()
            .visitHeaderLink('About')
            .checkCurrentPage('https://www.epam.com/about')
            .returnHome()
            .checkCurrentPage('https://www.epam.com')
    });

    it('Check that allows to download report ', () => {
        new HomePage()
            .openSite()
            .deleteFile('EPAM_Corporate_Overview_Q4_EOY.pdf')
            .checkDownloadRemoved()
            .visitHeaderLink('About')
            .checkCurrentPage('https://www.epam.com/about')
            .downloadContent()
            .checkDownload('EPAM_Corporate_Overview_Q4_EOY.pdf')

    });

});
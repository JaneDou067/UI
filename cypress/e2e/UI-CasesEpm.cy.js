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
        const homePage = new HomePageEpm();//todo: why do you need this line? why you didn't use homePageEpm for lines 21-26 like on line 31?
        homePage.openSiteEpm();
        homePage.checkDarkMode().should('exist');//todo: you could not create new instance here, just continue the chain just like on the next your test
        homePage.switchToggle() //todo: please use getter, but not empty method on line 22
            .lightModeIndicator.should('exist'); //todo: this is how you should do instead of line below
        homePage.checkLightMode().should('exist');
        homePage.switchToggle();//todo: you could not create new instance here, just continue the chain just like on the next your test
        homePage.lightModeHeader.should('be.visible');
    });

    it('Check that allow to change language to UA', () => {
        homePageEpm
            .openSiteEpm()
            .chooseLocale()
            .handleExceptions() // todo: you could not put it in method, just handle exception here, in test page
        let ukraineLocaleIndicator = HomePageEpm.ukraineLocaleIndicator; //todo: it is strange locator of the whole page... Look at another idea at the end of this test:
        let args = { ukraineLocaleIndicator };
        cy.origin('https://careers.epam.ua', { args }, ({ ukraineLocaleIndicator }) => {
                cy.get(ukraineLocaleIndicator).should('exist');
        });
        //todo: probably it is better and easier solution:
        // cy.origin('https://careers.epam.ua', () => {
        //     const languageSwitcherUA = cy.get('.location-selector__button')
        //     languageSwitcherUA.should('have.text', 'Україна (UA)');
        //     cy.url().should('eq', 'https://careers.epam.ua/');
        // });
    });

    it('Check the policies list', () => {
            homePageEpm
                .openSiteEpm()

                HomePageEpm.policyLinks.forEach(linkSelector => { //todo: you should not check selectors are present, but what is the text on that selector.
                cy.get(linkSelector).should('be.visible');
                //todo: find locator of all policyLinkList, and then check if it is visible:     .policiesSectionList
                    //         .should('be.visible')
                    //         .and('contain.text', 'INVESTORS')
                    //         .and('contain.text', 'COOKIE POLICY')....

            });
    });

    it('Check that it allows switching the location list by region', () => {
            const homePage = new HomePageEpm(); //todo: why do you need this line? why you didn't use homePageEpm for lines 59-66 like on line 31?
            homePage.openSiteEpm();
            homePage.getRegionTiles().contains('United States').should('be.visible'); //todo: you could not create new instance here, just continue the chain just like on the next your test

            homePage.switchToAPAC();
            homePage.getRegionTiles().contains('Australia').should('be.visible');//todo: use regionTile here

            homePage.switchToEMEA();
            homePage.getRegionTiles().contains('Armenia').should('be.visible');
    });

    it('Check the search function', () => {
            homePageEpm
                .openSiteEpm()
                .runSearch() //todo: make this method parametrized for run different search-text
                cy.url().should('include', 'https://www.epam.com/search?q=AI'); //todo: it is not check of search function - you should check if your entered text appears in each search-output
    });

    it('Check forms fields validation', () => {
            homePageEpm
                .openSiteEpm()
                .visitContactUsPage()

            contactUsPage//todo: you could not create new instance here, just continue the chain
                .submitContactForm()
                .errorHandledFieldsList.should('have.length', 6); //todo: it is not enough to check the length, you should check what exactly field gave an error and what - not
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
            cy.url().should('include', 'https://www.epam.com') //todo: line 98 also include this text, so be careful for your test not to become a false positive (for example you can use "contain.text", "contact" - it is more uniq

    });

    it('Check that allows to download report ', () => {
        homePageEpm
            .openSiteEpm()
            .visitAboutPage()
            cy.url().should('include', 'https://www.epam.com/about') //todo: it is not necessary check, because your next action is to click on the button, that exists on About page

        aboutPageEpm
            .downloadContent()
            cy.readFile(`cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf`).should('exist')
    });

});
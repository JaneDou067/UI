import {BasePageEpm} from "./BasePageEpm";

export default class AboutPageEpm extends BasePageEpm {

    //#region Selectors //todo: probably it is typo? or what "region" means here?
    get downloadButton() {
        return cy.get('[download]')
    }

    //#endregion //todo: probably it is typo?



    downloadContent(){//todo please use more clear name, that contains action ex, clickDownloadButton()
        const filename= `cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf`
        cy.task('deleteFile', filename).then(success => {
            if (success) {
                cy.log('File deleted:', filename);
            } else {
                cy.log('File did not exist, no deletion needed:', filename);
            }
        });
        cy.readFile(filename).should('not.exist')

        this.downloadButton.should('be.visible').click()

        return this;
    }

}
export const  aboutPageEpm = new AboutPageEpm();
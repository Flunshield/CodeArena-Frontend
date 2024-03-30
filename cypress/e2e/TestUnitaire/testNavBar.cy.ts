import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";

describe('Test de la navBar', () => {

    it('Test de l\'ouverture de la navBar', () => {

        cy.visit('http://localhost:5173');

        login('cacapouettcocotessdsvsv', 'password1');
        cy.wait(2000);
        cy.get('body').contains('CodeArena').should('be.visible');
        cy.get('#navBarButton').should('be.visible');
        cy.wait(500);

        cy.get('#navBarButton').click();
        cy.wait(500);

        cy.get('#link-dashboard').should('be.visible');
        cy.get('#link-ranked').should('be.visible');
        cy.get('#link-ranking').should('be.visible');
        cy.get('#link-tournaments').should('be.visible');
        cy.get('#link-event').should('be.visible');
        cy.wait(500);

        logout();
    });
});

export {};
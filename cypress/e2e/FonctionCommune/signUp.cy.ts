import { } from 'cypress';

/**
 * Fonction permettant de créer un compte lors des tests.
 *
 * !!! Attention a bien renseigner un compte qui n'existe pas !!!
 *
 * @param userName
 * @param password
 * @param email
 * @exemple signUp('julien', 'julien', 'julien@gmail.com);
 */
export const signUp = (userName: string, password: string, email: string) => {
    cy.wait(2000);
    cy.get('header').contains('CodeArena').should('be.visible');
    cy.wait(500);
    cy.get('header').contains('Connection').should('be.visible');
    cy.wait(500);
    cy.get('header').contains('Inscription').should('be.visible');
    cy.wait(500);
    cy.get('#signUp').click();
    cy.wait(2000);
    cy.get('#userName').type(userName);
    cy.wait(500);
    cy.get('#password').type(password);
    cy.wait(500);
    cy.get('#email').type(email);
    cy.wait(500);
    cy.get('#createAccount').click();
    cy.wait(2000);
    cy.on('window:alert', (message) => {
        expect(message).to.equal('Un mail pour confirmer votre adresse mail a été envoyé');
    });
};
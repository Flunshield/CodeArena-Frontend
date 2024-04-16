import { } from 'cypress';

/**
 * Fonction permettant de se déconnecter lors des tests
 * @exemple logout();
 */
export const logout = () => {
    cy.get('#id-bouton-profile').trigger('mouseover');
    cy.wait(500);
    cy.get('#signOut').should('be.visible');
    cy.wait(500);
    cy.get('#signOut').click();
    cy.wait(500);
    cy.get('#titleConnect').should('be.visible');
};
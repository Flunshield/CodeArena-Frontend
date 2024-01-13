import { } from 'cypress';

/**
 * Fonction permettant de se déconnecter lors des tests
 * @exemple logout();
 */
export const logout = () => {
    cy.get('#signOut').should('be.visible');

    cy.get('#signOut').click();

    cy.get('#titleConnect').should('be.visible');
};
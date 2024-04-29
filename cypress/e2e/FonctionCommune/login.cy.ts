import {signUp} from "./signUp.cy";

/**
 * Fonction permettant de se connecter lors des tests.
 *
 * !!! Attention à bien renseigner un compte existant !!!
 * @exemple login();
 */
export const login = (): Cypress.Chainable<boolean> => {
    const userName = 'cacapouettcocotessdsvsv'
    const password = 'Password123456!'

    // Intercepter la réponse du serveur pour la requête de connexion
    cy.intercept('POST', `http://localhost:3000/auth/login`).as('getLoginRetour');

    cy.wait(2000);

    // Vérifier la présence des éléments dans le header
    cy.get('body').contains('CodeArena').should('be.visible');

    cy.wait(500);

    // Cliquer sur le bouton de connexion
    cy.get('#signIn').click();

    cy.wait(2000);

    // Remplir les champs de connexion
    cy.get('#userName').type(userName);
    cy.get('#password').type(password);

    cy.wait(500);

    // Cliquer sur le bouton de connexion
    cy.get('#connect').click();

    // Attendre la fin de l'interception de la réponse du serveur
    return cy.wait('@getLoginRetour').then((interception) => {
        const statusCode = interception.response?.statusCode;

        if (statusCode === 404) {
            signUp(userName, password, userName + "@gmail.com")
            login()
        }

        // Retournez true si le statut est 200
        return statusCode === 200;
    });
};

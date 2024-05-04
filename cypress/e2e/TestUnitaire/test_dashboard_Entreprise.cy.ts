// import {login} from "../FonctionCommune/login.cy";
// import {logout} from "../FonctionCommune/logout.cy";
//
// describe('Test du dashboard entreprise', () => {
//
//     it('Test de l\'interface du dashboard entreprise', () => {
//
//         cy.visit('http://localhost:5173');
//
//         login();
//         cy.wait(2000);
//         cy.get('body').contains('CodeArena').should('be.visible');
//         cy.get('#navBarButton').should('be.visible');
//         cy.get('#title-futurTournament').should('be.visible');
//         cy.get('#title-yourRank').should('be.visible');
//         cy.get('#title-event').should('be.visible');
//         cy.wait(2000);
//
//         cy.get('#entrepriseAchat').click();
//         cy.wait(5000);
//
//         cy.get('#CardExplainSection').should('be.visible');
//         cy.get('#PricingSection').should('be.visible');
//         cy.get('#TrustSection').should('be.visible');
//         cy.wait(500);
//
//         cy.get('#id-bouton-profile').click();
//         cy.get('#button-compte').should('be.visible');
//         cy.get('#button-compte-entreprise').should('be.visible');
//         cy.wait(500);
//
//         cy.get('#button-compte-entreprise').click();
//         cy.wait(500);
//
//         cy.get('#1').should('be.visible');
//         cy.get('#Premium').should('be.visible');
//         cy.get('#2').should('be.visible');
//         cy.get('#3').should('be.visible');
//         cy.wait(500);
//
//         cy.get('#PuzzleForm').should('be.visible');
//         cy.get('#PuzzleDisplay').should('be.visible');
//         cy.get('#PuzzleList').should('be.visible');
//         cy.wait(500);
//
//         logout();
//
//     });
// });
//
// export {};
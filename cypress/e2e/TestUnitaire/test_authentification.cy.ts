import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";


describe('Test de l\'authentification', () => {

  it('Test de l\'authentification', () => {

    cy.visit('http://localhost:5173');

    login();
    cy.wait(2000);


  });
});

export {};

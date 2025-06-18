describe('Agenda de Contatos', () => {
    const url = 'https://agenda-contatos-react.vercel.app/';

    beforeEach(() => {
    cy.visit(url);
    });

    it('Deve adicionar um contato', () => {
    cy.get('input[placeholder="Nome"]').type('João da Silva');
    cy.get('input[type="email"]').type('joao@email.com');
    cy.get('input[placeholder="Telefone"]').type('11999999999');
    cy.get('button[type="submit"]').click();

    cy.contains('João da Silva').should('exist');
    cy.contains('11999999999').should('exist');
    cy.contains('joao@email.com').should('exist');
    });

    it('Deve editar o contato', () => {
    cy.get('input[placeholder="Nome"]').type('João da Silva');
    cy.get('input[type="email"]').type('joao@email.com');
    cy.get('input[placeholder="Telefone"]').type('11999999999');
    cy.get('button[type="submit"]').click();

    cy.contains('João da Silva').should('exist');

    cy.contains('João da Silva')
        .parent()
        .siblings()
        .contains('Editar')
        .click();

    cy.get('input[placeholder="Nome"]').clear().type('João Editado');
    cy.get('input[type="email"]').clear().type('editado@email.com');
    cy.get('input[placeholder="Telefone"]').clear().type('11988888888');
    cy.get('button[type="submit"]').click();

    cy.contains('João Editado').should('exist');
    cy.contains('11988888888').should('exist');
    cy.contains('editado@email.com').should('exist');
    });

    it('Deve remover o contato', () => {
    cy.get('input[placeholder="Nome"]').type('João Editado');
    cy.get('input[type="email"]').type('editado@email.com');
    cy.get('input[placeholder="Telefone"]').type('11988888888');
    cy.get('button[type="submit"]').click();

    cy.contains('João Editado').should('exist');

    cy.contains('João Editado')
        .parent()
        .siblings()
        .contains('Remover')
        .click();

    cy.contains('João Editado').should('not.exist');
    });
});

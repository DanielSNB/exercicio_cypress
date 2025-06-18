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
    // Primeiro adiciona o contato (pode ser feito antes, mas aqui está no próprio teste)
    cy.get('input[placeholder="Nome"]').type('João da Silva');
    cy.get('input[type="email"]').type('joao@email.com');
    cy.get('input[placeholder="Telefone"]').type('11999999999');
    cy.get('button[type="submit"]').click();

    cy.contains('João da Silva').should('exist');

    // Clica no botão 'Editar' associado a esse contato
    cy.contains('João da Silva')
        .parent()
        .siblings()
        .contains('Editar')
        .click();

    // Preenche os novos dados
    cy.get('input[placeholder="Nome"]').clear().type('João Editado');
    cy.get('input[type="email"]').clear().type('editado@email.com');
    cy.get('input[placeholder="Telefone"]').clear().type('11988888888');
    cy.get('button[type="submit"]').click();

    // Verifica se os dados editados aparecem
    cy.contains('João Editado').should('exist');
    cy.contains('11988888888').should('exist');
    cy.contains('editado@email.com').should('exist');
    });

    it('Deve remover o contato', () => {
    // Primeiro adiciona o contato editado
    cy.get('input[placeholder="Nome"]').type('João Editado');
    cy.get('input[type="email"]').type('editado@email.com');
    cy.get('input[placeholder="Telefone"]').type('11988888888');
    cy.get('button[type="submit"]').click();

    cy.contains('João Editado').should('exist');

    // Clica no botão 'Remover' associado ao contato
    cy.contains('João Editado')
        .parent()
        .siblings()
        .contains('Remover')
        .click();

    // Verifica que o contato foi removido
    cy.contains('João Editado').should('not.exist');
    });
});

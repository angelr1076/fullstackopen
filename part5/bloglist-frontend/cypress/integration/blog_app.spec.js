describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Angel Rodriguez',
      username: 'angelr1076',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#login').click();
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('angelr1076');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Angel Rodriguez is logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('angelr1076');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
    });
  });
});

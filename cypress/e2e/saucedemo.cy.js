describe('Sauce demo store', () => {

  describe('Login page tests', () => {

    it('should load login page', () => {

      cy.visit('https://www.saucedemo.com/');
      cy.get('input[data-test="username"]').should('be.visible');
      cy.get('input[data-test="password"]').should('be.visible');
      cy.get('input[data-test="login-button"]').should('be.visible');
      cy.get('div[data-test="login-credentials"]').should('be.visible');
      cy.get('div[data-test="login-password"]').should('be.visible');
  
    });
  
    it('should login to the app store', () =>{
  
      cy.visit('https://www.saucedemo.com/');
      cy.get('input[data-test="username"]').type('standard_user');
      cy.get('input[data-test="password"]').type('secret_sauce');
      cy.get('input[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
  
    });

  });

  describe('Logged tests', () => {

    beforeEach(() => {

      cy.visit('https://www.saucedemo.com/');
      cy.get('input[data-test="username"]').type('standard_user');
      cy.get('input[data-test="password"]').type('secret_sauce');
      cy.get('input[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
      cy.wait(1000);

    });

    it('Should make comlete order', () => {

      cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click();
      cy.get('span[data-test="shopping-cart-badge"]').should('be.visible');
      cy.wait(3000);
      cy.get('img[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]').click();
      cy.url().should('include', '/inventory-item.html?id=1');
      cy.get('button[data-test="add-to-cart"]').click();
      cy.wait(2000);
      cy.get('a[data-test="shopping-cart-link"]').click();
      cy.get('div[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible');
      cy.get('div[data-test="inventory-item-name"]').contains('Sauce Labs Bolt T-Shirt').should('be.visible');
      cy.wait(2000);
      cy.get('button[data-test="remove-sauce-labs-backpack"]').click();
      cy.get('div[data-test="inventory-item-name"]').contains('Sauce Labs Bolt T-Shirt').should('be.visible');
      cy.get('button[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one.html');
      cy.wait(2000);
      cy.get('input[data-test="firstName"]').type('Michael');
      cy.get('input[data-test="lastName"]').type('Jordan');
      cy.get('input[data-test="postalCode"]').type('21460');
      cy.get('input[data-test="continue"]').click();
      cy.wait(2000);
      cy.get('div[data-test="inventory-item-name"]').contains('Sauce Labs Bolt T-Shirt').should('be.visible');
      cy.get('div[data-test="payment-info-value"]').should('be.visible');
      cy.get('div[data-test="shipping-info-value"]').should('be.visible');
      cy.get('div[data-test="subtotal-label"]').should('be.visible');
      cy.get('div[data-test="tax-label"]').should('be.visible');
      cy.get('div[data-test="total-label"]').should('be.visible');
      cy.get('button[data-test="finish"]').click();
      cy.wait(2000);
      cy.get('span[data-test="title"]').contains('Checkout: Complete!').should('be.visible');
      cy.get('img[data-test="pony-express"]').should('be.visible');
      cy.get('h2[data-test="complete-header"]').contains('Thank you for your order!').should('be.visible');

    });

  });

  describe('Login with invalid username and password', () => {

    it('Should display error message', () => {

      cy.visit('https://www.saucedemo.com/');
      cy.get('input[data-test="username"]').type('userName');
      cy.get('input[data-test="password"]').type('password');
      cy.get('input[data-test="login-button"]').click();
      cy.get('h3[data-test="error"]').should('be.visible');
      cy.url().should('include', '/');
      cy.wait(2000);

    });

  });

});


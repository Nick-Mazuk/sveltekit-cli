it('renders', () => {
    cy.visit('PAGE_PATH')
    cy.injectAxe()
    cy.checkA11y()
})

export {}

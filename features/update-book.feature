Feature: Manage books in the catalog
  As an authorized user
  I want to add, update books
  So that I can maintain the catalog properly

  Background:
    Given I am on the welcome page
    And I login with valid credentials
    And I should see a welcome message with my username

  @updateBook @reg
  Scenario: Update an existing book successfully
    When I navigate to the Add a New Book page
    And I add a new book with title '20' characters
    And I update the book title to "Updated Title"
    And I update the book price to "99.99"
    Then the book should show the updated title and price in the catalog

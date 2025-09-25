Feature: Manage books in the catalog
  As an authorized user
  I want to delete books
  So that I can maintain the catalog properly

  Background:
    Given I am on the welcome page
    And I login with valid credentials
    And I should see a welcome message with my username

  @deleteBook @reg
  Scenario: Delete an existing book successfully
    When I navigate to the Add a New Book page
    And I add a new book with title '20' characters
    And I delete the book
    Then the book should not appear in the catalog
    And the book count should match the number of books in the catalog
    And the total count of books should decrease by 1

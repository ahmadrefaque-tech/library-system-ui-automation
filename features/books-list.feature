Feature: Books List Page behavior
  As an authorized user
  I want to view and interact with the Books List Page
  So that I can manage books and validate catalog integrity

  Background:
    Given I am on the welcome page
    And I login with valid credentials

  @bookList @reg
  Scenario: Welcome message and logout button are visible
    Then I should see a welcome message with my username
    And I should see a Logout button

  @bookList @reg
  Scenario: Catalog row count matches total titles count
    When I record the current total count of books
    Then the book count should match the number of books in the catalog

  @logout @bookList @reg
  Scenario: User can log out successfully
    When I click the Logout button
    Then I should navigate to the login page

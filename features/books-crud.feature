Feature: Book Catalog CRUD smoke test
  As a library system user
  I want to perform full CRUD on a book
  So that I can verify the system handles end-to-end operations correctly

  Background:
    Given I am on the welcome page
    And I login with valid credentials
    And I should see a welcome message with my username

  @smoke @crud
  Scenario: Full CRUD flow for a book
    When I record the current total count of books
    And I navigate to the Add a New Book page
    And I add a new book with title '20' characters
    Then the new book should be visible in the catalog with correct details
    And the total count of books should increase by 1
    And the book count should match the number of books in the catalog
    When I update the book title to "Updated Smoke Test Title"
    And I update the book price to "42.00"
    Then the book should show the updated title and price in the catalog
    When I delete the book
    Then the book should not appear in the catalog
    And the book count should match the number of books in the catalog
    And the total count of books should decrease by 1
Feature: Add books in the catalog
  As an authorized user
  I want to add books
  So that I can expand the catalog

  Background:
    Given I am on the welcome page
    And I login with valid credentials
    And I should see a welcome message with my username

  @addBook @reg
  Scenario: Add a new book successfully
    When I record the current total count of books
    And the book count should match the number of books in the catalog
    And I navigate to the Add a New Book page
    And I add a new book with title '20' characters
    Then the new book should be visible in the catalog with correct details
    And the book count should match the number of books in the catalog
    And the total count of books should increase by 1

  @negative @validation @reg
  Scenario: Submitting the form without entering any fields
    When I navigate to the Add a New Book page
    And I click the Add Book button
    Then I should see an error message summary
    And I should see the following validation errors:
      | Title             | Title is required.            |
      | Author            | Author is required.           |
      | Genre             | Genre is required.            |
      | ISBN              | ISBN is required.             |
      | Publication Date  | Publication Date is required. |
      | Price             | Price is required.            |

  @negative @validation @reg
  Scenario: Title exceeds 20 maximum length limit
    When I navigate to the Add a New Book page
    And I add a new book with title '21' characters
    And I click the Add Book button
    Then I should see the validation message "Title cannot exceed 20 characters."
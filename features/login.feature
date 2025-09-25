Feature: User login
  As an authorized user
  I want to log in to the Books Inventory Application
  So that I can manage the books catalog

  Background:
    Given I am on the welcome page

  @login @reg
  Scenario: Successful login with valid credentials
    When I login with valid credentials
    Then I should see a welcome message with my username

  @login @negative @reg
  Scenario: Unsuccessful login with invalid credentials
    When I login with invalid credentials
    Then I should see an error message on the login page

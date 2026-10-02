Feature: Login

  Scenario: Successful login with valid credentials
    Given I am on the saucedemo login page
    When I enter username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page

  Scenario: Failed login with wrong password
    Given I am on the saucedemo login page
    When I enter username "standard_user" and password "wrongpassword"
    Then I should see an error message
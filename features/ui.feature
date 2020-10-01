Feature: 2048 UI
  As a gamer
  In order play 2048
  I need to see the board and at 2 2-bit numbers within

  Scenario: First visit
    Given I navigate to the main page
    When I inspect the header element
    Then I should see the title "2048"
    When I inspect the main element
    Then I should see a grid with 4 rows of 4 columns
    And I should see 1 or 2 randomly placed numbers in the grid
    And I should only see numbers that equal either 2 or 4
    And if I should see a 2 it will be colored "black"
    And if I should see a 4 it will be colored "red"
    When I inspect the footer element
    Then I should see "High Score" appears with the highest value in the grid
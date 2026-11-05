Feature: Meridian Sync component workbench
  As a Meridian interface developer
  I want every library item to have a real preview, code and tokens
  So that I can evaluate and reuse components without guessing their behavior

  Scenario: Explore a component visually
    Given the Meridian Sync catalog is open
    When I select a component
    Then I see a component-specific visual thumbnail
    And I see a functional Preview panel
    And I can switch the preview between light and dark surfaces

  Scenario: Inspect implementation
    Given a component is selected
    When I open the Code tab
    Then I see reusable TSX for that component
    And I can copy the code with one control
    And the install command uses shadcn or the Meridian GitHub registry

  Scenario: Inspect design tokens
    Given a component is selected
    When I open the Tokens tab
    Then I see the background, foreground, primary, border, muted and accent tokens

  Scenario: Respect reduced motion
    Given the operating system requests reduced motion
    When I interact with the preview
    Then the GPU spotlight is disabled
    And shimmer and non-essential transitions are disabled

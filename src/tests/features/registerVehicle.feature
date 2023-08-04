Feature: Register a vehicle

    @critical
    Scenario: I can register a vehicle
        Given a fleet
        And a vehicle
        When I register this vehicle into my fleet
        Then this vehicle should be part of my vehicle fleet

    Scenario: I can't register same vehicle twice
        Given another fleet
        And another vehicle
        And I have registered this vehicle into my fleet
        Then I try to register this vehicle again and should be informed this this vehicle has already been registered

     Scenario: Same vehicle can belong to more than one fleet
        Given a new fleet
        And the fleet of another user
        And a new vehicle
        And this vehicle has been registered into the other user's fleet
        When I register the vehicle into my fleet
        Then this vehicle should be part of both fleets
Feature: Park a vehicle

    Background:
        Given a new fresh fleet
        And a new fresh vehicle
        And I have registered this vehicle into my new fleet

    @critical
    Scenario: Successfully park a vehicle
        Given a location
        When I park my vehicle at this location
        Then the known location of my vehicle should verify this location

    Scenario: Can't localize my vehicle to the same location two times in a row
        Given a new location
        And my vehicle has been parked into this new location
        When I try to park my vehicle at this location and should be informed that my vehicle is already parked at this location
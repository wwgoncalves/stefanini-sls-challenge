const Employee = require("../../../../src/core/entity/Employee");

const employeeID = "f3fa1be1-086f-4dfa-b20b-38de2633ee5f";
const employeeName = "Lucas Roberto Martins";
const employeeAge = 47;
const employeePosition = "Software developer";

it("Should create an employee", () => {
    expect(
        () =>
            new Employee(
                employeeID,
                employeeName,
                employeeAge,
                employeePosition
            )
    ).not.toThrowError();
});

it("Should throw an error when an invalid employee would be created", () => {
    expect(
        () => new Employee("", employeeName, employeeAge, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeID, "", employeeAge, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeID, employeeName, 0, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeID, employeeName, -1, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeID, employeeName, employeeAge, "")
    ).toThrowError();
});

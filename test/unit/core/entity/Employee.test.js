const Employee = require("../../../../src/core/entity/Employee");

const employeeId = "f3fa1be1-086f-4dfa-b20b-38de2633ee5f";
const employeeName = "Lucas Roberto Martins";
const employeeAge = 47;
const employeePosition = "Software developer";

it("Should create an employee", () => {
    expect(
        () =>
            new Employee(
                employeeId,
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
        () => new Employee(employeeId, "", employeeAge, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeId, employeeName, 0, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeId, employeeName, -1, employeePosition)
    ).toThrowError();

    expect(
        () => new Employee(employeeId, employeeName, employeeAge, "")
    ).toThrowError();
});

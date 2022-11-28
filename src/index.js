"use strict";

const EmployeeController = require("./controller/EmployeeController");
const EmployeeDynamoDBRepository = require("./infra/repository/EmployeeDynamoDBRepository");

const buildResponseObject = (statusCode, body = undefined) => {
    if (body === undefined) {
        return { statusCode };
    } else {
        return {
            statusCode,
            body: JSON.stringify(body, null, 2),
        };
    }
};

module.exports.handle = async (event) => {
    const employeeRepository = new EmployeeDynamoDBRepository();
    const employeeController = new EmployeeController(employeeRepository);

    try {
        switch (event.requestContext.http.method) {
            case "POST":
                const employee = await employeeController.createEmployee(
                    JSON.parse(event.body)
                );
                return buildResponseObject(201, employee);

            case "GET":
                if (event.pathParameters && event.pathParameters.id) {
                    const employee = await employeeController.findEmployee(
                        event.pathParameters
                    );

                    if (employee) {
                        return buildResponseObject(200, employee);
                    } else {
                        return buildResponseObject(404);
                    }
                } else {
                    const employees = await employeeController.fetchEmployees();
                    return buildResponseObject(200, employees);
                }

            case "PUT":
                if (
                    event.pathParameters &&
                    event.pathParameters.id &&
                    event.body
                ) {
                    const employee = await employeeController.updateEmployee(
                        event.pathParameters,
                        JSON.parse(event.body)
                    );

                    if (employee) {
                        return buildResponseObject(200, employee);
                    } else {
                        return buildResponseObject(404);
                    }
                }
                break;

            case "DELETE":
                if (event.pathParameters && event.pathParameters.id) {
                    await employeeController.deleteEmployee(
                        event.pathParameters
                    );
                    return buildResponseObject(204);
                }
                break;
        }
    } catch (error) {
        return buildResponseObject(400, {
            message: error.message,
            input: event,
        });
    }
};

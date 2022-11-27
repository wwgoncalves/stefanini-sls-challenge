"use strict";

const EmployeeController = require("./controller/EmployeeController");
const EmployeeDynamoDBRepository = require("./infra/repository/EmployeeDynamoDBRepository");

const buildResponseObject = (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify(body, null, 2),
    };
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
                    return buildResponseObject(200, employee);
                } else {
                    const employees = await employeeController.fetchEmployees();
                    return buildResponseObject(200, employees || []);
                }
        }
    } catch (error) {
        return buildResponseObject(400, {
            message: error.message,
            input: event,
        });
    }
};

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
                const employeeCreated = await employeeController.createEmployee(
                    event.body
                );
                return buildResponseObject(201, employeeCreated);
        }
    } catch (error) {
        return buildResponseObject(400, {
            message: error.message,
            input: event,
        });
    }
};

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { v4: uuidv4 } = require("uuid");

const region = process.env.DYNAMODB_EMPLOYEE_TABLE_REGION;
const tableName = process.env.DYNAMODB_EMPLOYEE_TABLE_NAME;

module.exports = class EmployeeDynamoDBRepository {
    #client;

    constructor() {
        this.#client = new DynamoDBClient({ region });
    }

    getNextId() {
        return uuidv4();
    }

    async save(employee) {
        const input = {
            Item: marshall({
                id: employee.id,
                name: employee.name,
                age: employee.age,
                position: employee.position,
            }),
            TableName: tableName,
        };

        await this.#client.send(new PutItemCommand(input));
        return employee;
    }
};

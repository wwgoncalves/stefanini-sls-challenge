const {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    ScanCommand,
    UpdateItemCommand,
    DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");

const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { v4: uuidv4 } = require("uuid");

const Employee = require("../../core/entity/Employee");

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

    async findById(id) {
        const input = {
            Key: marshall({ id }),
            TableName: tableName,
        };

        const output = await this.#client.send(new GetItemCommand(input));
        if (output && output.Item) {
            const employeeInfo = unmarshall(output.Item);
            return new Employee(
                employeeInfo.id,
                employeeInfo.name,
                employeeInfo.age,
                employeeInfo.position
            );
        } else {
            return undefined;
        }
    }

    async findAll() {
        const employees = [];
        const input = {
            TableName: tableName,
        };

        let shouldScan = true;
        do {
            const output = await this.#client.send(new ScanCommand(input));
            output.Items.forEach((item) => {
                const employeeInfo = unmarshall(item);

                employees.push(
                    new Employee(
                        employeeInfo.id,
                        employeeInfo.name,
                        employeeInfo.age,
                        employeeInfo.position
                    )
                );
            });

            shouldScan = output.LastEvaluatedKey !== undefined;
        } while (shouldScan);

        return employees;
    }

    async update(employee) {
        const input = {
            Key: marshall({ id: employee.id }),
            TableName: tableName,
            UpdateExpression: "SET #name = :n, age = :a, #position = :p", // All fields are replaced
            ConditionExpression: "attribute_exists(id)",
            ExpressionAttributeNames: {
                // Because "name" and "position" are DynamoDB reserved words
                "#name": "name",
                "#position": "position",
            },
            ExpressionAttributeValues: {
                ":n": marshall(employee.name),
                ":a": marshall(employee.age),
                ":p": marshall(employee.position),
            },
            ReturnValues: "ALL_NEW",
        };

        try {
            const output = await this.#client.send(
                new UpdateItemCommand(input)
            );
            const employeeInfo = unmarshall(output.Attributes);
            return new Employee(
                employeeInfo.id,
                employeeInfo.name,
                employeeInfo.age,
                employeeInfo.position
            );
        } catch (error) {
            // If condition expression evaluates to false, i.e. employee id was not found
            return undefined;
        }
    }

    async deleteById(id) {
        const input = {
            Key: marshall({ id }),
            TableName: tableName,
        };

        await this.#client.send(new DeleteItemCommand(input));
    }
};

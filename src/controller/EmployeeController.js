const RegisterEmployee = require("../core/usecase/RegisterEmployee");

module.exports = class EmployeeController {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async createEmployee(body) {
        const bodyObject = JSON.parse(body);
        const registerEmployee = new RegisterEmployee(this.#employeeRepository);
        const employee = await registerEmployee.execute(
            bodyObject.nome,
            bodyObject.idade,
            bodyObject.cargo
        );

        return {
            id: employee.id,
            nome: employee.name,
            idade: employee.age,
            cargo: employee.position,
        };
    }
};

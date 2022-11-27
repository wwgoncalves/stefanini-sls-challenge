const RegisterEmployee = require("../core/usecase/RegisterEmployee");

module.exports = class EmployeeController {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async createEmployee(body) {
        const registerEmployee = new RegisterEmployee(this.#employeeRepository);
        const employee = await registerEmployee.execute(
            body.nome,
            body.idade,
            body.cargo
        );

        return {
            id: employee.id,
            nome: employee.name,
            idade: employee.age,
            cargo: employee.position,
        };
    }
};

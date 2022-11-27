const RegisterEmployee = require("../core/usecase/RegisterEmployee");
const FindEmployee = require("../core/usecase/FindEmployee");
const FetchAllEmployees = require("../core/usecase/FetchAllEmployees");

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

    async findEmployee(pathParams) {
        const findEmployee = new FindEmployee(this.#employeeRepository);
        const employeeId = pathParams.id;
        const employee = await findEmployee.execute(employeeId);

        return {
            id: employee.id,
            nome: employee.name,
            idade: employee.age,
            cargo: employee.position,
        };
    }

    async fetchEmployees() {
        const fetchAllEmployees = new FetchAllEmployees(
            this.#employeeRepository
        );
        let employees = await fetchAllEmployees.execute();

        employees = employees.map((employee) => ({
            id: employee.id,
            nome: employee.name,
            idade: employee.age,
            cargo: employee.position,
        }));

        return employees;
    }
};

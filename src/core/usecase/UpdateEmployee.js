const Employee = require("../entity/Employee");

module.exports = class UpdateEmployee {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute(id, name, age, position) {
        const employee = new Employee(id, name, age, position);
        return this.#employeeRepository.update(employee);
    }
};

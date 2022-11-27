const Employee = require("../entity/Employee");

module.exports = class RegisterEmployee {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute(name, age, position) {
        const employeeId = this.#employeeRepository.getNextId();
        const employee = new Employee(employeeId, name, age, position);

        return this.#employeeRepository.save(employee);
    }
};

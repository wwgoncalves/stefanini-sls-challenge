const Employee = require("../entity/Employee");

module.exports = class RegisterEmployee {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute(name, age, position) {
        const employeeID = this.#employeeRepository.getNextID();
        const employee = new Employee(employeeID, name, age, position);

        return this.#employeeRepository.save(employee);
    }
};

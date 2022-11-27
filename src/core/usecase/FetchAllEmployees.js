module.exports = class FetchAllEmployees {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute() {
        const employees = await this.#employeeRepository.findAll();
        return employees;
    }
};

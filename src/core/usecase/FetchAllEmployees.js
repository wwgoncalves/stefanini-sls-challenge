module.exports = class FetchAllEmployees {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute() {
        return this.#employeeRepository.findAll();
    }
};

module.exports = class FindEmployee {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute(employeeId) {
        const employee = await this.#employeeRepository.findById(employeeId);
        return employee;
    }
};

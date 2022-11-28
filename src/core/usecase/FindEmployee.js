module.exports = class FindEmployee {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute(employeeId) {
        return this.#employeeRepository.findById(employeeId);
    }
};

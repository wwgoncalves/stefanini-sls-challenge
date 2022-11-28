module.exports = class RemoveEmployee {
    #employeeRepository;

    constructor(employeeRepository) {
        this.#employeeRepository = employeeRepository;
    }

    async execute(employeeId) {
        await this.#employeeRepository.deleteById(employeeId);
    }
};

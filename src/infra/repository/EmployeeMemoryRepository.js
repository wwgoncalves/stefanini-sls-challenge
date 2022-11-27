const { v4: uuidv4 } = require("uuid");

module.exports = class EmployeeMemoryRepository {
    #employees = [];

    getNextId() {
        return uuidv4();
    }

    save(employee) {
        this.#employees.push(employee);
        return Promise.resolve(employee);
    }

    findById(id) {
        return Promise.resolve(
            this.#employees.find((employee) => employee.id === id)
        );
    }

    findAll() {
        return Promise.resolve(this.#employees);
    }

    update(employee) {
        const idx = this.#employees.findIndex((e) => e.id === employee.id);
        if (idx >= 0) {
            this.#employees.splice(idx, 1, employee);
            return Promise.resolve(employee);
        }
        return Promise.resolve();
    }

    deleteById(id) {
        const idx = this.#employees.findIndex((employee) => employee.id === id);
        if (idx >= 0) {
            this.#employees.splice(idx, 1);
        }
        return Promise.resolve();
    }
};

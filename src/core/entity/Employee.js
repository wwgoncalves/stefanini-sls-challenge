module.exports = class Employee {
    #id;
    #name;
    #age;
    #position;

    constructor(id, name, age, position) {
        if (!this.#validate(id, name, age, position)) {
            throw new Error("Invalid employee attributes.");
        }

        this.#id = id;
        this.#name = name;
        this.#age = age;
        this.#position = position;
    }

    #validate(id, name, age, position) {
        return id && name && age > 0 && position;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get age() {
        return this.#age;
    }

    get position() {
        return this.#position;
    }
};

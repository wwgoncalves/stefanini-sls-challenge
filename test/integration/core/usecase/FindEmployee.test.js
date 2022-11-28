const Employee = require("../../../../src/core/entity/Employee");
const FindEmployee = require("../../../../src/core/usecase/FindEmployee");
const EmployeeMemoryRepository = require("../../../../src/infra/repository/EmployeeMemoryRepository");

it("Should correctly find an employee", async () => {
    const employeeRepository = new EmployeeMemoryRepository();
    const findEmployee = new FindEmployee(employeeRepository);
    await employeeRepository.save(
        new Employee(
            "a7fa2be1-086f-4eya-b20b-81te2633ee5f",
            "Lúcia Mattos",
            38,
            "Diretora de Operações"
        )
    );

    let retrievedEmployee = await findEmployee.execute("an-fake-id");
    expect(retrievedEmployee).toBeUndefined();

    retrievedEmployee = await findEmployee.execute(
        "a7fa2be1-086f-4eya-b20b-81te2633ee5f"
    );
    expect(retrievedEmployee.name).toEqual("Lúcia Mattos");
    expect(retrievedEmployee.age).toEqual(38);
    expect(retrievedEmployee.position).toEqual("Diretora de Operações");
});

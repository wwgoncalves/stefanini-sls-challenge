const Employee = require("../../../../src/core/entity/Employee");
const UpdateEmployee = require("../../../../src/core/usecase/UpdateEmployee");
const EmployeeMemoryRepository = require("../../../../src/infra/repository/EmployeeMemoryRepository");

it("Should correctly update an employee", async () => {
    const employeeRepository = new EmployeeMemoryRepository();
    const updateEmployee = new UpdateEmployee(employeeRepository);
    await employeeRepository.save(
        new Employee(
            "a7fa2be1-086f-4eya-b20b-81te2633ee5f",
            "Luzia Matos",
            39,
            "Diretora de Operações"
        )
    );

    const updatedEmployee = await updateEmployee.execute(
        "a7fa2be1-086f-4eya-b20b-81te2633ee5f",
        "Lúcia Mattos",
        38,
        "Diretora de Operações"
    );
    expect(updatedEmployee.name).toEqual("Lúcia Mattos");
    expect(updatedEmployee.age).toEqual(38);
    expect(updatedEmployee.position).toEqual("Diretora de Operações");
});

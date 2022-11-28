const Employee = require("../../../../src/core/entity/Employee");
const RemoveEmployee = require("../../../../src/core/usecase/RemoveEmployee");
const EmployeeMemoryRepository = require("../../../../src/infra/repository/EmployeeMemoryRepository");

it("Should correctly remove an employee", async () => {
    const employeeRepository = new EmployeeMemoryRepository();
    const removeEmployee = new RemoveEmployee(employeeRepository);
    await employeeRepository.save(
        new Employee(
            "a7fa2be1-086f-4eya-b20b-81te2633ee5f",
            "Lúcia Mattos",
            38,
            "Diretora de Operações"
        )
    );
    let employees = await employeeRepository.findAll();
    expect(employees.length).toEqual(1);

    await removeEmployee.execute("a7fa2be1-086f-4eya-b20b-81te2633ee5f");

    employees = await employeeRepository.findAll();
    expect(employees.length).toEqual(0);
});

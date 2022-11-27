const RegisterEmployee = require("../../../../src/core/usecase/RegisterEmployee");
const EmployeeMemoryRepository = require("../../../../src/infra/repository/EmployeeMemoryRepository");

it("Should correctly register an employee", async () => {
    const employeeRepository = new EmployeeMemoryRepository();
    const registerEmployee = new RegisterEmployee(employeeRepository);

    const employee = await registerEmployee.execute(
        "Lúcia Mattos",
        38,
        "Diretora de Operações"
    );

    const retrievedEmployee = await employeeRepository.findById(employee.id);
    expect(retrievedEmployee.name).toEqual("Lúcia Mattos");
    expect(retrievedEmployee.age).toEqual(38);
    expect(retrievedEmployee.position).toEqual("Diretora de Operações");
});

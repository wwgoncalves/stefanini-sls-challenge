const Employee = require("../../../../src/core/entity/Employee");
const FetchAllEmployees = require("../../../../src/core/usecase/FetchAllEmployees");
const EmployeeMemoryRepository = require("../../../../src/infra/repository/EmployeeMemoryRepository");

it("Should correctly find an employee", async () => {
    const employeeRepository = new EmployeeMemoryRepository();
    const fetchAllEmployees = new FetchAllEmployees(employeeRepository);
    await employeeRepository.save(
        new Employee(
            "a7fa2be1-086f-4eya-b20b-81te2633ee5f",
            "Lúcia Mattos",
            38,
            "Diretora de Operações"
        )
    );
    await employeeRepository.save(
        new Employee(
            "a7f41e1-086f-5eya-b20b-815226526eefa",
            "Pedro Ramos",
            41,
            "Gerente de Vendas"
        )
    );
    await employeeRepository.save(
        new Employee(
            "a7az1e1-086f-067a-b20b-815221236eefc",
            "Mafalda Flores",
            33,
            "Gerente de Compras"
        )
    );

    const fetchedEmployees = await fetchAllEmployees.execute();
    expect(fetchedEmployees.length).toEqual(3);
});

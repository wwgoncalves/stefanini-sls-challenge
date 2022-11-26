# _Serverless Challenge_ (WIP)

> Solução AWS serverless para o processo seletivo da Stefanini.<br><br> _Desafio original disponível em: https://github.com/dornellas13/serverless-challenge_

## Decisões

### Uso do NoSQL DynamoDB como banco de dados

O banco de dados DynamoDB foi escolhido por dar flexibilidade ao schema, permitindo salvar dados no formato JSON praticamente de maneira direta, ser de fácil integração utilizando o AWS-SDK e muito utilizado em soluções serverless da AWS.

### Disponibilização da função lambda através de rotas configuradas no API Gateway

Como foi solicitado que apenas uma função lambda permitisse as operações de cadastro, consulta, atualização e deleção, e que estivesse exposta à Internet, foi escolhido disponibilizar rotas à ela através do API Gateway, como se tivéssemos uma REST API disponível.

### Uso do Serverless Framework para o deploy da solução e o provisionamento da infraestrutura na AWS

Por ser flexível a muitos provedores serverless e permitir o provisionamento "programável" de recursos das diversas nuvens, o Serverless Framework foi escolhido para o deploy da solução desenvolvida.

## Uso e evidências

> A solução está disponível para testes através da URL base **_`PREENCHER AQUI`_** e pode ser utilizada como uma REST API.

| Método   | Endpoint         | _Payload_                         | Descrição                                                        |
| -------- | ---------------- | --------------------------------- | ---------------------------------------------------------------- |
| `POST`   | `/employee`      | _Body\* em JSON_                  | Cadastra um funcionário. O ID criado no registro será retornado. |
| `GET`    | `/employee/{id}` | _Path parameter_                  | Consulta os dados de um funcionário, dado o seu ID.              |
| `GET`    | `/employee`      |                                   | Retorna todos os funcionários cadastrados.                       |
| `PUT`    | `/employee/{id}` | _Path parameter e body\* em JSON_ | Atualiza o cadastro completo de um funcionário, dado o seu ID.   |
| `DELETE` | `/employee/{id}` | _Path parameter_                  | Remove o cadastro de um funcionário, dado o seu ID.              |

### \*Exemplo de _body_ em JSON que deve ser passado a alguns endpoints:

```json
{
    "nome": "William Gonçalves",
    "idade": 35,
    "cargo": "Desenvolvedor de software"
}
```

**_TODO_** - _incluir imagens dos testes dos endpoints e das respostas, bem como do banco de dados na AWS._

## Como rodar este projeto

1. Ter uma conta na AWS;
2. Instalar o Serverless Framework, por exemplo através do comando `npm install -g serverless`;
3. Criar um usuário na AWS para o uso do Serverless Framework e registrar suas credenciais através do último, com o comando **_`PREENCHER AQUI`_**;
4. Revisar e/ou adaptar, através do arquivo `serverless.yml`, as variáveis de ambiente e os recursos configurados para o provisionamento no deploy;
5. Implantar a solução através do comando `serverless deploy`;
6. Testar os endpoints disponibilizados pela solução.

## Observações

1. Lembrando, o identificador do funcionário será gerado e atribuído no momento de sua criação e não deve ser passado no body JSON. O identificador é gerado através da biblioteca `uuid`, portanto é um identificador único do tipo _string_.
2. Para testar os endpoints criados na AWS, você pode usar as aplicações Postman ou Insomnia. Há também plataformas do tipo, para testes de endpoints, que rodam diretamente navegador.

## Importante

Embora a solução seja uma "prova de conceito" ao desafio, na maioria das vezes não é recomendado disponibilizar uma API para a gestão de recursos atrás de uma ou mais funções lambda. Dependendo do uso da API pode não ser o modelo ideal de arquitetura, o custo das execuções de tais funções pode se tornar muito oneroso e o cliente pode experimentar um delay maior no processamento de uma requisição, por exemplo em "cold starts" dependendo da configuração. Caso use esta solução como estudo/inspiração, leve esses pontos em consideração ao planejar soluções serverless que precisarão ser produtivas.

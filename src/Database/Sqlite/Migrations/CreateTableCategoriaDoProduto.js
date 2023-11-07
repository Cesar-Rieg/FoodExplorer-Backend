const CreateTableCategoriaDoProduto = `
CREATE TABLE IF NOT EXISTS CategoriaDoProduto (
    Id VARCHAR(36) UNIQUE PRIMARY KEY,
    Nome VARCHAR(80),
    DataDeCriacao TIMESTAMP, 
    DataDeAlteracao TIMESTAMP NULL,
    Excluido BIT DEFAULT 0,
    DataDeExclusao TIMESTAMP NULL
);

CREATE TEMPORARY TABLE IF NOT EXISTS __Migration_CategoriaDoProduto (
	Id VARCHAR(36) UNIQUE,
	Nome VARCHAR(80),
    DataDeCriacao TIMESTAMP
);

INSERT INTO __Migration_CategoriaDoProduto 
	(Id, Nome, DataDeCriacao)
VALUES
	('b8235c79-7d9f-4740-ba3c-5f9d53794f6f', 'Refeicao', '2023-11-06 23:48:59'),
	('e6cbbfff-4130-416d-bbe8-fd6236305855', 'Sobremesa', '2023-11-06 23:48:59'),
    ('2e49057e-a942-47f0-8ab2-8c024dae49bb', 'Bebida', '2023-11-06 23:48:59');
	
INSERT INTO CategoriaDoProduto 
	(Id, Nome, DataDeCriacao)
SELECT 
	Id, Nome, DataDeCriacao
FROM 
    __Migration_CategoriaDoProduto 
WHERE 
	NOT EXISTS (
				SELECT 1
				FROM 
                    CategoriaDoProduto
				WHERE 
                    CategoriaDoProduto.Id = __Migration_CategoriaDoProduto.Id
					AND CategoriaDoProduto.Nome = __Migration_CategoriaDoProduto.Nome
				);
	
DROP TABLE __Migration_CategoriaDoProduto;
`;

module.exports = CreateTableCategoriaDoProduto;
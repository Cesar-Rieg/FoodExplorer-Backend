const CreateTableProdutoInsumo = `
CREATE TABLE IF NOT EXISTS ProdutoInsumo (
    Id VARCHAR(36) UNIQUE PRIMARY KEY,
    ProdutoId VARCHAR(36) NOT NULL,
    Nome VARCHAR(80),
    DataDeCadastro TIMESTAMP, 
    UsuarioDeCadastroId VARCHAR(36) NOT NULL,
    DataDeAlteracao TIMESTAMP NULL,
    UsuarioDeAlteracaoId VARCHAR(36) NULL,
    Excluido BIT DEFAULT 0,
    DataDeExclusao TIMESTAMP NULL,
    UsuarioDeExclusaoId VARCHAR(36) NULL,

    FOREIGN KEY (ProdutoId) REFERENCES Produto(Id),
    FOREIGN KEY (UsuarioDeCadastroId) REFERENCES Usuario(Id),
    FOREIGN KEY (UsuarioDeAlteracaoId) REFERENCES Usuario(Id),
    FOREIGN KEY (UsuarioDeExclusaoId) REFERENCES Usuario(Id)
);
`;

module.exports = CreateTableProdutoInsumo;
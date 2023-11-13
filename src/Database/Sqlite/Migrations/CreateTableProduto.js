const CreateTableProduto = `
CREATE TABLE IF NOT EXISTS Produto (
    Id VARCHAR(36) UNIQUE PRIMARY KEY,
    Nome VARCHAR(80),
    Descricao VARCHAR(300),
    Preco DECIMAL(10, 2),
    CategoriaDoProdutoId VARCHAR(36) NOT NULL,
    ImagemId VARCHAR(36) NOT NULL,
    DataDeCadastro TIMESTAMP, 
    UsuarioDeCadastroId VARCHAR(36) NOT NULL,
    DataDeAlteracao TIMESTAMP NULL,
    UsuarioDeAlteracaoId VARCHAR(36) NULL,
    Excluido BIT DEFAULT 0,
    DataDeExclusao TIMESTAMP NULL,
    UsuarioDeExclusaoId VARCHAR(36) NULL,

    FOREIGN KEY (CategoriaDoProdutoId) REFERENCES CategoriaDoProduto(Id),
    FOREIGN KEY (ImagemId) REFERENCES Imagem(Id),
    FOREIGN KEY (UsuarioDeCadastroId) REFERENCES Usuario(Id),
    FOREIGN KEY (UsuarioDeAlteracaoId) REFERENCES Usuario(Id),
    FOREIGN KEY (UsuarioDeExclusaoId) REFERENCES Usuario(Id)
);
`;

module.exports = CreateTableProduto;
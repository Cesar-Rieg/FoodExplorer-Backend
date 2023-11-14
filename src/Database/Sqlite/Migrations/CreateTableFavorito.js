const CreateTableFavorito = `
CREATE TABLE IF NOT EXISTS Favorito (
    Id VARCHAR(36) UNIQUE PRIMARY KEY,
    ProdutoId VARCHAR(36) NOT NULL,
    UsuarioId VARCHAR(36) NOT NULL,
    DataDeCadastro TIMESTAMP NOT NULL,
    Excluido BIT DEFAULT 0,
    DataDeExclusao TIMESTAMP NULL,

    FOREIGN KEY (ProdutoId) REFERENCES Produto(Id),
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id)
);
`;

module.exports = CreateTableFavorito;
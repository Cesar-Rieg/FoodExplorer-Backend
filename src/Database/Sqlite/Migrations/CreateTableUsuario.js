const CreateTableUsuario = `
CREATE TABLE IF NOT EXISTS Usuario (
    Id VARCHAR(36) UNIQUE PRIMARY KEY,
    Nome VARCHAR(80),
    Email VARCHAR(80),
    Senha VARCHAR(160),
    ImagemId VARCHAR(36) NULL,
    PerfilDeUsuarioId VARCHAR(36) NOT NULL,
    DataDeCriacao TIMESTAMP, 
    DataDeAlteracao TIMESTAMP NULL,
    Excluido BIT DEFAULT 0,
	DataDeExclusao TIMESTAMP NULL,
	FOREIGN KEY (ImagemId) REFERENCES Imagem(Id),
    FOREIGN KEY (PerfilDeUsuarioId) REFERENCES PerfilDeUsuario(Id)
);
`;

module.exports = CreateTableUsuario;

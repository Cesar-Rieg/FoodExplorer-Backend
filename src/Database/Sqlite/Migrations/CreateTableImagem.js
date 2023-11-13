const CreateTableImagem = `
CREATE TABLE IF NOT EXISTS Imagem (
	Id VARCHAR(36) UNIQUE PRIMARY KEY,
	Discriminator VARCHAR(80),
	NomeDoArquivo VARCHAR(300),
	DataDeCadastro TIMESTAMP NOT NULL,
	UsuarioDeCadastroId VARCHAR(36) NOT NULL,
	DataDeAlteracao TIMESTAMP NULL,
	UsuarioDeAlteracaoId VARCHAR(36) NULL,
	Excluido BIT DEFAULT 0,
	DataDeExclusao TIMESTAMP NULL,
	UsuarioDeExclusaoId VARCHAR(36) NULL,

	FOREIGN KEY (UsuarioDeCadastroId) REFERENCES Usuario(Id),
    FOREIGN KEY (UsuarioDeAlteracaoId) REFERENCES Usuario(Id),
    FOREIGN KEY (UsuarioDeExclusaoId) REFERENCES Usuario(Id)
);
`;

module.exports = CreateTableImagem;
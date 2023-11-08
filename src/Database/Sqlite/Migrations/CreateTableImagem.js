const CreateTableImagem = `
CREATE TABLE IF NOT EXISTS Imagem (
	Id VARCHAR(36) UNIQUE PRIMARY KEY,
	Discriminator VARCHAR(80),
	NomeDoArquivo VARCHAR(300)
);
`;

module.exports = CreateTableImagem;
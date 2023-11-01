const CreateTablePerfilDeUsuario = `
CREATE TABLE IF NOT EXISTS PerfilDeUsuario (
    Id VARCHAR(36) UNIQUE PRIMARY KEY,
    Discriminator VARCHAR(80)
);

CREATE TEMPORARY TABLE IF NOT EXISTS __Migration_PerfilDeUsuario (
	Id VARCHAR(36) UNIQUE,
	Discriminator VARCHAR(80)
);

INSERT INTO __Migration_PerfilDeUsuario 
	(Id, Discriminator)
VALUES
	('b982b92d-34f7-4751-9a23-81aed1db715b', 'Administrador'),
	('fa70dfe0-d88a-4699-953f-7b6a389818b1', 'Cliente');
	
INSERT INTO PerfilDeUsuario 
	(Id, Discriminator)
SELECT 
	Id, Discriminator
FROM 
	__Migration_PerfilDeUsuario 
WHERE 
	NOT EXISTS (
				SELECT 1
				FROM 
					PerfilDeUsuario
				WHERE 
					PerfilDeUsuario.Id = __Migration_PerfilDeUsuario.Id
					AND PerfilDeUsuario.Discriminator = __Migration_PerfilDeUsuario.Discriminator
				);
	
DROP TABLE __Migration_PerfilDeUsuario;
`;

module.exports = CreateTablePerfilDeUsuario;
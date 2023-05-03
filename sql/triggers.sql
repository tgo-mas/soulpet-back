-- use soulpet_db;
-- drop trigger backup_clientes;
-- drop trigger backup_enderecos;
-- SHOW TRIGGERS LIKE 'backup_enderecos';
-- SHOW TRIGGERS LIKE 'backup_clientes';
-- SHOW TRIGGERS;

select * from clientes;
select * from enderecos;
select * from clientes_backup;
select * from enderecos_backup;

-- CRIAÇÃO TABELA DE BACKUP DE CLIENTES:
CREATE TABLE clientes_backup (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(255) NOT NULL,
  deletedAt timestamp default NOW(),
  PRIMARY KEY (id)
);

-- CRIAÇÃO TABELA DE BACKUP DE ENDEREÇOS:
CREATE TABLE enderecos_backup (
  id INT(11) NOT NULL AUTO_INCREMENT,
  clienteId int(11) not null,
  uf VARCHAR(2) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  rua VARCHAR(255) NOT NULL,
  numero VARCHAR(255) NOT NULL,
  deletedAt timestamp default NOW(),
  PRIMARY KEY (id)
  );

-- CRIAÇÃO TABELA DE BACKUP DE PETS:
  create table pets_backup (
 id INT(11) NOT NULL AUTO_INCREMENT,
 clienteId int(11) not null,
 nome varchar(130) not null,
 tipo varchar(100) not null,
 porte varchar(100) not null,
 dataNasc date,
 primary key (id)
 );

-- TRIGGER ACIONADA AO DELETAR CLIENTES
DELIMITER $$

CREATE TRIGGER backup_clientes
BEFORE DELETE ON clientes
FOR EACH ROW
BEGIN
  INSERT INTO clientes_backup (nome, email, telefone)
  VALUES (OLD.nome, OLD.email, OLD.telefone);
END$$

DELIMITER ;

-- TRIGGER ACIONADA AO EDITAR CLIENTES
DELIMITER $$

CREATE TRIGGER backup_clientes_update
BEFORE UPDATE ON clientes
FOR EACH ROW
BEGIN
  INSERT INTO clientes_backup (nome, email, telefone)
  VALUES (OLD.nome, OLD.email, OLD.telefone);
END$$

DELIMITER ;

-- TRIGGER ACIONADA AO DELETAR ENDEREÇOS - nao funciona sem que seja criada uma procedure.
DELIMITER $$

CREATE TRIGGER backup_enderecos
BEFORE DELETE ON enderecos
FOR EACH ROW
BEGIN
  INSERT INTO enderecos_backup (clienteId, uf, cidade, cep, rua, numero)
  VALUES (OLD.clienteId, OLD.uf, OLD.cidade, OLD.cep, OLD.rua, OLD.numero);
END$$

DELIMITER ;

-- TRIGGER ACIONADA AO EDITAR ENDEREÇO
DELIMITER $$
CREATE TRIGGER backup_enderecos_update
BEFORE UPDATE ON enderecos
FOR EACH ROW
BEGIN
  INSERT INTO enderecos_backup (clienteId, uf, cidade, cep, rua, numero)
  VALUES (OLD.clienteId, OLD.uf, OLD.cidade, OLD.cep, OLD.rua, OLD.numero);
END$$

DELIMITER ;

-- TRIGGER ACIONADA AO DELETAR PETS
DELIMITER $$

CREATE TRIGGER backup_pets
BEFORE DELETE ON pets
FOR EACH ROW
BEGIN
  INSERT INTO pets_backup (clienteId, nome, tipo, porte, dataNasc)
  VALUES (OLD.clienteId, OLD.nome, OLD.tipo, OLD.porte, OLD.dataNasc);
END$$

DELIMITER ;

-- TRIGGER ACIONADA AO EDITAR PETS
DELIMITER $$

CREATE TRIGGER backup_pets_update
BEFORE update ON pets
FOR EACH ROW
BEGIN
  INSERT INTO pets_backup (clienteId, nome, tipo, porte, dataNasc)
  VALUES (OLD.clienteId, OLD.nome, OLD.tipo, OLD.porte, OLD.dataNasc);
END$$

DELIMITER ;
-- 1. Tabela 'imagens'
-- Deve ser criada primeiro, pois outras tabelas dependem de 'idimagem'.
CREATE TABLE imagens (
    idimagem INT PRIMARY KEY,
    imagem VARCHAR(255) NOT NULL,
    homeimagem VARCHAR(255)
);

-- 2. Tabela 'trilhas'
CREATE TABLE trilhas (
    idtrilha INT PRIMARY KEY,
    trilha VARCHAR(100) NOT NULL,
    observacao TEXT,
    idimagem INT,
    FOREIGN KEY (idimagem) REFERENCES imagens(idimagem)
);

-- 3. Tabela 'parques'
CREATE TABLE parques (
    idparque INT PRIMARY KEY,
    parque VARCHAR(100) NOT NULL,
    horarioinicio TIME,
    horariofim TIME,
    observacao TEXT,
    idimagem INT,
    idtrilha INT,
    FOREIGN KEY (idimagem) REFERENCES imagens(idimagem),
    FOREIGN KEY (idtrilha) REFERENCES trilhas(idtrilha)
);

-- 4. Tabela 'usuarios'
CREATE TABLE usuarios (
    idusuario INT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- O tamanho 255 é para armazenar o hash da senha
    isadministrador BOOLEAN DEFAULT FALSE,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE
);

-- 5. Tabela 'eventos'
-- Depende de 'idimagem'. Note que o campo 'idimagem' está como INT (não null) no seu diagrama.
CREATE TABLE eventos (
    idevento INT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    datainicio DATE NOT NULL,
    datafim DATE,
    horarioinicio TIME,
    horariofim TIME,
    idimagem INT,
    FOREIGN KEY (idimagem) REFERENCES imagens(idimagem)
);

-- 6. Tabela 'avaliacao'
-- Depende de 'idusuario'.
CREATE TABLE avaliacao (
    idavaliacao INT PRIMARY KEY,
    idusuario INT,
    avaliacao VARCHAR(255),
    estrelas INT CHECK (estrelas >= 1 AND estrelas <= 5), -- Garante que as estrelas sejam entre 1 e 5
    FOREIGN KEY (idusuario) REFERENCES usuarios(idusuario)
);
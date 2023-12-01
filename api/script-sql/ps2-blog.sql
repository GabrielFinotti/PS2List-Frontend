--
-- Estrutura para tabela `usr`
--
CREATE TABLE `usr` (
  `id` int(11) NOT NULL,
  `usr` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `psw` varchar(12) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Índices de tabela `usr`
--
ALTER TABLE
  `usr`
ADD
  PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabela `usr`
--
ALTER TABLE
  `usr`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

COMMIT;

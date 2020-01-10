CREATE TABLE `grupos_usuarios_lineas` (  
  `grupoUsuarioLineaId` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de línea',
  `usuarioId` INT COMMENT 'Usuario asociado a ese grupo',
  PRIMARY KEY (`grupoUsuarioLineaId`),
  CONSTRAINT `ref_gulinea_usu` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuarioId`)
);

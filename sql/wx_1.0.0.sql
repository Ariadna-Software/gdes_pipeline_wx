CREATE TABLE `grupos_usuarios_lineas` (  
  `grupoUsuarioLineaId` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de línea',
  `usuarioId` INT COMMENT 'Usuario asociado a ese grupo',
  PRIMARY KEY (`grupoUsuarioLineaId`),
  CONSTRAINT `ref_gulinea_usu` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuarioId`)
);

ALTER TABLE `grupos_usuarios_lineas`   
	ADD COLUMN `grupoUsuarioId` INT(11) NULL COMMENT 'Grupo al que pertenecen la línea' AFTER `grupoUsuarioLineaId`,
  ADD CONSTRAINT `ref_gulinea_gu` FOREIGN KEY (`grupoUsuarioId`) REFERENCES `grupos_usuarios`(`grupoUsuarioId`);

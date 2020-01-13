# v 1.0.1
CREATE TABLE `grupos_usuarios_lineas` (  
  `grupoUsuarioLineaId` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del registro de línea',
  `usuarioId` INT COMMENT 'Usuario asociado a ese grupo',
  PRIMARY KEY (`grupoUsuarioLineaId`),
  CONSTRAINT `ref_gulinea_usu` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuarioId`)
);

ALTER TABLE `grupos_usuarios_lineas`   
	ADD COLUMN `grupoUsuarioId` INT(11) NULL COMMENT 'Grupo al que pertenecen la línea' AFTER `grupoUsuarioLineaId`,
  ADD CONSTRAINT `ref_gulinea_gu` FOREIGN KEY (`grupoUsuarioId`) REFERENCES `grupos_usuarios`(`grupoUsuarioId`);

# v 1.0.2
# la tabla de ubicaciones ya está creada? // Pues si si que está

ALTER TABLE `ofertas`   
	ADD COLUMN `ubicacionId` INT(11) NULL AFTER `fechaConversionOportunidad`,
  ADD CONSTRAINT `oft_ubicaciones` FOREIGN KEY (`ubicacionId`) REFERENCES `ubicaciones`(`ubicacionId`);

INSERT INTO ubicaciones (nombre)
SELECT DISTINCT ubicacion FROM ofertas WHERE NOT ubicacion IS NULL;
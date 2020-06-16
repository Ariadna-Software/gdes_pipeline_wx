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

UPDATE ofertas, ubicaciones SET ofertas.ubicacionId = ubicaciones.ubicacionId WHERE ubicaciones.nombre = ofertas.ubicacion;

UPDATE ofertas SET importeUTE = 0 WHERE importeUTE IS NULL;
UPDATE ofertas SET margenContribucion = 0 WHERE margenContribucion IS NULL;
UPDATE ofertas SET importeContribucion = 0 WHERE importeContribucion IS NULL;
UPDATE ofertas SET importeInversion = 0 WHERE importeInversion IS NULL;

INSERT INTO versiones (numVersion, ofertaId, fechaCambio, importePresupuesto, importeUTE, importeTotal, margenContribucion, importeContribucion, 
importeAnual, importePrimerAno, importeInversion, divisaId, multiplicador)
SELECT 
0, ofertaId, fechaOferta, importePresupuesto, importeUTE, importeTotal, margenContribucion, importeContribucion, 
importeAnual, importePrimerAno, importeInversion, divisaId, multiplicador
FROM ofertas WHERE ofertaId IN
(
SELECT ofertaId FROM ofertas WHERE ofertaId NOT IN (SELECT DISTINCT ofertaId FROM versiones)
);

UPDATE ofertas SET `version` = 0 WHERE `version` IS NULL;

DELETE FROM seguidores;

ALTER TABLE `ofertas`   
	CHANGE `probabilidad` `probabilidad` DECIMAL(5,2) NULL;

ALTER TABLE `ubicaciones`   
	ADD COLUMN `latitud` DOUBLE NULL AFTER `nombre`,
	ADD COLUMN `longitud` DOUBLE NULL AFTER `latitud`;

UPDATE usuarios SET
  grupoUsuarioId = NULL,
  grupoUsuarioId2 = NULL,
  grupoUsuarioId3 = NULL,
  grupoUsuarioId4 = NULL,
  grupoUsuarioId5 = NULL,
  grupoUsuarioId6 = NULL,
  grupoUsuarioId7 = NULL;

DELETE FROM grupos_usuarios WHERE
grupoUsuarioId NOT IN 
(SELECT DISTINCT grupoUsuarioId FROM grupos_usuarios_lineas);
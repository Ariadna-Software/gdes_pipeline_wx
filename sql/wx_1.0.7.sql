ALTER TABLE `ofertas`   
	ADD COLUMN `implicaTecnologico` VARCHAR(255) NULL AFTER `ubicacionId`,
	ADD COLUMN `importeMaxLicitacion` DECIMAL(12,2) NULL AFTER `implicaTecnologico`,
	ADD COLUMN `tasaRetorno` DECIMAL(5,2) NULL AFTER `importeMaxLicitacion`,
	ADD COLUMN `payBack` DECIMAL(12,2) NULL AFTER `tasaRetorno`,
	ADD COLUMN `laboral` BOOL NULL AFTER `payBack`,
	ADD COLUMN `finanzas` BOOL NULL AFTER `laboral`,
	ADD COLUMN `codigoOp` VARCHAR(255) NULL AFTER `finanzas`,
	ADD COLUMN `fechaComite` DATE NULL AFTER `codigoOp`;

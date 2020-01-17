CREATE TABLE `ofertas_hitos` (  
  `ofertaHitoid` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del hito de oferta',
  `ofertaId` INT(11) COMMENT 'Clave a la oferta relacionda',
  `fecha` DATE COMMENT 'Fecha en la que se produce el hito de facturación',
  `importe` DECIMAL(12,2) COMMENT 'Importe para ese hito',
  `importeDivisa` DECIMAL(12,2) COMMENT 'Importe en la divisa que se trate',
  `divisaId` INT(11) COMMENT 'Clave referencial a la divisa',
  `factor` DECIMAL(5,2) COMMENT 'Factor aplicable a la divisa en su conversión a euros',
  PRIMARY KEY (`ofertaHitoid`),
  CONSTRAINT `ref_hito_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `ofertas`(`ofertaId`),
  CONSTRAINT `ref_hito_divisa` FOREIGN KEY (`divisaId`) REFERENCES `divisas`(`divisaId`)
);

ALTER TABLE `versiones` DROP FOREIGN KEY `ref_version_oferta`;

ALTER TABLE `versiones` ADD CONSTRAINT `ref_version_oferta` FOREIGN KEY (`ofertaId`) REFERENCES `ofertas`(`ofertaId`) ON DELETE CASCADE;
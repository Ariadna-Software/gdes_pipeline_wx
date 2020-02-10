ALTER TABLE `ofertas`   
	ADD COLUMN `usuResponsableId` INT(11) NULL AFTER `importeMaxLicitacionDivisa`,
  ADD CONSTRAINT `oft_usuResp` FOREIGN KEY (`usuResponsableId`) REFERENCES `usuarios`(`usuarioId`);

UPDATE ofertas SET usuResponsableId = usuarioId;

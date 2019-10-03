ALTER TABLE `gdes_pipeline_dev`.`usuarios`   
	ADD COLUMN `grupoUsuarioId2` INT(11) NULL COMMENT 'Identificador de pertenecia al segundo  grupo' AFTER `veInformes`,
	ADD COLUMN `grupoUsuarioId3` INT(11) NULL COMMENT 'Identificador de pertenencia al tercer grupo' AFTER `grupoUsuarioId2`,
  ADD CONSTRAINT `usuarios_grupos2` FOREIGN KEY (`grupoUsuarioId2`) REFERENCES `gdes_pipeline_dev`.`grupos_usuarios`(`grupoUsuarioId`),
  ADD CONSTRAINT `usuarios_grupos3` FOREIGN KEY (`grupoUsuarioId3`) REFERENCES `gdes_pipeline_dev`.`grupos_usuarios`(`grupoUsuarioId`);

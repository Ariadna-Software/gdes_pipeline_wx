ALTER TABLE
    `usuarios`
ADD
    COLUMN `grupoUsuarioId4` INT(11) NULL COMMENT 'Identificador de pertenecia al segundo  grupo',
ADD
    COLUMN `grupoUsuarioId5` INT(11) NULL COMMENT 'Identificador de pertenencia al tercer grupo',
ADD
    COLUMN `grupoUsuarioId6` INT(11) NULL COMMENT 'Identificador de pertenecia al segundo  grupo',
ADD
    COLUMN `grupoUsuarioId7` INT(11) NULL COMMENT 'Identificador de pertenencia al tercer grupo',
ADD
    CONSTRAINT `usuarios_grupos4` FOREIGN KEY (`grupoUsuarioId4`) REFERENCES `grupos_usuarios`(`grupoUsuarioId`),
ADD
    CONSTRAINT `usuarios_grupos5` FOREIGN KEY (`grupoUsuarioId5`) REFERENCES `grupos_usuarios`(`grupoUsuarioId`),
ADD
    CONSTRAINT `usuarios_grupos6` FOREIGN KEY (`grupoUsuarioId6`) REFERENCES `grupos_usuarios`(`grupoUsuarioId`),
ADD
    CONSTRAINT `usuarios_grupos7` FOREIGN KEY (`grupoUsuarioId7`) REFERENCES `grupos_usuarios`(`grupoUsuarioId`);
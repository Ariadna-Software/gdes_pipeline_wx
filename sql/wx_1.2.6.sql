ALTER TABLE `ubicaciones`   
	ADD COLUMN `latitud` DOUBLE NULL AFTER `nombre`,
	ADD COLUMN `longitud` DOUBLE NULL AFTER `latitud`;

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
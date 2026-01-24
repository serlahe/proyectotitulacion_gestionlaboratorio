Generación de contraseñas (usuarios de prueba):

El proyecto incluye un archivo `hash.js` que permite generar contraseñas encriptadas usando bcrypt.

Generar hashes de contraseña:

node hash.js

Copiar los hashes generados en consola.

Insertar los usuarios en MySQL reemplazando El_hash_generado:



INSERT INTO usuario 
(nombre_completo, correo, password_hash, id_rol, activo)
VALUES
('Administrador Sistema', 'admin@lab.cl',
'El_hash_generado', 1, 1),

('Tecnólogo Médico', 'tecnologo@lab.cl',
'El_hash_generado', 2, 1),

('Técnico de Laboratorio', 'tecnico@lab.cl',
'El_hash_generado', 3, 1);




Iniciar el sistema y acceder con los correos definidos y las contraseñas usadas al generar los hashes.

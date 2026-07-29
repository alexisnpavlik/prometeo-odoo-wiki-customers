# Uso de Caja y Perfil de Solo Lectura

Para garantizar la seguridad en las operaciones de caja, Prometeo Odoo incluye un perfil de **Cajero de Solo Lectura**.

## ¿Qué es el perfil de Solo Lectura?

Es una configuración de usuario diseñada específicamente para quienes operan la caja, pero que no tienen autorización para alterar las reglas de negocio base.

### Lo que PUEDE hacer un Cajero de Solo Lectura:
*   Abrir y cerrar la sesión de caja.
*   Escanear o buscar productos y agregarlos al ticket.
*   Cobrar órdenes con los medios de pago configurados (Efectivo, Tarjetas, etc.).
*   Emitir el ticket o factura electrónica.

### Lo que NO PUEDE hacer (requiere aprobación):
*   Aplicar descuentos manuales fuera de los límites permitidos.
*   Modificar el precio unitario de un producto directamente.
*   Procesar devoluciones complejas sin autorización.
*   Realizar ajustes manuales de inventario desde la interfaz del POS.

## Cómo saber si tienes este perfil
Si intentas realizar una acción restringida, el sistema te mostrará un mensaje indicando que necesitas **Aprobación de Supervisor** o que no tienes los permisos necesarios (`pos_user_readonly`). En ese momento, deberás solicitar a un encargado que ingrese su PIN o apruebe la operación de forma remota.

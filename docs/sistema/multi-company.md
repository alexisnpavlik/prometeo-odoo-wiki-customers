# Uso del Entorno Multi-Compañía

Prometeo Odoo está preparado para gestionar múltiples empresas dentro de la misma base de datos de forma segura.

## Aislamiento Lógico y Visual

Trabajar con varias compañías conlleva el riesgo de cargar una factura o un recibo en la empresa equivocada. Para evitarlo, implementamos dos grandes controles:

### 1. Colores por Compañía (`web_company_color`)
La barra superior del sistema cambiará de color dependiendo de la compañía en la que te encuentres activo.
*   *Ejemplo:* Azul para "Empresa Matriz S.A." y Verde para "Sucursal Norte S.R.L.".
*   Esto proporciona una alerta visual inmediata al usuario antes de que ingrese cualquier transacción.

### 2. Bloqueo de Compañía Única (`web_single_company`)
En una configuración estándar de Odoo, un usuario puede seleccionar múltiples compañías a la vez (con las casillas de verificación en la esquina superior derecha) y ver los datos mezclados.
Con Prometeo, esto se restringe. Un usuario solo puede tener **una única compañía activa** a la vez en su entorno visual.
*   Si necesita trabajar en la Empresa B, debe desmarcar la Empresa A y marcar la Empresa B.
*   Esto asegura que los reportes, facturas y pagos jamás mezclen información por accidente.

## Permisos de Acceso
Recuerda que solo verás en el selector superior aquellas compañías a las que el administrador del sistema te haya dado acceso en tu perfil de usuario.

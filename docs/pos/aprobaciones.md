# Aprobaciones de Supervisores en el POS

Existen situaciones excepcionales en la caja donde se requiere aplicar un descuento especial, cancelar un pago o procesar una devolución. Para mantener la seguridad sin frenar la operación, Prometeo utiliza el módulo de **Aprobación Especial (`pos_special_approval_omax`)**.

## ¿Cómo funciona el proceso de aprobación?

1.  **El cajero intenta una acción restringida:** Por ejemplo, el cajero intenta aplicar un 20% de descuento a un producto (cuando su límite es del 5%).
2.  **Pantalla de Autorización:** El sistema bloquea la acción temporalmente y muestra una ventana de "Se requiere aprobación".
3.  **Intervención del Supervisor:** 
    *   Un supervisor o gerente debe acercarse a la caja e ingresar su PIN de seguridad o escanear su credencial.
    *   Alternativamente (si está configurado), la aprobación puede enviarse remotamente para que el gerente la apruebe desde su propio dispositivo.
4.  **Acción Liberada:** Una vez ingresado el código correcto, el cajero puede completar la operación (el descuento se aplica o la devolución se procesa).

### Casos típicos que requieren aprobación
*   **Descuentos:** Superar el porcentaje máximo de descuento permitido.
*   **Devoluciones:** Aceptar la devolución de un producto de alto valor.
*   **Cambio de Precios:** Modificar el precio de lista de un artículo de forma manual en el ticket.

Este sistema asegura que todas las excepciones queden registradas a nombre del supervisor que las autorizó.

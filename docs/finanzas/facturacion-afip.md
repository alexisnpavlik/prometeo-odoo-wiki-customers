# Facturación Electrónica (AFIP)

Prometeo Odoo está completamente integrado con los servicios de **AFIP** (`pyafipws`) para la emisión de comprobantes electrónicos con validez legal.

## Flujo Básico de Facturación

1.  **Crear la Factura:** Desde el módulo de Facturación o automáticamente desde un Pedido de Venta o el Punto de Venta.
2.  **Validar Datos del Cliente:** El sistema verifica automáticamente el **CUIT** y la condición de IVA del cliente (Responsable Inscripto, Monotributista, Consumidor Final, etc.).
3.  **Tipo de Comprobante:** Odoo seleccionará automáticamente el tipo de factura correspondiente (A, B, C o M) basándose en tu condición fiscal y la del cliente.
4.  **Confirmar y Obtener CAE:** Al confirmar la factura, el sistema se comunica con AFIP en tiempo real. Si la operación es exitosa, AFIP devuelve el **CAE (Código de Autorización Electrónico)** y su fecha de vencimiento, que quedarán impresos en el PDF de la factura.

## Consideraciones Importantes

*   **Certificados Digitales:** El sistema gestiona las conexiones internamente. Si obtienes un error de "Certificado Vencido", deberás contactar a soporte técnico para renovar tus credenciales en AFIP.
*   **Caída del Sistema AFIP:** Si el servidor de AFIP no responde, la factura quedará en estado de borrador o error temporal. Podrás reintentar la validación más tarde sin perder la información.
*   **Notas de Crédito:** Si cometes un error en una factura validada, **no podrás borrarla ni modificarla**. Deberás emitir una Nota de Crédito Electrónica para anularla contablemente y luego emitir una nueva factura.

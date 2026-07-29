# Automatización de Costos

Mantener el costo de los productos actualizado es esencial para tener márgenes de ganancia reales. 
Prometeo automatiza esta tarea mediante el módulo `purchase_auto_update_cost`.

## ¿Cómo funciona la actualización de costos?

Cuando realizas un pedido de compra a un proveedor, negocias un precio. Sin embargo, el costo de tu inventario no cambia inmediatamente.

1.  **Recepción de la Mercadería:** Cuando el camión llega a tu depósito y validas el remito de recepción (Albarán) en Odoo, el sistema entra en acción.
2.  **Actualización Automática:** El sistema toma el precio al que compraste los productos en ese pedido específico y actualiza automáticamente el campo "Costo" en la ficha del producto.
3.  **Impacto:** Todas las ventas futuras tomarán este nuevo costo para calcular tu rentabilidad.

## Casos a tener en cuenta
*   Si validas un remito parcialmente (recibes solo la mitad de los productos), el costo se actualizará de todas formas basado en el precio de compra.
*   Este método es ideal para empresas que utilizan el método de costeo "Estándar" o "Promedio", asegurando que el dato del costo siempre refleje la última compra real.

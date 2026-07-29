# Operaciones Inter-Compañía

Si tu empresa opera con múltiples razones sociales o sucursales legalmente separadas dentro del mismo sistema Odoo, mover mercadería de una a otra requiere documentación respaldatoria (una le vende a la otra).

## Generación en Espejo (Mirror Orders)

Prometeo agiliza este proceso mediante el módulo `purchase_sale_stock_inter_company`.

Cuando la **Compañía A** le vende productos a la **Compañía B**:
1.  **La Compañía A crea un Pedido de Venta:** Selecciona a la Compañía B como cliente y agrega los productos.
2.  **Creación Automática:** Al confirmar la venta, Odoo crea automáticamente, en modo "espejo", un **Pedido de Compra** en la Compañía B, donde el proveedor es la Compañía A.
3.  **Movimiento de Stock Sincronizado:** Al validar la salida de mercadería (Remito de Entrega) en la Compañía A, se puede configurar para que automáticamente valide la recepción (Remito de Entrada) en la Compañía B.

Esto elimina el doble ingreso de datos y evita errores, asegurando que si 10 unidades salieron de A, 10 unidades ingresen exactamente a B.

## 1.1 Enviar mercadería al Depósito Central (Remitos de Salida)

Para realizar un envío de mercadería desde tu sucursal hacia el Depósito Central, sigue estos pasos:

1. **Ingresar al Resumen de Inventario**: Selecciona el módulo **Inventario** en el panel de Odoo para abrir el tablero principal.
   
   ![Paso 1: Resumen de Inventario](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/1.png)

2. **Desplegar menú de Operaciones**: En la barra superior de Odoo, haz clic sobre el menú **Operaciones**.
   
   ![Paso 2: Menú de Operaciones](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/2.png)

3. **Seleccionar Entregas**: En la lista desplegable del menú, haz clic en la opción **Entregas**.

4. **Crear Nuevo Remito**: En la esquina superior izquierda del listado, haz clic en el botón **Nuevo** para abrir un formulario vacío.
   
   ![Paso 4: Crear Nuevo Remito](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/3.png)

5. **Ingresar Dirección de Entrega**: Haz clic en el campo **Dirección de entrega** y escribe o selecciona **Deposito central**.
   
   ![Paso 5: Ingresar Dirección de Entrega](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/4.png)

6. **Habilitar Línea de Productos**: En la pestaña *Operaciones* del formulario, haz clic sobre el enlace **Agregar una línea**.

7. **Buscar Producto por Código**: Haz clic en la celda de Producto y tipea los dígitos del código interno o de barras del artículo (ej. **80619**). Selecciónalo en las sugerencias del menú.
   
   ![Paso 7: Buscar Producto por Código](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/5.png)

8. **Buscar Producto por Nombre**: En la siguiente línea, puedes buscar digitando el nombre (ej. **Sombrilla**) y seleccionando el ítem correspondiente de la lista.
   
   ![Paso 8: Buscar Producto por Nombre](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/6.png)

9. **Cargar Cantidad a Despachar**: En la columna **Demanda**, digita las cantidades físicas que vas a enviar (ej. **15** y **2**).
   
   ![Paso 9: Cargar Cantidad a Despachar](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/7.png)

10. **Guardar Manualmente**: Haz clic en el ícono de la nube en la barra de botones superior (**Guardar de forma manual**) para guardar los cambios. El remito quedará registrado como **Borrador**.
    
    ![Paso 10: Guardar Manualmente](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/8.png)

11. **Comprobar Número de Remito**: El sistema guardará el borrador y le asignará una referencia de remito definitiva (ej. **IM/OUT/00048**).
    
    ![Paso 11: Comprobar Número de Remito](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/9.png)

12. **Reservar Unidades (Marcar como por Realizar)**: Haz clic en el botón **Marcar como por realizar** en la esquina superior izquierda del remito.

13. **Confirmar Reserva de Stock (Disponible)**: Odoo reservará las unidades físicas de tu stock y cambiará el estado del remito a **Disponible**. Autocompletará la columna **Cantidad** según el inventario físico disponible.
    
    ![Paso 13: Confirmar Reserva de Stock](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/10.png)

14. **Incluir en el Paquete (Opcional)**: Si deseas empaquetar físicamente los productos en una caja o bulto cerrado en el sistema, presiona el botón **Incluir en el paquete** abajo a la derecha.
    
    ![Paso 14: Incluir en el Paquete](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/11.png)

15. **Validar la Entrega**: Cuando la mercadería esté lista para salir con el transportista, haz clic en el botón **Validar** en la parte superior izquierda.

16. **Confirmación de Salida (Estado Hecho)**: El remito pasará a estado **Hecho**, descontando de inmediato las unidades del stock físico de tu sucursal. Quedará registrada la **Fecha efectiva** del despacho.
    
    ![Paso 16: Confirmación de Salida](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/12.png)

17. **Descargar PDF de Remito**: Haz clic en el botón **Imprimir** para descargar automáticamente el remito de salida oficial en PDF (*Recibo de entrega - Deposito central - IM_OUT_00048.pdf*).
    
    ![Paso 17: Descargar PDF de Remito](../assets/Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/13.png)

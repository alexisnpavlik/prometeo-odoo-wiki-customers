# Conteo de Stock por Código de Barras

Contar el inventario con planilla y lapicera es lento y se presta a errores de transcripción.
Prometeo incorpora el módulo `stock_count_barcode`, que te permite recorrer el local o el depósito
escaneando los productos **con la cámara del teléfono** y aplicar las diferencias al inventario en
un solo paso.

## ¿Dónde se encuentra?

En el módulo **Inventario**, menú **Operaciones → Conteos de stock**.

Cada conteo es una **sesión**: un registro con una ubicación, un responsable y la lista de productos
que se fueron escaneando. Las sesiones se numeran automáticamente (ej. **CONTEO/00012**).

## Cómo hacer un conteo

1.  **Crear la sesión:** Entra a *Conteos de stock* y presiona **Nuevo**.
2.  **Elegir la ubicación:** Selecciona la **Ubicación** que vas a contar (por ejemplo, el stock de
    tu sucursal). El campo **Contado por** se completa solo con tu usuario y no se puede cambiar:
    queda como registro de quién hizo el conteo.
3.  **Escanear productos:** Presiona el botón **Escanear producto** para abrir la cámara y apuntar al
    código de barras del artículo. Si estás en una PC sin cámara, o usas un lector láser USB, escribe
    o dispara el código en el campo **Código de barras** y presiona **Cargar** (o Enter).
4.  **Cargar la cantidad real:** Después de cada escaneo se abre una ventana con el nombre del
    producto. Ahí escribes la **cantidad física que contaste** y presionas **Confirmar**. La ventana
    también te muestra la cantidad que el sistema cree tener, para que compares en el momento.
5.  **Revisar la lista:** En la pestaña **Conteo** ves todas las líneas cargadas con tres columnas:
    **Contado** (lo que contaste), **Sistema** (lo que Odoo tiene registrado) y **Diferencia**. Las
    diferencias distintas de cero aparecen resaltadas en rojo. Puedes corregir la cantidad contada
    directamente en la lista mientras la sesión esté en **Borrador**.
6.  **Aplicar el conteo:** Cuando terminaste, presiona **Aplicar**. El sistema pide una confirmación
    y luego ajusta el inventario con las cantidades que contaste. La sesión pasa a estado
    **Aplicado** y se registra la fecha.

## Puntos importantes

### El conteo es siempre parcial

Solo se ajustan los productos que escaneaste. **Lo que no escaneas no se toca**: nunca se pone en
cero un producto por el hecho de no haberlo encontrado. Esto te permite contar una góndola, una
categoría o un puñado de artículos sin arriesgar el resto del inventario.

### Si un producto ya fue escaneado, se reutiliza su línea

Escanear dos veces el mismo artículo no duplica la línea: se abre nuevamente la misma, con el total
ya cargado, para que decidas si lo corriges o lo dejas como está.

### Productos que el conteo no puede ajustar

Algunos productos se rechazan a propósito, para no generar un ajuste incorrecto. En esos casos la
línea queda marcada con un mensaje en la columna **Error** y **el resto del conteo se aplica igual**:

### Un conteo aplicado no se modifica

Una vez aplicado, el conteo queda **sellado**: no se pueden editar sus líneas, ni borrarlo, ni
volverlo a borrador. Es el registro de qué se contó, cuándo y quién lo hizo. Si detectas un error,
**se corrige haciendo un conteo nuevo**.

Las sesiones **canceladas** sí se pueden reabrir con **Volver a borrador**, y las sesiones en
borrador se pueden eliminar.

### La ubicación y la empresa se bloquean al cargar la primera línea

Una vez que la sesión tiene productos escaneados no se puede cambiar la ubicación ni la empresa,
porque las cantidades ya fueron contadas contra ese lugar. Si te equivocaste, cancela la sesión y
crea una nueva.

## Permisos

*   **Crear una sesión y escanear productos:** requiere el permiso *Inventario / Usuario*.
*   **Aplicar el conteo:** requiere *Inventario / Administrador*. Un usuario común carga el conteo y
    un responsable lo revisa y lo aplica. Si intentas aplicar sin el permiso, el sistema te avisa que
    debes pedírselo a un responsable.

En instalaciones multi-compañía, cada usuario solo ve los conteos de las empresas a las que tiene
acceso.

## Requisitos para usar la cámara

*   Desde el celular, ingresa a Odoo por la dirección habitual de tu empresa.

## Búsquedas y filtros

El listado de conteos incluye filtros rápidos por **Borrador**, **Aplicados** y **Mis conteos**, y
agrupaciones por **Ubicación**, **Usuario** y **Estado**. En cada fila ves cuántos productos se
contaron y cuántos tuvieron diferencia, lo que permite detectar de un vistazo los conteos que
generaron ajustes.

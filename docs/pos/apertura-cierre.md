## 2.1 Apertura de Caja e Inicio de Sesión
1. En la ventana principal, haz clic en **Punto de Venta**.
2. Ubica la caja registradora asignada a tu sucursal (ej. *Caja Principal* o *Caja 2*) y haz clic en **Nueva Sesión**.
3. **Control de Apertura**: Odoo solicitará el saldo inicial de caja. Cuenta el efectivo físico disponible en el cajón de monedas y billetes, digítalo en el sistema y haz clic en **Abrir Sesión**.

---

## 2.4 Cierre de Caja y Arqueo Diario

Al finalizar la jornada laboral, el cajero responsable de la sucursal debe cerrar la sesión del Punto de Venta realizando el siguiente procedimiento:

1. **Salir del POS**: En la barra superior derecha, presiona **Cerrar** y confirma la salida del Punto de Venta.
2. **Cerrar Sesión**: Volverás al tablero de control principal de Odoo. En la tarjeta de tu caja, haz clic en el botón rojo **Cerrar**.
3. **Arqueo de Valores**:
   * Odoo te mostrará el monto en efectivo teórico que debería haber en caja basado en el saldo inicial y las ventas cobradas en efectivo.
   * Cuenta físicamente los billetes y monedas que se encuentran en el cajón de dinero.
   * Haz clic en el campo de **Dinero real en caja** e ingresa la cantidad física total.
4. **Declarar diferencias**:
   * Si el monto físico coincide con el teórico, la diferencia será `0.00`.
   * Si existe un sobrante o faltante, digita el monto real y Odoo creará un asiento de ajuste por diferencia de caja de forma automática.
5. **Cierre de Caja definitivo**: Presiona el botón **Cerrar sesión y publicar asientos**. La caja quedará bloqueada y los movimientos contables serán enviados a auditoría central.

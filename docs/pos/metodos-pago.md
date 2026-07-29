## 2.3 Guía de Procesamiento de los 16 Métodos de Pago

A continuación se detalla cómo procesar el cobro utilizando cada uno de los 16 medios de pago habilitados. Cada método cuenta con un icono específico en el panel de pagos del POS:

### 1. Cobro en Efectivo
* ![Efectivo](../assets/iconos/efectivo.jpg) **Efectivo**
* ![Efectivo Caja 2](../assets/iconos/efectivo_c2.jpg) **Efectivo Caja 2** (Para operaciones en la caja secundaria)
* **Procedimiento**:
  1. Selecciona el botón **Efectivo** (o **Efectivo C2** si trabajas en la segunda caja).
  2. Digita el monto en efectivo entregado por el cliente usando el teclado numérico.
  3. El sistema calculará el vuelto a entregar en la esquina superior derecha (*Vuelto*).
  4. Presiona **Validar** para emitir el ticket fiscal y abrir el cajón físico.

---

### 2. Cobros con Tarjetas de Débito
* ![Débito](../assets/iconos/debito.jpg) **Débito (Genérico)**
* ![Tarjeta Débito](../assets/iconos/tarjeta_debito.jpg) **Tarjeta Débito (Posnet)**
* **Procedimiento**:
  1. Selecciona el método de pago correspondiente.
  2. Pasa la tarjeta del cliente por la terminal Posnet/Lapopos física de la sucursal.
  3. Una vez aprobada la transacción en la terminal física, escribe las últimas 4 cifras del comprobante impreso en el campo de **Referencia** en Odoo.
  4. Presiona **Validar** en Odoo para archivar el cobro.

---

### 3. Cobros con Tarjetas de Crédito y Planes Locales
* ![Tarjetas Crédito](../assets/iconos/tarjetas_credito.jpg) **Tarjetas de Crédito**
* ![Visa](../assets/iconos/visa.jpg) **Visa Crédito**
* ![Tarjeta Naranja](../assets/iconos/tarjeta_naranja.jpg) **Tarjeta Naranja**
* ![Tarjeta Tuya](../assets/iconos/tarjeta_tuya.jpg) **Tarjeta Tuya (Banco del Chaco)**
* **Procedimiento**:
  1. Selecciona el botón de la tarjeta específica según la marca del plástico del cliente.
  2. Procesa el pago en el Posnet físico seleccionando las cuotas correspondientes (Plan Z, 1 pago, o cuotas fijas).
  3. Registra en el campo de entrada de texto de Odoo el **Número de cupón** y el **Monto con recargo** de ser necesario.
  4. Presiona **Validar** para consolidar el ticket.

---

### 4. Cobros Digitales y QR
* ![MercadoPago](../assets/iconos/mercadopago.jpg) **MercadoPago**
* **Procedimiento**:
  1. Selecciona el botón **MercadoPago**.
  2. Muestra al cliente el código QR de cobro de la sucursal (en pantalla o impreso).
  3. El cliente escanea el QR desde su celular y confirma la transacción.
  4. **Verificación de Seguridad Obligatoria**: Antes de continuar en Odoo, verifica en el teléfono/tablet de la sucursal que el pago ingresó de forma efectiva y que el nombre del pagador coincide con el cliente.
  5. En Odoo, digita el número de **Operación de MercadoPago** y haz clic en **Validar**.

---

### 5. Transferencias y Operaciones Bancarias
* ![Banco](../assets/iconos/banco.jpg) **Banco / Transferencia**
* **Procedimiento**:
  1. Entrega los datos del CBU/Alias bancario de la empresa al cliente para que realice la transferencia bancaria inmediata.
  2. Solicita el comprobante digital o físico emitido por la entidad bancaria del cliente.
  3. Confirma el ingreso en el Home Banking de la empresa si posees acceso o solicita la confirmación telefónica al Depósito Central.
  4. En Odoo, selecciona el botón **Banco** e introduce en la referencia el número de transacción bancaria. Presiona **Validar**.

---

### 6. Financiación Especial y Créditos Personales
* ![Credicompras](../assets/iconos/credicompras.jpg) **Credicompras**
* ![Go Cuotas](../assets/iconos/go_cuotas.jpg) **Go Cuotas (Débito en Cuotas)**
* ![Neacred](../assets/iconos/neacred.jpg) **Neacred**
* ![Planes Ahora Cabal](../assets/iconos/planes_ahora_cabal.jpg) **Planes Ahora Cabal**
* **Procedimiento**:
  1. Selecciona el método de financiación correspondiente.
  2. Ingresa a la plataforma externa del proveedor de crédito (ej. portal de Go Cuotas o Neacred).
  3. Ingresa el DNI y celular del cliente en la plataforma externa para autorizar el cobro en cuotas.
  4. Una vez aprobado el crédito en el portal externo, vuelve a Odoo, escribe el código de autorización otorgado por la plataforma en el campo de referencia de Odoo, y presiona **Validar**.

---

### 7. Cheques
* ![Cheque](../assets/iconos/cheque.jpg) **Cheque**
* **Procedimiento**:
  1. Haz clic en **Cheque** en el POS.
  2. Inspecciona físicamente el documento de cheque. Asegúrate de verificar firmas, montos en números y letras, y la fecha de cobro futura.
  3. En la referencia del pago en Odoo, registra los datos vitales: **Banco de origen + Número de Cheque + CUIT del firmante**.
  4. Presiona **Validar** para cerrar la venta. Guarda el cheque físico en la caja fuerte de la sucursal.

---

### 8. Venta A Crédito (Cuenta Corriente)
* ![Cuenta Cliente](../assets/iconos/cuenta_cliente.jpg) **Cuenta Cliente (Cuenta Corriente)**
* **Procedimiento**:
  1. **Requisito indispensable**: Asegúrate de haber asociado previamente un Cliente en el paso 2.2.
  2. Presiona el botón **Cuenta Cliente**.
  3. Odoo verificará si el cliente posee un límite de crédito aprobado y saldo disponible suficiente para cubrir la venta.
  4. Si cumple los requisitos, presiona **Validar**. La compra se cargará al saldo deudor de la ficha del cliente en Odoo para su posterior facturación y cobro mensual.

---

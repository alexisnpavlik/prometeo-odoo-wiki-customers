# Cuenta Corriente de Clientes (Fiado)

El módulo de Cuenta Corriente te permite entregar mercadería a clientes de confianza sin que paguen en el momento, llevando un registro claro de cuánto te deben, cuándo vencen sus cuotas y cuánto ya te pagaron. No reemplaza a la facturación electrónica: es un registro interno de "fiado" independiente de la contabilidad fiscal.

## Habilitar un cliente para fiado

Antes de poder registrarle un retiro a un cliente, alguien con permisos de administración debe habilitarlo:

1. Abrí la ficha del **Contacto**.
2. En la pestaña **"Cuenta corriente"**, tildá **"Habilitado para cuenta corriente"**.

A partir de ahí, ese contacto va a aparecer disponible al cargar un retiro, y vas a poder ver su saldo, su vencido y su saldo a favor directamente en su ficha.

## Registrar un retiro

Menú **Cuenta Corriente → Retiros → Nuevo**:

1. Elegí el **Contacto** (solo aparecen los habilitados).
2. Cargá la fecha y, en la pestaña **Líneas**, los productos, cantidades y precios. El total se calcula solo.
3. Mientras el retiro está en **Borrador** podés editar todo con libertad.

### Confirmar

Al apretar **Confirmar** se abre una ventana donde:

* Ves el saldo actual del cliente, para saber con qué te está llegando.
* Elegís cómo se cobra: al contado en cuenta (una sola cuota) o en cuotas fijas, con la cantidad, la periodicidad y el día de vencimiento que prefieras.
* Si el cliente tiene un límite de crédito configurado y el retiro lo supera, el sistema te avisa (o directamente no te deja seguir, según cómo esté configurado ese cliente).

Al confirmar se generan las cuotas y se prepara la salida de mercadería del depósito. **El stock todavía no se descontó.**

### Validar la entrega

Una vez confirmado el retiro, aparece el botón **"Validar entrega"**. Usalo en el momento en que la mercadería efectivamente sale del local — ahí sí se descuenta del inventario.

Separar "Confirmar" de "Validar entrega" te permite generar la deuda y las cuotas en un momento, y despachar la mercadería en otro, sin que se pisen.

## Cobrar

Menú **Cuenta Corriente → Pagos → Nuevo**:

1. Elegí la cuenta del cliente, la fecha, el monto y el medio de pago (efectivo, descuento en salario, transferencia, cheque, tarjeta, u otro).
2. Apretá **Publicar**.

El pago se aplica automáticamente a la cuota más antigua que tenga pendiente, sin importar de qué retiro sea. Si el pago no alcanza para cubrir una cuota completa, esa cuota queda marcada como parcial. Si el pago sobra, el excedente queda guardado como **saldo a favor** del cliente, listo para aplicarse a su próximo retiro.

## Consultar saldos y vencimientos

* **Cuenta Corriente → Cuotas por vencer**: el listado de todo lo que hay que cobrar, ordenado por fecha de vencimiento — ideal para el seguimiento diario de cobranza.
* **Cuenta Corriente → Resumen de cuenta**: generá un PDF con el detalle de retiros, cuotas y pagos de un cliente a una fecha determinada, para entregárselo o archivarlo.
* En la ficha de cada contacto habilitado vas a ver siempre su saldo actual, su saldo vencido y su saldo a favor.

Un retiro solo figura como **"Pagado"** cuando se cancelaron absolutamente todas sus cuotas — mientras quede aunque sea un peso pendiente en alguna cuota, va a seguir mostrando "Pago parcial", para que nunca se pierda de vista una deuda que sigue viva.

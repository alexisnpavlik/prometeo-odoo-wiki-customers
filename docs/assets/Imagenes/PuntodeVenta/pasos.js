if (!window.dodoManuals) window.dodoManuals = {};

window.dodoManuals['pos_medios_pago'] = {
  title: "Módulo Punto de Venta (POS)",
  subtitle: "Punto de Venta / Guía Completa de Operación",
  description: "Guía interactiva paso a paso para operar el POS: apertura de caja, búsqueda de productos, descuentos, cobros con cada medio de pago y cierre de caja.",
  basePath: "Imagenes/PuntodeVenta/",

  sections: [

    /* ══════════════════════════════════════════════
       1. APERTURA DEL PUNTO DE VENTA
    ══════════════════════════════════════════════ */
    {
      number: "1",
      title: "Apertura del punto de venta",
      subsections: [
        {
          number: "1.1",
          title: "Abrir caja registradora",
          steps: [
            {
              number: "1.1.1",
              title: "Abrir caja registradora",
              text: "Ingresa al Módulo <strong>Punto de Venta</strong> → Haz clic en <strong>Nueva Sesión</strong> → Digita el saldo en efectivo de apertura del cajón físico de dinero y presiona <strong>Abrir Sesión</strong>.",
              imageFile: "1. Apertura del punto de venta/1.1 Abrir caja registradora/1.png",
              marker: { top: "40%", left: "55%", text: "1.1.1" },
              actionText: "Introduce el saldo inicial y abre la sesión de caja"
            }
          ]
        },
        {
          number: "1.2",
          title: "Control de apertura",
          steps: [
            {
              number: "1.2.1",
              title: "Control de apertura — Pantalla principal",
              text: "Una vez abierta la sesión verás la pantalla táctil del POS. A la izquierda se muestra la <strong>Orden de Venta</strong> y a la derecha el <strong>Catálogo de Productos</strong>. En la parte superior encontrarás la barra de búsqueda y los controles de cliente y pago.",
              imageFile: "1. Apertura del punto de venta/1.2 Control de apertura/2.png",
              marker: { top: "15%", left: "50%", text: "1.2.1" },
              actionText: "Familiarízate con la pantalla principal antes de comenzar"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       2. BÚSQUEDA Y SELECCIÓN DE PRODUCTOS
    ══════════════════════════════════════════════ */
    {
      number: "2",
      title: "Búsqueda y selección de productos",
      subsections: [
        {
          number: "2.1",
          title: "Búsqueda por código de barras",
          steps: [
            {
              number: "2.1.1",
              title: "Búsqueda por código de barras",
              text: "Escanea el código de barras del producto con el lector. El sistema lo reconocerá automáticamente y lo agregará a la <strong>Orden de Venta</strong> de inmediato.",
              imageFile: "2. Búsqueda y selección de productos/2.1 Búsqueda por código de barras/3.png",
              marker: { top: "12%", left: "50%", text: "🔍" },
              actionText: "Escanea el código de barras para agregar el producto"
            }
          ]
        },
        {
          number: "2.2",
          title: "Búsqueda por últimos números",
          steps: [
            {
              number: "2.2.1",
              title: "Búsqueda por últimos números del código",
              text: "Escribe los <strong>últimos 4 números del código de barras</strong> (o la cantidad de dígitos que corresponda) en la barra de búsqueda. El sistema filtrará los productos que coincidan. Selecciona el correcto para agregarlo a la orden.",
              imageFile: "2. Búsqueda y selección de productos/2.2 Búsqueda por últimos números/3.2.png",
              marker: { top: "10%", left: "50%", text: "2.2.1" },
              actionText: "Ingresa los últimos 4 dígitos del código para buscar"
            }
          ]
        },
        {
          number: "2.3",
          title: "Búsqueda por nombre",
          steps: [
            {
              number: "2.3.1",
              title: "Búsqueda por nombre del producto",
              text: "Escribe el <strong>nombre del producto</strong> en la barra de búsqueda. A medida que escribes, el catálogo filtra los resultados en tiempo real. Haz clic en el producto para agregarlo a la orden.",
              imageFile: "2. Búsqueda y selección de productos/2.3 Búsqueda por nombre/3.1.png",
              marker: { top: "10%", left: "50%", text: "2.3.1" },
              actionText: "Escribe el nombre y selecciona el producto"
            },
            {
              number: "2.3.2",
              title: "Información del producto (ícono ℹ)",
              text: "En la parte superior del producto aparece el símbolo <strong>ℹ</strong>. Al hacer clic se abre una ventana con el <strong>precio</strong>, <strong>inventario</strong> y <strong>unidades disponibles</strong>. Presiona <strong>De acuerdo</strong> o <strong>✕</strong> para cerrar.",
              imageFile: "2. Búsqueda y selección de productos/2.3 Búsqueda por nombre/3.3.png",
              marker: { top: "8%", left: "75%", text: "ℹ" },
              actionText: "Clic en ℹ para consultar detalles del producto"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       3. ADICIÓN DE PRODUCTOS A LA ORDEN DE PAGO
    ══════════════════════════════════════════════ */
    {
      number: "3",
      title: "Adición de productos a la orden de pago",
      subsections: [
        {
          number: "3.1",
          title: "Adición de productos a la orden de pago",
          steps: [
            {
              number: "3.1.1",
              title: "Agregar producto a la orden",
              text: "Al escanear el código de barras o hacer clic en el producto del catálogo, el sistema lo agrega a la <strong>Orden de Venta</strong>. Cada escaneo o clic adicional suma una unidad más al mismo producto.",
              imageFile: "3. Adición de productos a la orden de pago/3.1.png",
              marker: { top: "30%", left: "20%", text: "3.1.1" },
              actionText: "Escanea o clica el producto para agregarlo a la orden"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       4. MODIFICACIÓN DE CANTIDADES EN LA ORDEN DE PAGO
    ══════════════════════════════════════════════ */
    {
      number: "4",
      title: "Modificación de cantidades en la orden de pago",
      subsections: [
        {
          number: "4.1",
          title: "Modificar cantidad del producto en la orden de pago",
          steps: [
            {
              number: "4.1.1",
              title: "Reducir cantidad con permiso del encargado",
              text: "Selecciona el producto en la orden → marca en el teclado la cantidad a <strong>retirar</strong> → aparece la ventana de <strong>validación de permiso</strong>. El encargado escanea su tarjeta de código de acceso. La cantidad se ajusta automáticamente.",
              imageFile: "4. Modificación de cantidades en la orden de pago/4.1 Modificar cantidad del producto en la orden de pago/4.1.png",
              marker: { top: "35%", left: "50%", text: "4.1.1" },
              actionText: "Solicita al encargado que escanee el código de permiso"
            }
          ]
        },
        {
          number: "4.2",
          title: "Retirar producto de la orden de pago",
          steps: [
            {
              number: "4.2.1",
              title: "Retirar producto (marcar en 0)",
              text: "Si el cliente ya no quiere un producto: selecciona el producto → escribe <strong>0</strong> en el teclado → aparece la ventana de <strong>validación de permiso</strong>. El encargado escanea el código. El producto quedará en 0 unidades y no se contará en el total.",
              imageFile: "4. Modificación de cantidades en la orden de pago/4.2 Retirar producto de la orden de pago/4.2.png",
              marker: { top: "35%", left: "50%", text: "0" },
              actionText: "Marca 0 y el encargado aprueba la eliminación"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       5. APLICACIÓN DE DESCUENTOS
    ══════════════════════════════════════════════ */
    {
      number: "5",
      title: "Aplicación de descuentos",
      subsections: [
        {
          number: "5.1",
          title: "Descuento global",
          steps: [
            {
              number: "5.1.1",
              title: "Aplicar descuento global",
              text: "Haz clic en el botón <strong>Descuento</strong> → avisa al encargado para que escanee el código de permiso. En la ventana «Porcentaje de descuento» aparece <strong>10%</strong> por defecto; presiona <strong>Enter</strong> para aplicarlo, o escribe el porcentaje deseado antes de confirmar.",
              imageFile: "5. Aplicación de descuentos/5.1 Descuento global/5.png",
              marker: { top: "45%", left: "35%", text: "%" },
              actionText: "Aplica el descuento global con permiso del encargado"
            },
            {
              number: "5.1.2",
              title: "Ventana de permiso para descuento",
              text: "Aparece la ventana de <strong>validación de permiso</strong>. El encargado escanea la tarjeta de código de barras de acceso para habilitar el descuento. Una vez aprobado, el campo de porcentaje se activa para ingresar el valor.",
              imageFile: "5. Aplicación de descuentos/5.1 Descuento global/5.a.png",
              marker: { top: "40%", left: "50%", text: "🔑" },
              actionText: "El encargado escanea el código de permiso para habilitar el descuento"
            }
          ]
        },
        {
          number: "5.2",
          title: "Descuento sobre un producto",
          steps: [
            {
              number: "5.2.1",
              title: "Aplicar descuento sobre un producto",
              text: "Selecciona el producto en la orden → clic en el botón <strong>%</strong> → el encargado aprueba con el código de permiso → ingresa el porcentaje (ej. 50). Debajo de las unidades aparecerá el <strong>50% de descuento</strong> aplicado solo a ese producto.",
              imageFile: "5. Aplicación de descuentos/5.2 Descuento sobre un producto/5.1.png",
              marker: { top: "50%", left: "25%", text: "5.2.1" },
              actionText: "El descuento se aplica únicamente al producto seleccionado"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       6. MEDIOS DE PAGO
    ══════════════════════════════════════════════ */
    {
      number: "6",
      title: "Medios de pago",
      subsections: [
        {
          number: "6.1",
          title: "Cobro en efectivo",
          steps: [
            {
              number: "6.1.1",
              title: "Seleccionar efectivo e ingresar monto",
              text: "Con todos los productos en la orden, haz clic en el botón <strong>Pago</strong>. Selecciona <strong>Efectivo</strong>. Ingresa cuánto entrega el cliente; el sistema calcula el <strong>Cambio</strong> automáticamente. Verifica el vuelto y presiona <strong>Validar</strong>.",
              imageFile: "6. Medios de pago/6.1 Cobro en efectivo/6.1.1.png",
              marker: { top: "30%", left: "15%", text: "$" },
              actionText: "Ingresa el monto, revisa el cambio y valida"
            },
            {
              number: "6.1.2",
              title: "Confirmación del cobro en efectivo",
              text: "Tras validar, el sistema muestra la pantalla de <strong>pago exitoso</strong> con la factura para consumidor anónimo. Haz clic en <strong>Nueva Orden</strong> para iniciar una nueva venta.",
              imageFile: "6. Medios de pago/6.1 Cobro en efectivo/6.1.1.png",
              marker: { top: "40%", left: "50%", text: "6.1.2" },
              actionText: "Verifica el cambio, haz clic en Validar y luego en Nueva Orden"
            }
          ]
        },
        {
          number: "6.2",
          title: "Cobro con tarjeta de crédito",
          steps: [
            {
              number: "6.2.1",
              title: "Seleccionar tarjeta de crédito",
              text: "Haz clic en <strong>Pago</strong> → selecciona <strong>Tarjeta de Crédito</strong> en los medios de pago.",
              imageFile: "6. Medios de pago/6.2 Cobro con tarjeta de crédito/8.png",
              marker: { top: "25%", left: "15%", text: "💳" },
              actionText: "Selecciona Tarjeta de Crédito"
            },
            {
              number: "6.2.2",
              title: "Seleccionar cantidad de cuotas",
              text: "Haz clic en el botón <strong>Cuotas</strong> → elige la cantidad de cuotas del plan que corresponda → haz clic en <strong>De acuerdo</strong>.",
              imageFile: "6. Medios de pago/6.2 Cobro con tarjeta de crédito/8.a.png",
              marker: { top: "35%", left: "50%", text: "6.2.2" },
              actionText: "Selecciona las cuotas y confirma con De acuerdo"
            },
            {
              number: "6.2.3",
              title: "Verificar recargo y plan de cuotas",
              text: "Aparecerá el <strong>recargo de las cuotas</strong> calculado automáticamente. Verifica que el plan sea el correcto antes de continuar.",
              imageFile: "6. Medios de pago/6.2 Cobro con tarjeta de crédito/8.b.png",
              marker: { top: "35%", left: "50%", text: "6.2.3" },
              actionText: "Verifica el recargo y el plan antes de pasar la tarjeta"
            },
            {
              number: "6.2.4",
              title: "Pasar tarjeta en Posnet y agregar referencia",
              text: "Pasa la tarjeta del cliente en la terminal <strong>Posnet</strong>. En el campo <strong>Referencia de pago</strong> ingresa los <strong>últimos números de la transacción</strong> que muestra el comprobante del Posnet.",
              imageFile: "6. Medios de pago/6.2 Cobro con tarjeta de crédito/8.c.png",
              marker: { top: "55%", left: "30%", text: "6.2.4" },
              actionText: "Pasa la tarjeta y carga la referencia de la transacción"
            },
            {
              number: "6.2.5",
              title: "Validar el pago con tarjeta",
              text: "Con la referencia de la transacción cargada, haz clic en el botón <strong>Validar</strong> para confirmar el pago en el sistema.",
              imageFile: "6. Medios de pago/6.2 Cobro con tarjeta de crédito/8.d.png",
              marker: { top: "80%", left: "80%", text: "✓" },
              actionText: "Clic en Validar para confirmar el pago"
            },
            {
              number: "6.2.6",
              title: "Pago exitoso — Nueva orden",
              text: "Aparecerá la pantalla de <strong>pago exitoso</strong> con la factura generada. Haz clic en <strong>Nueva Orden</strong> para volver a la pantalla principal y continuar vendiendo.",
              imageFile: "6. Medios de pago/6.2 Cobro con tarjeta de crédito/8.e.png",
              marker: { top: "50%", left: "50%", text: "✅" },
              actionText: "Clic en Nueva Orden para continuar vendiendo"
            }
          ]
        },
        {
          number: "6.3",
          title: "Cobro con tarjeta de débito y billeteras digitales",
          steps: [
            {
              number: "6.3.1",
              title: "Cobro con MercadoPago o débito",
              text: "Haz clic en <strong>Pago</strong> → selecciona <strong>MercadoPago</strong> o <strong>Débito</strong>. En el campo <strong>Referencia de pago</strong> ingresa el alias de la transferencia o el ID de la operación. Haz clic en <strong>Validar</strong>.",
              imageFile: "6. Medios de pago/6.3 Cobro con tarjeta de débito y billeteras digitales/9.png",
              marker: { top: "30%", left: "15%", text: "QR" },
              actionText: "Agrega el alias o ID en la referencia y valida"
            }
          ]
        },
        {
          number: "6.4",
          title: "Cobro con 2 métodos de pago",
          steps: [
            {
              number: "6.4.1",
              title: "Pago combinado con 2 métodos",
              text: "Es posible dividir el pago entre dos métodos. Selecciona el primer método e ingresa el monto parcial; luego selecciona el segundo e ingresa el resto. Haz clic en <strong>Validar</strong> cuando ambos montos cubran el total.",
              imageFile: "6. Medios de pago/6.4 Cobro con 2 métodos de pago/6.4.png",
              marker: { top: "40%", left: "50%", text: "6.4.1" },
              actionText: "Divide el pago entre dos métodos y valida"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       7. TICKET DE VENTA
    ══════════════════════════════════════════════ */
    {
      number: "7",
      title: "Ticket de venta",
      subsections: [
        {
          number: "7.1",
          title: "Pago Exitoso",
          steps: [
            {
              number: "7.1.1",
              title: "Pago exitoso y ticket de venta",
              text: "Tras validar el cobro, el sistema muestra la pantalla de <strong>pago exitoso</strong> con el ticket de venta. Haz clic en <strong>Nueva Orden</strong> para iniciar una nueva venta, o en <strong>Imprimir</strong> si el cliente necesita comprobante físico.",
              imageFile: "7. Ticket de venta/7.1 Pago Exitoso/ticket.png",
              marker: { top: "50%", left: "50%", text: "✅" },
              actionText: "Entrega el ticket y haz clic en Nueva Orden"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       8. FACTURAR VENTA
    ══════════════════════════════════════════════ */
    {
      number: "8",
      title: "Facturar venta",
      subsections: [
        {
          number: "8.1",
          title: "Generar Factura AFIP",
          steps: [
            {
              number: "8.1.1",
              title: "Facturar venta con AFIP (Arca)",
              text: "Selecciona los productos y el método de pago. Antes de validar, haz clic en el botón <strong>Recibo / Factura</strong> para generar la factura oficial a través de <strong>Arca (AFIP)</strong>.",
              imageFile: "8. Facturar venta/8.1 Generar Factura AFIP/10.png",
              marker: { top: "70%", left: "50%", text: "📄" },
              actionText: "Clic en Recibo/Factura para emitir comprobante fiscal"
            },
            {
              number: "8.1.2",
              title: "Completar datos del cliente para factura",
              text: "En el formulario ingresa los datos del cliente (CUIT, nombre, dirección fiscal). Confirma la emisión de la <strong>factura electrónica</strong>. El sistema regresará a la pantalla de pago.",
              imageFile: "8. Facturar venta/8.1 Generar Factura AFIP/10.a.png",
              marker: { top: "40%", left: "50%", text: "8.1.2" },
              actionText: "Completa los datos del cliente y confirma la factura"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       9. INFORMACIÓN GENERAL
    ══════════════════════════════════════════════ */
    {
      number: "9",
      title: "Información General",
      subsections: [
        {
          number: "9.1",
          title: "Información General del POS",
          steps: [
            {
              number: "9.1.1",
              title: "Configuración e información general",
              text: "Desde el módulo Punto de Venta podés acceder a la configuración general: parámetros de caja, métodos de pago habilitados, configuración de impresora y datos del local.",
              imageFile: "9. Información General/9.1.png",
              marker: { top: "50%", left: "50%", text: "ℹ" },
              actionText: "Consulta la configuración general del POS"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       10. FACTURACIÓN CON ARCA
    ══════════════════════════════════════════════ */
    {
      number: "10",
      title: "Facturación con Arca",
      subsections: [
        {
          number: "10.1",
          title: "Datos del cliente",
          steps: [
            {
              number: "10.1.1",
              title: "Ingresar datos del cliente para factura Arca",
              text: "En el formulario de Arca completa el CUIT, nombre y dirección fiscal del cliente para emitir la factura electrónica. Confirma y el sistema enviará la información a AFIP automáticamente.",
              imageFile: "10. Facturación con Arca/10.1 Datos del cliente/10.a.png",
              marker: { top: "40%", left: "50%", text: "10.1.1" },
              actionText: "Completa los datos fiscales y confirma la factura electrónica"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       11. RETIRO DE EFECTIVO DE LA CAJA
    ══════════════════════════════════════════════ */
    {
      number: "11",
      title: "Retiro de efectivo de la caja",
      subsections: [
        {
          number: "11.1",
          title: "Retiro de efectivo de la caja",
          steps: [
            {
              number: "11.1.1",
              title: "Realizar retiro de efectivo",
              text: "Para retirar efectivo de la caja sin cerrar la sesión, accede al menú interno del POS → selecciona <strong>Retiro de Efectivo</strong> → ingresa el monto a retirar y confirma con el código de permiso del encargado.",
              imageFile: "11. Retiro de efectivo de la caja/11.1.png",
              marker: { top: "50%", left: "50%", text: "💵" },
              actionText: "Ingresa el monto a retirar y confirma con permiso"
            }
          ]
        }
      ]
    },

    /* ══════════════════════════════════════════════
       12. CIERRE DE CAJA
    ══════════════════════════════════════════════ */
    {
      number: "12",
      title: "Cierre de Caja",
      subsections: [
        {
          number: "12.1",
          title: "Cierre de Caja",
          steps: [
            {
              number: "12.1.1",
              title: "Cerrar la sesión de caja",
              text: "Al finalizar la jornada, accede al menú del POS → <strong>Cerrar</strong>. Se mostrará el balance de caja: efectivo teórico (sistema) vs. físico contado. Ingresa el efectivo físico y haz clic en <strong>Cerrar sesión y publicar asientos</strong>.",
              imageFile: "12. Cierre de Caja/12.1.png",
              marker: { top: "50%", left: "50%", text: "🔒" },
              actionText: "Ingresa el efectivo físico y cierra la sesión"
            }
          ]
        }
      ]
    }

  ]
};

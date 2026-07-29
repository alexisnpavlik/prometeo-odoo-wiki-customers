if (!window.dodoManuals) window.dodoManuals = {};

window.dodoManuals['inventario'] = {
  title: "Módulo de Inventario",
  subtitle: "Inventario / Guía Completa de Operaciones",
  description: "Guía interactiva para controlar las operaciones de inventario de la sucursal: envío de mercadería, consultas de entregas y recepción física de remitos de entrada.",

  sections: [
    {
      number: "1",
      title: "Operaciones",
      subsections: [
        {
          number: "1.1",
          title: "Enviar mercadería (OUT)",
          steps: [
            {
              number: "1.1.1",
              title: "Ingresar al Resumen de Inventario",
              text: "En el panel principal del sistema, selecciona el módulo **Inventario**. Se te presentará la pantalla de Resumen de inventario.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/1.png",
              marker: { top: "43%", left: "38%", text: "1" },
              actionText: "Ubica la tarjeta 'Órdenes de entrega' en el centro de la pantalla"
            },
            {
              number: "1.1.2",
              title: "Desplegar menú de Operaciones",
              text: "En la barra superior del sistema, haz clic sobre la opción **Operaciones** para abrir la lista desplegable.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/2.png",
              marker: { top: "2.5%", left: "20.5%", text: "2" },
              actionText: "Haz clic en la pestaña de Operaciones"
            },
            {
              number: "1.1.3",
              title: "Seleccionar Entregas",
              text: "Dentro de la lista desplegable, haz clic sobre la opción **Entregas**.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/2.png",
              marker: { top: "24.5%", left: "20.5%", text: "3" },
              actionText: "Haz clic en la opción Entregas"
            },
            {
              number: "1.1.4",
              title: "Crear Nuevo Remito",
              text: "En la esquina superior izquierda del listado de Entregas, haz clic en el botón **Nuevo** para abrir el formulario.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/3.png",
              marker: { top: "13.2%", left: "2.8%", text: "4" },
              actionText: "Haz clic en el botón Nuevo"
            },
            {
              number: "1.1.5",
              title: "Ingresar Dirección de Entrega",
              text: "Haz clic en el campo **Dirección de entrega** y escribe o selecciona **Deposito central**.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/4.png",
              marker: { top: "45.5%", left: "16.8%", text: "5" },
              actionText: "Ingresa el destinatario de la mercadería"
            },
            {
              number: "1.1.6",
              title: "Habilitar Línea de Productos",
              text: "En la pestaña 'Operaciones' del formulario, haz clic sobre la opción **Agregar una línea**.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/4.png",
              marker: { top: "80.5%", left: "4.8%", text: "6" },
              actionText: "Haz clic en Agregar una línea"
            },
            {
              number: "1.1.7",
              title: "Buscar Producto por Código",
              text: "Escribe los dígitos del código interno o de barras del producto (ej. **80619**). El sistema te sugerirá el producto coincidente. Haz clic sobre él.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/5.png",
              marker: { top: "75%", left: "12.8%", text: "7" },
              actionText: "Tipea el código del producto y selecciónalo en el menú desplegable"
            },
            {
              number: "1.1.8",
              title: "Buscar Producto por Nombre",
              text: "También puedes buscar productos tipeando parte de su nombre (ej. **Sombrilla**). El sistema desplegará las coincidencias en un menú. Haz clic en la opción correcta.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/6.png",
              marker: { top: "81%", left: "12.8%", text: "8" },
              actionText: "Busca productos por su nombre y selecciónalos"
            },
            {
              number: "1.1.9",
              title: "Cargar Cantidad a Despachar",
              text: "Haz clic sobre la columna **Demanda** de cada producto e ingresa las cantidades físicas exactas que vas a enviar (ej. **15** y **2**).",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/7.png",
              marker: { top: "66%", left: "33.5%", text: "9" },
              actionText: "Completa la columna Demanda con las unidades a enviar"
            },
            {
              number: "1.1.10",
              title: "Guardar Manualmente",
              text: "Haz clic en el ícono de la nube en la barra superior (**Guardar de forma manual**) para guardar los cambios de forma segura.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/8.png",
              marker: { top: "13.2%", left: "9.6%", text: "10" },
              actionText: "Haz clic en la nube de Guardar"
            },
            {
              number: "1.1.11",
              title: "Comprobar Número de Remito (Borrador)",
              text: "El remito quedará registrado en estado **Borrador** y el sistema le asignará una referencia única (ej. **IM/OUT/00048**).",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/9.png",
              marker: { top: "32%", left: "11%", text: "11" },
              actionText: "Verifica que el número de remito se haya creado correctamente"
            },
            {
              number: "1.1.12",
              title: "Reservar Unidades (Marcar como por Realizar)",
              text: "Haz clic en el botón **Marcar como por realizar** en la esquina superior izquierda. Esto reservará el stock físico en el inventario.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/9.png",
              marker: { top: "23%", left: "6.5%", text: "12" },
              actionText: "Haz clic en Marcar como por realizar"
            },
            {
              number: "1.1.13",
              title: "Confirmar Reserva de Stock (Disponible)",
              text: "El documento pasará a estado **Disponible**. El sistema autocompletará la columna **Cantidad** y habilitará el botón de validación.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/10.png",
              marker: { top: "19.5%", left: "57.5%", text: "13" },
              actionText: "Revisa el cambio de estado a Disponible"
            },
            {
              number: "1.1.14",
              title: "Incluir en el Paquete (Opcional)",
              text: "Si vas a consolidar la mercadería en un embalaje físico cerrado, puedes utilizar la opción **Incluir en el paquete**.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/11.png",
              marker: { top: "89.5%", left: "58.8%", text: "14" },
              actionText: "Haz clic en Incluir en el paquete si corresponde"
            },
            {
              number: "1.1.15",
              title: "Validar la Entrega",
              text: "Haz clic en el botón **Validar** en la esquina superior izquierda. La mercadería se descontará definitivamente de tu inventario activo.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/11.png",
              marker: { top: "18%", left: "3%", text: "15" },
              actionText: "Haz clic en el botón Validar para confirmar la salida física"
            },
            {
              number: "1.1.16",
              title: "Confirmación de Salida (Estado Hecho)",
              text: "El remito cambiará a estado **Hecho** y registrará de forma inmutable la **Fecha efectiva** de la salida.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/12.png",
              marker: { top: "19.5%", left: "61.5%", text: "16" },
              actionText: "Verifica el estado Hecho en la barra de flujo"
            },
            {
              number: "1.1.17",
              title: "Descargar PDF de Remito",
              text: "Haz clic en el botón **Imprimir** para descargar automáticamente en tu navegador el documento de salida oficial del sistema.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/13.png",
              marker: { top: "25%", left: "3.5%", text: "17" },
              actionText: "Imprime y firma el remito en papel"
            }
          ]
        },
        {
          number: "1.2",
          title: "Consultar Entregas",
          steps: [
            {
              number: "1.2.1",
              title: "Auditar los Movimientos del Remito",
              text: "En la ficha del remito finalizado, haz clic en el botón **Movimientos** en la barra superior para ver el historial desglosado.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/1.png",
              marker: { top: "13.2%", left: "50%", text: "1" },
              actionText: "Haz clic en el botón Movimientos"
            },
            {
              number: "1.2.2",
              title: "Revisar Operaciones Detalladas",
              text: "Aquí podrás revisar con precisión de qué ubicaciones de existencias salió cada bulto y la cantidad exacta auditada.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/2.png",
              marker: { top: "35%", left: "80%", text: "2" },
              actionText: "Controla las líneas de stock del movimiento de inventario"
            },
            {
              number: "1.2.3",
              title: "Retornar al Listado General de Entregas",
              text: "Haz clic en la barra superior sobre el menú **Operaciones** y selecciona la opción **Entregas**.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/3.png",
              marker: { top: "20%", left: "22.5%", text: "3" },
              actionText: "Haz clic en Operaciones and luego en Entregas"
            },
            {
              number: "1.2.4",
              title: "Acceder a Filtros y Agrupadores",
              text: "Haz clic sobre el ícono de la barra de búsqueda (**Filtros**) para abrir el panel desplegable de opciones avanzadas.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/4.png",
              marker: { top: "9%", left: "40.5%", text: "4" },
              actionText: "Abre el desplegable de Filtros y Agrupaciones"
            },
            {
              number: "1.2.5",
              title: "Agrupar por Estado",
              text: "En el panel central de 'Agrupar por', haz clic en **Estado**. Esto agrupará tus remitos en carpetas desplegables por su fase activa.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/5.png",
              marker: { top: "21.5%", left: "39%", text: "5" },
              actionText: "Selecciona 'Estado' bajo la columna Agrupar por"
            },
            {
              number: "1.2.6",
              title: "Filtrar por Favoritos: Hecho (Salidas)",
              text: "Bajo la columna de 'Favoritos', selecciona **Hecho (Salidas)** para ver únicamente los remitos que fueron validados exitosamente.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/6.png",
              marker: { top: "39%", left: "55%", text: "6" },
              actionText: "Haz clic en la opción Hecho (Salidas)"
            },
            {
              number: "1.2.7",
              title: "Filtrar por Favoritos: Borrador (Salidas)",
              text: "Selecciona la opción **Borrador (Salidas)** en Favoritos para aislar los documentos pendientes de carga o confirmación.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/7.png",
              marker: { top: "33%", left: "55%", text: "7" },
              actionText: "Haz clic en la opción Borrador (Salidas)"
            },
            {
              number: "1.2.8",
              title: "Filtrar por Favoritos: Disponible (Salidas)",
              text: "Selecciona **Disponible (Salidas)** en Favoritos para listar los documentos listos para su empaque y salida final.",
              imagePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/8.png",
              marker: { top: "27%", left: "55%", text: "8" },
              actionText: "Haz clic en la opción Disponible (Salidas)"
            }
          ]
        },
        {
          number: "1.3",
          title: "Recibir mercadería (IN)",
          steps: [
            {
              number: "1.3.1",
              title: "Ingresar a Recepciones",
              text: "En el Módulo de Inventario, haz clic sobre la tarjeta de control denominada **Recepciones** (Receipts).",
              mockType: "odoo-dashboard-inventario",
              marker: { top: "180px", left: "180px", text: "1" },
              actionText: "Abre el submódulo Recepciones"
            },
            {
              number: "1.3.2",
              title: "Buscar el remito IM/IN/",
              text: "Busca e ingresa al remito de entrada con prefijo **IM/IN/** que posea el mismo número del remito impreso provisto por el transportista.",
              mockType: "odoo-list-recepciones",
              marker: { top: "170px", left: "200px", text: "2" },
              actionText: "Abre el remito de entrada"
            },
            {
              number: "1.3.3",
              title: "Comparar Cantidad física contra teórica",
              text: "Verifica que la cantidad en la columna **Demanda** (lo enviado por el Depósito Central) coincida al 100% con los productos físicos recibidos en cajas.",
              mockType: "odoo-form-recepcion-empty",
              marker: { top: "350px", left: "450px", text: "3" },
              actionText: "Compara el inventario físico"
            },
            {
              number: "1.3.4",
              title: "Registrar cantidades reales",
              text: "Haz clic en la columna **Cantidad** (o columna *Hecho*) e introduce las unidades físicas que realmente ingresaron a la sucursal.",
              mockType: "odoo-form-recepcion-edit",
              marker: { top: "370px", left: "620px", text: "4" },
              actionText: "Completa el campo Hecho con las unidades recibidas"
            },
            {
              number: "1.3.5",
              title: "Validar la recepción",
              text: "Haz clic en el botón **Validar** en la esquina superior izquierda. La mercadería se registrará de inmediato en tu inventario activo.",
              mockType: "odoo-form-recepcion-validate",
              marker: { top: "108px", left: "54px", text: "5" },
              actionText: "Valida el remito de entrada"
            },
            {
              number: "1.3.6",
              title: "Gestión de diferencias: ¿Crear Entrega Parcial?",
              text: "Si recibiste MENOR cantidad que la enviada originalmente, el sistema abrirá un cartel:\n* **Crear Entrega Parcial**: el sistema genera otro remito IM/IN por la diferencia que vendrá en un viaje posterior.\n* **No crear Entrega Parcial**: Si el faltante fue definitivo y no vendrá más stock.",
              mockType: "odoo-recepcion-backorder-popup",
              marker: { top: "240px", left: "380px", text: "6" },
              actionText: "Selecciona el método de entrega parcial"
            }
          ]
        }
      ]
    }
  ]
};

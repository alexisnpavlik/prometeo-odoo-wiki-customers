if (!window.dodoManuals) window.dodoManuals = {};

window.dodoManuals['enviar_mercaderia'] = {
  title: "Enviar mercadería al Depósito Central",
  subtitle: "Módulo Inventario / Remito de Salida",
  description: "Flujo paso a paso para confeccionar y despachar un remito de salida manual desde la sucursal.",
  basePath: "Imagenes/Inventario/1. Operaciones/1.1 Enviar mercadería (OUT)/",
  steps: [
    {
      title: "Ingresar al Resumen de Inventario",
      text: "En el panel principal de Odoo, selecciona el módulo **Inventario**. Se te presentará la pantalla de Resumen de inventario.",
      imageFile: "1.png",
      marker: { top: "43%", left: "38%", text: "1" },
      actionText: "Ubica la tarjeta 'Órdenes de entrega' en el centro de la pantalla"
    },
    {
      title: "Desplegar menú de Operaciones",
      text: "En la barra superior de Odoo, haz clic sobre la opción **Operaciones** para abrir la lista desplegable.",
      imageFile: "2.png",
      marker: { top: "2.5%", left: "20.5%", text: "2" },
      actionText: "Haz clic en la pestaña de Operaciones"
    },
    {
      title: "Seleccionar Entregas",
      text: "Dentro de la lista desplegable, haz clic sobre la opción **Entregas**.",
      imageFile: "2.png",
      marker: { top: "24.5%", left: "20.5%", text: "3" },
      actionText: "Haz clic en la opción Entregas"
    },
    {
      title: "Crear Nuevo Remito",
      text: "En la esquina superior izquierda del listado de Entregas, haz clic en el botón **Nuevo** para abrir el formulario.",
      imageFile: "3.png",
      marker: { top: "13.2%", left: "2.8%", text: "4" },
      actionText: "Haz clic en el botón Nuevo"
    },
    {
      title: "Ingresar Dirección de Entrega",
      text: "Haz clic en el campo **Dirección de entrega** y escribe o selecciona **Deposito central**.",
      imageFile: "4.png",
      marker: { top: "45.5%", left: "16.8%", text: "5" },
      actionText: "Ingresa el destinatario de la mercadería"
    },
    {
      title: "Habilitar Línea de Productos",
      text: "En la pestaña 'Operaciones' del formulario, haz clic sobre la opción **Agregar una línea**.",
      imageFile: "4.png",
      marker: { top: "80.5%", left: "4.8%", text: "6" },
      actionText: "Haz clic en Agregar una línea"
    },
    {
      title: "Buscar Producto por Código",
      text: "Escribe los dígitos del código interno o de barras del producto (ej. **80619**). El sistema te sugerirá el producto coincidente. Haz clic sobre él.",
      imageFile: "5.png",
      marker: { top: "75%", left: "12.8%", text: "7" },
      actionText: "Tipea el código del producto y selecciónalo en el menú desplegable"
    },
    {
      title: "Buscar Producto por Nombre",
      text: "También puedes buscar productos tipeando parte de su nombre (ej. **Sombrilla**). El sistema desplegará las coincidencias en un menú. Haz clic en la opción correcta.",
      imageFile: "6.png",
      marker: { top: "81%", left: "12.8%", text: "8" },
      actionText: "Busca productos por su nombre y selecciónalos"
    },
    {
      title: "Cargar Cantidad a Despachar",
      text: "Haz clic sobre la columna **Demanda** de cada producto e ingresa las cantidades físicas exactas que vas a enviar (ej. **15** y **2**).",
      imageFile: "7.png",
      marker: { top: "66%", left: "33.5%", text: "9" },
      actionText: "Completa la columna Demanda con las unidades a enviar"
    },
    {
      title: "Guardar Manualmente",
      text: "Haz clic en el ícono de la nube en la barra superior (**Guardar de forma manual**) para guardar los cambios de forma segura.",
      imageFile: "8.png",
      marker: { top: "13.2%", left: "9.6%", text: "10" },
      actionText: "Haz clic en la nube de Guardar"
    },
    {
      title: "Comprobar Número de Remito (Borrador)",
      text: "El remito quedará registrado en estado **Borrador** y el sistema le asignará una referencia única (ej. **IM/OUT/00048**).",
      imageFile: "9.png",
      marker: { top: "32%", left: "11%", text: "11" },
      actionText: "Verifica que el número de remito se haya creado correctamente"
    },
    {
      title: "Reservar Unidades (Marcar como por Realizar)",
      text: "Haz clic en el botón **Marcar como por realizar** en la esquina superior izquierda. Esto reservará el stock físico en el inventario.",
      imageFile: "9.png",
      marker: { top: "23%", left: "6.5%", text: "12" },
      actionText: "Haz clic en Marcar como por realizar"
    },
    {
      title: "Confirmar Reserva de Stock (Disponible)",
      text: "El documento pasará a estado **Disponible**. Odoo autocompletará la columna **Cantidad** y habilitará el botón de validación.",
      imageFile: "10.png",
      marker: { top: "19.5%", left: "57.5%", text: "13" },
      actionText: "Revisa el cambio de estado a Disponible"
    },
    {
      title: "Incluir en el Paquete (Opcional)",
      text: "Si vas a consolidar la mercadería en un embalaje físico cerrado, puedes utilizar la opción **Incluir en el paquete**.",
      imageFile: "11.png",
      marker: { top: "89.5%", left: "58.8%", text: "14" },
      actionText: "Haz clic en Incluir en el paquete si corresponde"
    },
    {
      title: "Validar la Entrega",
      text: "Haz clic en el botón **Validar** en la esquina superior izquierda. La mercadería se descontará definitivamente de tu inventario activo.",
      imageFile: "11.png",
      marker: { top: "18%", left: "3%", text: "15" },
      actionText: "Haz clic en el botón Validar para confirmar la salida física"
    },
    {
      title: "Confirmación de Salida (Estado Hecho)",
      text: "El remito cambiará a estado **Hecho** y registrará de forma inmutable la **Fecha efectiva** de la salida.",
      imageFile: "12.png",
      marker: { top: "19.5%", left: "61.5%", text: "16" },
      actionText: "Verifica el estado Hecho en la barra de flujo"
    },
    {
      title: "Descargar PDF de Remito",
      text: "Haz clic en el botón **Imprimir** para descargar automáticamente en tu navegador el documento de salida oficial de Odoo.",
      imageFile: "13.png",
      marker: { top: "25%", left: "3.5%", text: "17" },
      actionText: "Imprime y firma el remito en papel"
    }
  ]
};

window.dodoManuals['consultar_entregas'] = {
  title: "Consultar Entregas (Búsqueda y Filtros)",
  subtitle: "Módulo Inventario / Listados e Historial",
  description: "Flujo paso a paso para consultar remitos emitidos, revisar movimientos desglosados y aplicar agrupadores rápidos.",
  basePath: "Imagenes/Inventario/1. Operaciones/1.2 Consultar Entregas/",
  steps: [
    {
      title: "Auditar los Movimientos del Remito",
      text: "En la ficha del remito finalizado, haz clic en el botón **Movimientos** en la barra superior para ver el historial desglosado.",
      imageFile: "1.png",
      marker: { top: "13.2%", left: "50%", text: "1" },
      actionText: "Haz clic en el botón Movimientos"
    },
    {
      title: "Revisar Operaciones Detalladas",
      text: "Aquí podrás revisar con precisión de qué ubicaciones de existencias salió cada bulto y la cantidad exacta auditada.",
      imageFile: "2.png",
      marker: { top: "35%", left: "80%", text: "2" },
      actionText: "Controla las líneas de stock del movimiento de inventario"
    },
    {
      title: "Retornar al Listado General de Entregas",
      text: "Haz clic en la barra superior sobre el menú **Operaciones** y selecciona la opción **Entregas**.",
      imageFile: "3.png",
      marker: { top: "20%", left: "22.5%", text: "3" },
      actionText: "Haz clic en Operaciones y luego en Entregas"
    },
    {
      title: "Acceder a Filtros y Agrupadores",
      text: "Haz clic sobre el ícono de la barra de búsqueda (**Filtros**) para abrir el panel desplegable de opciones avanzadas.",
      imageFile: "4.png",
      marker: { top: "9%", left: "40.5%", text: "4" },
      actionText: "Abre el desplegable de Filtros y Agrupaciones"
    },
    {
      title: "Agrupar por Estado",
      text: "En el panel central de 'Agrupar por', haz clic en **Estado**. Esto agrupará tus remitos en carpetas desplegables por su fase activa.",
      imageFile: "5.png",
      marker: { top: "21.5%", left: "39%", text: "5" },
      actionText: "Selecciona 'Estado' bajo la columna Agrupar por"
    },
    {
      title: "Filtrar por Favoritos: Hecho (Salidas)",
      text: "Bajo la columna de 'Favoritos', selecciona **Hecho (Salidas)** para ver únicamente los remitos que fueron validados exitosamente.",
      imageFile: "6.png",
      marker: { top: "39%", left: "55%", text: "6" },
      actionText: "Haz clic en la opción Hecho (Salidas)"
    },
    {
      title: "Filtrar por Favoritos: Borrador (Salidas)",
      text: "Selecciona la opción **Borrador (Salidas)** en Favoritos para aislar los documentos pendientes de carga o confirmación.",
      imageFile: "7.png",
      marker: { top: "33%", left: "55%", text: "7" },
      actionText: "Haz clic en la opción Borrador (Salidas)"
    },
    {
      title: "Filtrar por Favoritos: Disponible (Salidas)",
      text: "Selecciona **Disponible (Salidas)** en Favoritos para listar los documentos listos para su empaque y salida final.",
      imageFile: "8.png",
      marker: { top: "27%", left: "55%", text: "8" },
      actionText: "Haz clic en la opción Disponible (Salidas)"
    }
  ]
};

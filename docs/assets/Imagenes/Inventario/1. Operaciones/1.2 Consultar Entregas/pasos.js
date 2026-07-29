if (!window.dodoManuals) window.dodoManuals = {};

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

if (!window.dodoManuals) window.dodoManuals = {};

window.dodoManuals['recibir_mercaderia'] = {
  title: "Recibir mercadería del Depósito Central",
  subtitle: "Módulo Inventario / Recepción",
  description: "Cómo confirmar el ingreso de mercancía recibida físicamente desde el Depósito Central.",
  basePath: "Imagenes/Inventario/1. Operaciones/1.3 Recibir mercadería (IN)/",
  steps: [
    {
      title: "Ingresar a Recepciones",
      text: "En el Módulo de Inventario, haz clic sobre la tarjeta de control denominada **Recepciones** (Receipts).",
      mockType: "odoo-dashboard-inventario",
      marker: { top: "180px", left: "180px", text: "1" },
      actionText: "Abre el submódulo Recepciones"
    },
    {
      title: "Buscar el remito IM/IN/",
      text: "Busca e ingresa al remito de entrada con prefijo **IM/IN/** que posea el mismo número del remito impreso provisto por el transportista.",
      mockType: "odoo-list-recepciones",
      marker: { top: "170px", left: "200px", text: "2" },
      actionText: "Abre el remito de entrada"
    },
    {
      title: "Comparar Cantidad física contra teórica",
      text: "Verifica que la cantidad en la columna **Demanda** (lo enviado por el Depósito Central) coincida al 100% con los productos físicos recibidos en cajas.",
      mockType: "odoo-form-recepcion-empty",
      marker: { top: "350px", left: "450px", text: "3" },
      actionText: "Compara el inventario físico"
    },
    {
      title: "Registrar cantidades reales",
      text: "Haz clic en la columna **Cantidad** (o columna *Hecho*) e introduce las unidades físicas que realmente ingresaron a la sucursal.",
      mockType: "odoo-form-recepcion-edit",
      marker: { top: "370px", left: "620px", text: "4" },
      actionText: "Completa el campo Hecho con las unidades recibidas"
    },
    {
      title: "Validar la recepción",
      text: "Haz clic en el botón **Validar** en la esquina superior izquierda. La mercadería se registrará de inmediato en tu inventario activo.",
      mockType: "odoo-form-recepcion-validate",
      marker: { top: "108px", left: "54px", text: "5" },
      actionText: "Valida el remito de entrada"
    },
    {
      title: "Gestión de diferencias: ¿Crear Entrega Parcial?",
      text: "Si recibiste MENOR cantidad que la enviada originalmente, el sistema abrirá un cartel:\n* **Crear Entrega Parcial**: Odoo genera otro remito IM/IN por la diferencia que vendrá en un viaje posterior.\n* **No crear Entrega Parcial**: Si el faltante fue definitivo y no vendrá más stock.",
      mockType: "odoo-recepcion-backorder-popup",
      marker: { top: "240px", left: "380px", text: "6" },
      actionText: "Selecciona el método de entrega parcial"
    }
  ]
};

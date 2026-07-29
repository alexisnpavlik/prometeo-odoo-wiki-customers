## 1.3 Recibir mercadería del Depósito Central (Remitos de Entrada)

### Resolución de Error de Acceso a 'hr.employee'

> [!WARNING]
> **El problema del Error de Acceso:**
> Cuando un usuario con perfil de Sucursal intenta procesar una recepción o ingresar al módulo, Odoo puede arrojar el siguiente error:
> *"Error de acceso. Estos registros están restringidos. El usuario (id=XX) no tiene acceso 'leer' a: - Empleado (hr.employee)"*
> Esto se debe a que la validación de firmas, la asignación de inventarios o los cajeros POS requieren leer datos básicos del registro del empleado, pero las reglas de seguridad restringen esta lectura.

Para que el Administrador de Odoo solucione este inconveniente definitivamente, debe aplicar la siguiente configuración en los ajustes del sistema:

1. **Activar el Modo Desarrollador**: Ve a **Ajustes** -> Desplázate hasta el fondo y haz clic en **Activar modo de desarrollador**.
2. **Acceder a las Reglas de Registro**: Ve a **Ajustes** -> menú superior **Técnico** -> Sección *Seguridad* -> **Reglas de registro** (Record Rules).
3. **Buscar la regla en conflicto**: En la barra de búsqueda de reglas de registro, escribe `hr.employee` o busca la regla `Employee multi-company rule`.
4. **Modificar los Permisos**:
   * Ubica la regla correspondiente a las habilidades del empleado (`Employee skill: employee: read all`) o la regla multi-compañía de empleados.
   * Abre la regla y añade los grupos correspondientes a los operadores de sucursales (ej. `Usuario de Inventario / Operario`) a la lista de grupos permitidos, o edita la expresión de dominio (Domain) para permitir la lectura básica en modo multi-compañía: `['|', ('company_id', '=', False), ('company_id', 'in', company_ids)]`.
5. **Guardar cambios**: Haz clic en el icono de guardar en la parte superior izquierda. El error desaparecerá de inmediato en los perfiles de las sucursales.

---

### Flujo de Recepción de Stock

Una vez resuelto el permiso de acceso, el personal de la sucursal podrá registrar la entrada de stock del Depósito Central:

1. **Ir al Módulo de Inventario**: Selecciona **Inventario** en el panel principal.
2. **Ingresar a Recepciones**: En el tablero de control principal, haz clic en el botón **[X] Por recibir** dentro de la tarjeta **Recepciones** (Receipts).
3. **Buscar el Remito de Origen**: Identifica el remito de entrada con prefijo **IM/IN/** cuyo número coincida con el remito impreso enviado físicamente por el Depósito Central.
4. **Verificar cantidades**: Abre el remito en el sistema. Compara la columna **Demanda** (lo enviado por el Depósito) contra las unidades que llegaron físicamente a la sucursal.
5. **Control de diferencias (Edición de Cantidades)**:
   * Si llegó todo correctamente: Pasa directamente al paso 6.
   * Si hay faltantes/sobrantes: Haz clic en la columna **Cantidad** (o columna *Hecho*) del producto correspondiente y escribe la cantidad real recibida.
6. **Validar la Entrada**: Haz clic en el botón **Validar** en la esquina superior izquierda.
7. **Tratamiento de Entregas Parciales (si aplica)**:
   * Si la cantidad ingresada fue menor que la demandada, Odoo abrirá un cuadro de diálogo preguntando si deseas crear una **Entrega Parcial** (Backorder).
   * **Crear Entrega Parcial**: Si el Depósito Central enviará el resto de la mercadería en un transporte posterior. Odoo generará un nuevo remito pendiente por la diferencia.
   * **No crear Entrega Parcial**: Si el faltante fue un error definitivo y no llegará más mercadería. El remito original se cerrará en estado *Hecho* solo con lo recibido físicamente.
8. **Confirmación**: El remito pasa a estado **Hecho**. La mercadería ha ingresado de manera efectiva al inventario activo de tu sucursal.

---

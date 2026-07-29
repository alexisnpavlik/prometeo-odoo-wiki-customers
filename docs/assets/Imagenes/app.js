/* -------------------------------------------------------------
   DODODOC: MANUAL DE SUCURSALES - CONTROLADOR DE INTERACTIVIDAD
   ------------------------------------------------------------- */

window.onerror = function(message, source, lineno, colno, error) {
  alert("Error de JS: " + message + "\nEn: " + source + "\nLínea: " + lineno + ":" + colno);
};

// Base de Datos Estructurada de Guías y Pasos (cargada dinámicamente desde los archivos pasos.js de cada carpeta)
const manualData = window.dodoManuals || {};

// Configuración de la Plantilla de Impresión de Pasos (Fácilmente configurable)
const PRINT_TEMPLATE_CONFIG = {
  systemName: "",
  showLogo: true,
  logoText: "Doc",
  showPrintDate: true,
  footerText: "",
  themeColor: "#714B67" // Color principal de la plantilla
};

// Configuración de Perfiles y Accesos Configurables
const PROFILES_CONFIG = {
  cajero: {
    name: "Cajero",
    description: "Acceso exclusivo al Punto de Venta (POS) y medios de pago.",
    icon: "💳",
    color: "#10B981",
    permissions: {
      inventario: { visible: false },
      pos_medios_pago: { visible: true, subsections: "all" }
    }
  },
  encargado_sucursal: {
    name: "Encargado de Sucursal",
    description: "Operaciones completas de envío y recepción de inventario.",
    icon: "🏢",
    color: "#714B67",
    permissions: {
      inventario: { visible: true, subsections: "all" },
      pos_medios_pago: { visible: false }
    }
  },
  encargado_deposito: {
    name: "Encargado de Rubro Depósito",
    description: "Control de movimientos de stock, entregas y auditorías.",
    icon: "📦",
    color: "#3B82F6",
    permissions: {
      inventario: { visible: true, subsections: "all" },
      pos_medios_pago: { visible: false }
    }
  },
  administracion: {
    name: "Administración",
    description: "Acceso completo a todos los manuales y configuraciones.",
    icon: "🛡️",
    color: "#8A3FFC",
    permissions: {
      inventario: { visible: true, subsections: "all" },
      pos_medios_pago: { visible: true, subsections: "all" }
    }
  }
};

let activeProfile = localStorage.getItem('dodo-profile') || null;

// Configuración de Credenciales de Logueo (Configurables)
const LOGIN_CONFIG = {
  email: "documentacion.mega@gmail.com",
  password: "megaverde2020*"
};

let isLoggedIn = localStorage.getItem('dodo-logged-in') === 'true';

function hasPermission(moduleKey, sectionTitle = null) {
  if (!activeProfile || !PROFILES_CONFIG[activeProfile]) return false;
  const profilePerms = PROFILES_CONFIG[activeProfile].permissions[moduleKey];
  if (!profilePerms || !profilePerms.visible) return false;
  if (sectionTitle && profilePerms.subsections !== "all") {
    return profilePerms.subsections.includes(sectionTitle);
  }
  return true;
}

// Configuración de Estado General
let currentModule = null;
let currentStepIndex = 0;
let lastActiveStepIndex = -1;
let currentSectionIdx = null; // índice de sección activa para módulos jerárquicos (POS)
let isHomeMode = true;

// Historial de pasos visitados para mostrar checkmarks de progreso
let visitedSteps = {};
let openSubsections = new Set();
let lastSectionIdx = null;
let initialSectionLoad = false;

function markStepVisited(moduleKey, index) {
  if (!visitedSteps[moduleKey]) {
    visitedSteps[moduleKey] = new Set();
  }
  visitedSteps[moduleKey].add(index);
}

// -------------------------------------------------------------
// SISTEMA DE ENLACES DIRECTOS Y DEEP LINKING (🔗)
// -------------------------------------------------------------
const slugRouteMap = {};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remover acentos
    .replace(/[^a-z0-9\s-]/g, "")    // remover caracteres especiales
    .trim()
    .replace(/\s+/g, "-");           // reemplazar espacios por guiones
}

window.copyDirectLink = function(event, slug) {
  event.stopPropagation(); // Evitar expandir/colapsar la tarjeta principal o el botón al hacer clic en 🔗
  
  const baseUrl = window.location.href.split('#')[0];
  const directUrl = `${baseUrl}#${slug}`;
  
  navigator.clipboard.writeText(directUrl).then(() => {
    // Feedback visual premium tipo Toast
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:24px',
      'background:var(--odoo-primary)',
      'color:#fff',
      'padding:14px 28px',
      'border-radius:var(--border-radius-sm)',
      'box-shadow:var(--shadow-lg)',
      'font-weight:700',
      'z-index:99999',
      'font-size:13.5px',
      'font-family:var(--font-header)',
      'display:flex',
      'align-items:center',
      'gap:8px',
      'border:1px solid rgba(255,255,255,0.2)',
      'transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    ].join(';');
    alertDiv.innerHTML = `<span>🔗</span> Enlace directo copiado al portapapeles!`;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      alertDiv.style.opacity = '0';
      alertDiv.style.transform = 'translateY(10px)';
      setTimeout(() => alertDiv.remove(), 400);
    }, 2500);
  }).catch(err => {
    console.error('Error al copiar el enlace:', err);
  });
};

function buildSlugMap() {
  // Módulo de Inventario (Jerárquico)
  const invData = manualData['inventario'];
  if (invData && invData.sections) {
    invData.sections.forEach((sec, secIdx) => {
      const secSlug1 = slugify(sec.title);
      const secSlug2 = slugify(`${sec.number}. ${sec.title}`);
      slugRouteMap[secSlug1] = { type: 'section', key: 'inventario', secIdx: secIdx };
      slugRouteMap[secSlug2] = { type: 'section', key: 'inventario', secIdx: secIdx };
      
      const flatSteps = getFlatSteps(invData);
      (sec.subsections || []).forEach((sub, subIdx) => {
        const subSlug = slugify(sub.title);
        const firstStep = (sub.steps || [])[0];
        const flatIdx = firstStep ? flatSteps.indexOf(firstStep) : 0;
        slugRouteMap[subSlug] = { type: 'subsection', key: 'inventario', secIdx: secIdx, subIdx: subIdx, flatIdx: flatIdx };
      });
    });
  }

  // Submódulos jerárquicos del Punto de Venta (POS)
  const posData = manualData['pos_medios_pago'];
  if (posData && posData.sections) {
    posData.sections.forEach((sec, secIdx) => {
      const secSlug1 = slugify(sec.title);
      const secSlug2 = slugify(`${sec.number}. ${sec.title}`);
      slugRouteMap[secSlug1] = { type: 'section', key: 'pos_medios_pago', secIdx: secIdx };
      slugRouteMap[secSlug2] = { type: 'section', key: 'pos_medios_pago', secIdx: secIdx };
      
      const flatSteps = getFlatSteps(posData);
      (sec.subsections || []).forEach((sub, subIdx) => {
        const subSlug = slugify(sub.title);
        const firstStep = (sub.steps || [])[0];
        const flatIdx = firstStep ? flatSteps.indexOf(firstStep) : 0;
        slugRouteMap[subSlug] = { type: 'subsection', key: 'pos_medios_pago', secIdx: secIdx, subIdx: subIdx, flatIdx: flatIdx };
      });
    });
  }
}

function handleHashRoute() {
  const hash = decodeURIComponent(window.location.hash.substring(1));
  if (!hash) {
    showHome();
    return;
  }
  
  const route = slugRouteMap[hash];
  if (!route) return;

  if (route.type === 'module') {
    loadModule(route.key, 0);
  } else if (route.type === 'section') {
    loadSection(route.key, route.secIdx);
  } else if (route.type === 'subsection') {
    loadSection(route.key, route.secIdx, route.flatIdx);
    
    // Abrir la subsección correspondiente de forma aislada
    openSubsections.clear();
    openSubsections.add(route.subIdx);
    initialSectionLoad = false;
    
    const flatSteps = getFlatSteps(manualData[route.key]);
    const section = manualData[route.key].sections[route.secIdx];
    renderSectionSteps(section, flatSteps);
  }
}

// Helper: obtener lista plana de pasos (compatible con módulos jerárquicos y planos)
function getFlatSteps(module) {
  if (module.steps) return module.steps; // módulos planos (Inventario)
  if (!module.sections) return [];
  const flat = [];
  module.sections.forEach(section => {
    (section.subsections || []).forEach(sub => {
      (sub.steps || []).forEach(step => flat.push(step));
    });
  });
  return flat;
}

// Helper: obtener ruta de imagen para un paso
function getStepImagePath(s, moduleKey = currentModule) {
  if (!s) return null;
  if (s.imagePath) return s.imagePath;
  if (s.imageFile) {
    const base = manualData[moduleKey]?.basePath || "";
    return base + s.imageFile;
  }
  return null;
}

// Elementos del DOM
const DOM = {
  sidebarNav: document.getElementById('sidebar-nav'),
  searchBar: document.getElementById('search-bar'),
  headerTitle: document.getElementById('header-title'),
  headerSubtitle: document.getElementById('header-subtitle'),
  topicTitle: document.getElementById('topic-title'),
  topicDescription: document.getElementById('topic-description'),
  stepsList: document.getElementById('steps-list'),
  viewerContent: document.getElementById('viewer-content'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  stepProgress: document.getElementById('step-progress'),
  themeToggle: document.getElementById('theme-toggle')
};

// -------------------------------------------------------------
// CAMBIO DE TEMA (CLARO / OSCURO)
// -------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem('dodo-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  DOM.themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dodo-theme', newTheme);
  });
}

// -------------------------------------------------------------
// INICIALIZACIÓN Y NAVEGACIÓN
// -------------------------------------------------------------
// -------------------------------------------------------------
// ÍNDICE PRINCIPAL (HOME DASHBOARD)
// -------------------------------------------------------------
const HOME_MODULES = [
  {
    category: 'Módulo de Inventario',
    color: '#714B67',
    icon: '📦',
    items: [
      { key: 'enviar_mercaderia',  title: '1. Enviar mercadería (OUT)',   desc: 'Crear y despachar remitos de salida hacia el Depósito Central.',        emoji: '🚚' },
      { key: 'consultar_entregas', title: '2. Consultar Entregas',        desc: 'Buscar y filtrar entregas por estado, fecha y referencia.',            emoji: '🔍' },
      { key: 'recibir_mercaderia', title: '3. Recibir mercadería (IN)',   desc: 'Confirmar el ingreso de mercadería recibida físicamente.',              emoji: '📥' },
    ]
  },
  {
    category: 'Punto de Venta (POS)',
    color: '#10B981',
    icon: '🖥️',
    items: [
      { key: 'pos_medios_pago', title: 'Medios de Pago (16 Iconos)', desc: 'Guía completa: apertura, búsqueda de productos, descuentos, cobros y cierre.', emoji: '💳' },
    ]
  }
];

window.openSubmoduleFromLanding = function(subIdx) {
  const module = manualData[currentModule];
  const section = module.sections[currentSectionIdx];
  const flatSteps = getFlatSteps(module);
  const sub = section.subsections[subIdx];
  const firstIdx = flatSteps.indexOf((sub.steps || [])[0]);
  
  openSubsections.clear();
  openSubsections.add(subIdx);
  
  if (firstIdx >= 0) {
    currentStepIndex = firstIdx;
  }
  updateActiveStepUI();
};

window.toggleSubmoduleCard = function(key) {
  const cards = document.querySelectorAll('.submodule-card');
  const targetCard = document.getElementById(`card-${key}`);
  if (!targetCard) return;
  
  const isExpanded = targetCard.classList.contains('expanded');
  
  // Collapse all cards
  cards.forEach(card => {
    card.classList.remove('expanded');
  });
  
  // Expand target if it was not already expanded
  if (!isExpanded) {
    targetCard.classList.add('expanded');
  }
};

window.toggleOptionSteps = function(btnId) {
  const container = document.getElementById(`opt-container-${btnId}`);
  const btn = document.getElementById(`opt-btn-${btnId}`);
  if (!container || !btn) return;
  
  const isExpanded = container.classList.contains('expanded');
  
  if (isExpanded) {
    container.classList.remove('expanded');
    btn.classList.remove('expanded');
  } else {
    container.classList.add('expanded');
    btn.classList.add('expanded');
  }
};

function showHome() {
  isHomeMode = true;
  currentModule = null;

  // Cabecera
  DOM.headerTitle.textContent = 'Doc — Manual Interactivo';
  DOM.headerSubtitle.textContent = 'Índice General / Todos los Módulos';

  // Quitar activo en sidebar
  document.querySelectorAll('.nav-list li').forEach(li => li.classList.remove('active'));
  const homeItem = document.getElementById('nav-home');
  if (homeItem) homeItem.classList.add('active');

  // Ocultar panel izquierdo y footer → expandir visor a pantalla completa
  const stepsPanel   = document.querySelector('.steps-panel');
  const viewerPanel  = document.querySelector('.viewer-panel');
  const viewerFooter = document.querySelector('.viewer-footer');
  const contentBody  = document.querySelector('.content-body');
  if (stepsPanel)   stepsPanel.style.display = 'none';
  if (viewerFooter) viewerFooter.style.display = 'none';
  if (viewerPanel)  { viewerPanel.style.flex = '1 1 100%'; viewerPanel.style.maxWidth = '100%'; viewerPanel.style.width = '100%'; }
  if (contentBody)  { contentBody.style.gridTemplateColumns = '1fr'; contentBody.style.overflow = 'hidden'; }

  // Build the list of categories and their submodules
  const categories = [
    { name: 'Módulo de Inventario', color: '#714B67', submodules: [] },
    { name: 'Punto de Venta (POS)', color: '#10B981', submodules: [] }
  ];

  // Inventario Submodules
  const invData = manualData['inventario'];
  if (invData && invData.sections && hasPermission('inventario')) {
    const invIcons = {
      "1": "📦"
    };

    invData.sections.forEach((sec, secIdx) => {
      if (!hasPermission('inventario', sec.title)) return;
      let sectionSteps = [];
      (sec.subsections || []).forEach(sub => {
        (sub.steps || []).forEach(step => sectionSteps.push(step));
      });

      const hasMultipleOptions = (sec.subsections || []).length > 1;

      categories[0].submodules.push({
        key: `inv_sec_${secIdx}`,
        title: `${sec.title}`,
        emoji: invIcons[sec.number] || '📦',
        stepsCount: sectionSteps.length,
        isCollapsible: hasMultipleOptions,
        subsections: sec.subsections,
        secIdx: secIdx
      });
    });
  }

  // POS Submodules
  const posData = manualData['pos_medios_pago'];
  if (posData && posData.sections && hasPermission('pos_medios_pago')) {
    const posIcons = {
      "1": "🔓",
      "2": "🔍",
      "3": "🛒",
      "4": "✏️",
      "5": "🏷️",
      "6": "💳",
      "7": "📄",
      "8": "🧾",
      "9": "ℹ️",
      "10": "🏛️",
      "11": "💵",
      "12": "🔒"
    };

    posData.sections.forEach((sec, secIdx) => {
      if (!hasPermission('pos_medios_pago', sec.title)) return;
      let sectionSteps = [];
      (sec.subsections || []).forEach(sub => {
        (sub.steps || []).forEach(step => sectionSteps.push(step));
      });

      const hasMultipleOptions = (sec.subsections || []).length > 1;

      categories[1].submodules.push({
        key: `pos_sec_${secIdx}`,
        title: `${sec.number}. ${sec.title}`,
        emoji: posIcons[sec.number] || '🖥️',
        stepsCount: sectionSteps.length,
        isCollapsible: hasMultipleOptions,
        subsections: sec.subsections,
        secIdx: secIdx
      });
    });
  }

  let tocBody = '';
  let catNum = 0;

  categories.forEach(cat => {
    if (cat.submodules.length === 0) return; // Omitir categorías vacías para este perfil
    catNum++;
    tocBody += `
      <div style="margin-bottom:30px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:8px;border-bottom:2.5px solid ${cat.color};">
          <span style="background:${cat.color};color:#fff;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0;">${catNum}</span>
          <span style="font-size:16px;font-weight:800;color:${cat.color};text-transform:uppercase;letter-spacing:.07em;font-family:var(--font-header);">${cat.name}</span>
        </div>
        <div class="submodules-container">
    `;

    cat.submodules.forEach(sub => {
      const subSlug = slugify(sub.title);
      const moduleKey = sub.key.startsWith('inv_sec_') ? 'inventario' : 'pos_medios_pago';
      const moduleDataObj = manualData[moduleKey];

      if (sub.isCollapsible) {
        // Tarjeta Colapsable
        tocBody += `
          <div class="submodule-card" id="card-${sub.key}">
            <div class="submodule-card-header" onclick="toggleSubmoduleCard('${sub.key}')">
              <span class="submodule-icon">${sub.emoji}</span>
              <div class="submodule-info">
                <h3 class="submodule-title">${sub.title}</h3>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <span class="link-icon" onclick="copyDirectLink(event, '${subSlug}')" title="Copiar enlace directo" style="font-size:16px; opacity:0.5; cursor:pointer;">🔗</span>
                <span class="submodule-arrow">&#9654;</span>
              </div>
            </div>
            <div class="submodule-steps-list" style="padding: 10px 0;">
        `;

        // Renderizar opciones (subsecciones) como BOTONES DE NAVEGACIÓN DIRECTA
        const flatSteps = getFlatSteps(moduleDataObj);
        sub.subsections.forEach((subSec, subIdx) => {
          const firstStep = (subSec.steps || [])[0];
          const firstStepIdx = firstStep ? flatSteps.indexOf(firstStep) : 0;
          const subSecSlug = slugify(subSec.title);
          
          tocBody += `
            <div class="submodule-step-item" style="padding: 12px 24px;" onclick="event.stopPropagation(); loadSection('${moduleKey}', ${sub.secIdx}, ${firstStepIdx})">
              <div class="submodule-step-left">
                <span class="submodule-step-num">${subSec.number}</span>
                <span style="font-weight: 600;">${subSec.title}</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <span class="link-icon" onclick="event.stopPropagation(); copyDirectLink(event, '${subSecSlug}')" title="Copiar enlace directo" style="font-size:14px; opacity:0.5; cursor:pointer;">🔗</span>
                <span style="font-size:11px; font-weight:700; color:var(--odoo-primary); text-transform:uppercase;">Iniciar ➔</span>
              </div>
            </div>
          `;
        });

        tocBody += `
            </div>
          </div>
        `;
      } else {
        // Tarjeta Simple Directa (No colapsable)
        const clickAction = sub.onClick ? sub.onClick : `loadSection('${moduleKey}', ${sub.secIdx}, 0)`;
        tocBody += `
          <div class="submodule-card" id="card-${sub.key}" style="cursor: pointer;">
            <div class="submodule-card-header" onclick="${clickAction}" style="background: var(--bg-primary);">
              <span class="submodule-icon">${sub.emoji}</span>
              <div class="submodule-info">
                <h3 class="submodule-title">${sub.title}</h3>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <span class="link-icon" onclick="copyDirectLink(event, '${subSlug}')" title="Copiar enlace directo" style="font-size:16px; opacity:0.5; cursor:pointer; margin-right:4px;">🔗</span>
                <span class="submodule-arrow" style="transform: rotate(0deg); opacity: 0.3;">➔</span>
              </div>
            </div>
          </div>
        `;
      }
    });

    tocBody += `
        </div>
      </div>
    `;
  });

  DOM.viewerContent.innerHTML = `
    <div style="height:100%; width:100%; overflow-y:auto; background:var(--bg-primary);">
      <div style="max-width:100%; width:100%; margin:0 auto; padding:40px 64px;">
        <div style="text-align:center;margin-bottom:52px;">
          <h1 style="font-size:28px;font-weight:900;color:var(--odoo-primary);margin:0 0 10px;font-family:var(--font-header);">Tabla de Contenidos</h1>
          <div style="width:60px;height:3px;background:linear-gradient(90deg,var(--odoo-primary),var(--accent-color));margin:0 auto 14px;border-radius:2px;"></div>
          <p style="font-size:13px;color:var(--text-secondary);font-style:italic;margin:0;">Haz clic en un subm&oacute;dulo para iniciar la gu&iacute;a o desplegar sus opciones, y presiona cualquier bot&oacute;n para ver sus pasos</p>
        </div>
        ${tocBody}
      </div>
    </div>
  `;

  // Ocultar controles de navegación
  DOM.btnPrev.style.visibility = 'hidden';
  DOM.btnNext.style.visibility = 'hidden';
  DOM.stepProgress.textContent = '';
}


function loadModule(moduleKey, forceStepIndex = 0) {
  const module = manualData[moduleKey];
  if (!module) return;

  if (module.sections) {
    const flatSteps = getFlatSteps(module);
    let sectionIdx = 0;
    module.sections.forEach((sec, sIdx) => {
      (sec.subsections || []).forEach(sub => {
        (sub.steps || []).forEach(step => {
          if (flatSteps.indexOf(step) === forceStepIndex) sectionIdx = sIdx;
        });
      });
    });
    loadSection(moduleKey, sectionIdx, forceStepIndex);
    return;
  }

  isHomeMode = false;
  currentModule = moduleKey;
  currentStepIndex = forceStepIndex;
  currentSectionIdx = null; // resetear modo sección al cargar módulo completo

  markStepVisited(currentModule, currentStepIndex);

  // Restaurar panel izquierdo, footer y ancho del visor (venimos del home)
  const stepsPanel   = document.querySelector('.steps-panel');
  const viewerPanel  = document.querySelector('.viewer-panel');
  const viewerFooter = document.querySelector('.viewer-footer');
  const contentBody  = document.querySelector('.content-body');
  if (stepsPanel)   stepsPanel.style.display = '';
  if (viewerFooter) viewerFooter.style.display = '';
  if (viewerPanel)  { viewerPanel.style.flex = ''; viewerPanel.style.maxWidth = ''; viewerPanel.style.width = ''; }
  if (contentBody)  { contentBody.style.gridTemplateColumns = ''; contentBody.style.overflow = ''; }


  // Actualizar textos de cabecera
  DOM.headerTitle.textContent = module.title;
  DOM.headerSubtitle.textContent = module.subtitle;
  DOM.topicTitle.textContent = module.title;
  DOM.topicDescription.textContent = module.description;

  // Mostrar controles de navegación
  DOM.btnPrev.style.visibility = 'visible';
  DOM.btnNext.style.visibility = 'visible';

  // Resaltar item de navegación activo en sidebar
  document.querySelectorAll('.nav-list li').forEach(li => {
    if (li.dataset.module === moduleKey) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
  const homeItem = document.getElementById('nav-home');
  if (homeItem) homeItem.classList.remove('active');

  // Renderizar la lista de pasos en el panel izquierdo
  renderStepsList(module);

  // Renderizar la vista activa
  renderActiveStep();
}

// -------------------------------------------------------------
// SISTEMA DE REPRODUCCIÓN DE VIDEOS ASOCIADOS
// -------------------------------------------------------------
function checkVideoExists(url, callback) {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = url;
  video.onloadedmetadata = () => {
    callback(true);
  };
  video.onerror = () => {
    callback(false);
  };
  video.load(); // Forzar carga en navegadores de escritorio locales (file:///)
}

window.playVideoInViewer = function(videoUrl, title) {
  DOM.viewerContent.innerHTML = `
    <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#000; position:relative; justify-content:center; align-items:center;">
      <button onclick="updateActiveStepUI()" style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.2); color:#FFF; border:none; padding:10px 20px; border-radius:var(--border-radius-sm); font-weight:700; cursor:pointer; z-index:10; font-family:var(--font-header); backdrop-filter:blur(10px); transition:all 0.3s ease;">
        ✕ Cerrar Video
      </button>
      <video src="${videoUrl}" controls autoplay style="max-width:100%; max-height:100%; width:auto; height:auto; outline:none; box-shadow:var(--shadow-lg);"></video>
      <div style="position:absolute; bottom:20px; left:20px; color:#FFF; font-family:var(--font-header); font-weight:700; font-size:15px; text-shadow:0 2px 4px rgba(0,0,0,0.8); z-index:10;">
        🎬 Reproduciendo: ${title}
      </div>
    </div>
  `;
};

// ----------------------------------------------------------------
// NAVEGACIÓN POR SECCIÓN (POS y módulos jerárquicos)
// ----------------------------------------------------------------
function loadSection(moduleKey, sectionIdx, startStepIdx) {
  isHomeMode = false;
  currentModule = moduleKey;
  currentSectionIdx = sectionIdx;
  initialSectionLoad = true; // Forzar colapsado de todas las opciones en la carga inicial

  const module = manualData[moduleKey];
  const section = module.sections[sectionIdx];
  const flatSteps = getFlatSteps(module);

  // Determinar el paso inicial
  if (startStepIdx !== undefined && startStepIdx >= 0) {
    currentStepIndex = startStepIdx;
  } else {
    const firstStep = (section.subsections?.[0]?.steps || [])[0];
    currentStepIndex = firstStep ? Math.max(0, flatSteps.indexOf(firstStep)) : 0;
  }

  markStepVisited(currentModule, currentStepIndex);

  // Mostrar paneles
  const stepsPanel   = document.querySelector('.steps-panel');
  const viewerPanel  = document.querySelector('.viewer-panel');
  const viewerFooter = document.querySelector('.viewer-footer');
  const contentBody  = document.querySelector('.content-body');
  if (stepsPanel)   stepsPanel.style.display = '';
  if (viewerFooter) viewerFooter.style.display = '';
  if (viewerPanel)  { viewerPanel.style.flex = ''; viewerPanel.style.maxWidth = ''; viewerPanel.style.width = ''; }
  if (contentBody)  { contentBody.style.gridTemplateColumns = ''; contentBody.style.overflow = ''; }

  // Actualizar cabecera con nombre de la sección
  DOM.headerTitle.textContent = `${section.number}. ${section.title}`;
  DOM.headerSubtitle.textContent = module.subtitle;
  DOM.topicTitle.textContent = `${section.number}. ${section.title}`;
  DOM.topicDescription.textContent = module.description;

  // Mostrar botones de navegación
  DOM.btnPrev.style.visibility = 'visible';
  DOM.btnNext.style.visibility = 'visible';

  // Marcar el ítem activo en el sidebar
  updateNavForSection(moduleKey, sectionIdx);

  // Renderizar la lista de pasos de esta sección en el panel izquierdo
  renderSectionSteps(section, flatSteps);

  // Renderizar la vista activa
  renderActiveStep();
}

function updateNavForSection(moduleKey, sectionIdx) {
  document.querySelectorAll('.nav-list li').forEach(li => {
    if (li.dataset.module === moduleKey && parseInt(li.dataset.sectionIdx) === sectionIdx) {
      li.classList.add('active');
      // Auto-expand the collapsed sidebar drawer
      const parentUl = li.closest('.nav-list');
      if (parentUl) {
        parentUl.classList.remove('section-collapsed');
        const prevHeader = parentUl.previousElementSibling;
        if (prevHeader && prevHeader.classList.contains('nav-section-title')) {
          prevHeader.classList.remove('collapsed');
        }
      }
    } else {
      li.classList.remove('active');
    }
  });
  const homeItem = document.getElementById('nav-home');
  if (homeItem) homeItem.classList.remove('active');
}

function renderSectionSteps(section, flatSteps) {
  DOM.stepsList.innerHTML = '';

  // Controlar el colapsado total en la carga inicial vs auto-expansión en la navegación ordinaria
  if (initialSectionLoad) {
    openSubsections.clear();
    lastSectionIdx = currentSectionIdx;
    initialSectionLoad = false; // Resetear bandera
    lastActiveStepIndex = currentStepIndex;
  } else if (currentStepIndex !== lastActiveStepIndex) {
    // En navegación Next/Prev ordinaria, auto-expandir la subsección activa para que se vea el paso
    openSubsections.clear();
    (section.subsections || []).forEach((sub, subIdx) => {
      (sub.steps || []).forEach(step => {
        if (flatSteps.indexOf(step) === currentStepIndex) {
          openSubsections.add(subIdx);
        }
      });
    });
    lastActiveStepIndex = currentStepIndex;
  }

  (section.subsections || []).forEach((sub, subIdx) => {
    const firstIdx = flatSteps.indexOf((sub.steps || [])[0]);
    const isSubOpen = openSubsections.has(subIdx);

    // Contenedor de la opción
    const optContainer = document.createElement('div');
    optContainer.id = `opt-container-${subIdx}`;
    optContainer.className = `option-btn-container ${isSubOpen ? 'expanded' : ''}`;
    optContainer.style.margin = '0 0 10px 0';
    optContainer.style.paddingBottom = '0';
    optContainer.style.borderBottom = 'none';

    // Botón de opción
    const btn = document.createElement('button');
    btn.className = `option-btn ${isSubOpen ? 'expanded' : ''}`;
    btn.id = `opt-btn-${subIdx}`;
    const subSecSlug = slugify(sub.title);
    btn.innerHTML = `
      <span>${sub.title}</span>
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="link-icon" onclick="copyDirectLink(event, '${subSecSlug}')" title="Copiar enlace directo" style="font-size:14px; opacity:0.6; cursor:pointer;">🔗</span>
        <span class="option-btn-arrow">&#9654;</span>
      </div>
    `;
    
    // Al hacer clic, se expande/colapsa SOLO esta opción de forma totalmente independiente
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const container = document.getElementById(`opt-container-${subIdx}`);
      const button = document.getElementById(`opt-btn-${subIdx}`);
      if (!container || !button) return;

      if (openSubsections.has(subIdx)) {
        openSubsections.delete(subIdx);
        container.classList.remove('expanded');
        button.classList.remove('expanded');
        updateActiveStepUI();
      } else {
        // Cerrar todos los demás submódulos/opciones en el DOM para que solo uno esté abierto a la vez
        document.querySelectorAll('.option-btn-container').forEach(c => c.classList.remove('expanded'));
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('expanded'));

        openSubsections.clear();
        openSubsections.add(subIdx);
        container.classList.add('expanded');
        button.classList.add('expanded');
        if (firstIdx >= 0) {
          currentStepIndex = firstIdx;
        }
        updateActiveStepUI();
      }
    });
    optContainer.appendChild(btn);

    // Contenedor del paso a paso numerado de esta opción
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'option-steps-container';
    
    (sub.steps || []).forEach((step, sIdx) => {
      const stepIndex = flatSteps.indexOf(step);
      const card = document.createElement('div');
      const isActive = stepIndex === currentStepIndex;
      card.className = `step-card ${isActive ? 'active' : ''}`;
      card.style.margin = '8px 0 8px 12px';
      card.style.padding = '12px 14px';
      
      const isVisited = visitedSteps[currentModule] && visitedSteps[currentModule].has(stepIndex);
      const badgeClass = isActive ? 'active' : (isVisited ? 'completed' : '');
      const badgeText = isVisited && !isActive ? '✓' : (sIdx + 1);

      card.innerHTML = `
        <div class="step-number-badge ${badgeClass}" style="width:22px; height:22px; font-size:11px;">${badgeText}</div>
        <div class="step-card-content">
          <h4 class="step-card-title" style="font-size:13px;">${step.title}</h4>
          <p class="step-card-text" style="font-size:11px;">${step.actionText || ''}</p>
        </div>
      `;
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        currentStepIndex = stepIndex;
        updateActiveStepUI();
      });
      stepsContainer.appendChild(card);
    });

    // ─────────────────────────────────────────────────────────────
    // SISTEMA DINÁMICO DE AUTO-DETECCIÓN Y BOTON DE VIDEO (.MP4)
    // ─────────────────────────────────────────────────────────────
    const firstStep = (sub.steps || [])[0];
    let videoUrl1 = "";
    let videoUrl2 = "";
    const activeImgPath = firstStep ? getStepImagePath(firstStep, currentModule) : null;
    if (activeImgPath) {
      const dirPath = activeImgPath.substring(0, activeImgPath.lastIndexOf('/') + 1);
      // Opción A: Nombre original tal cual (ej. "Cobro en efectivo.mp4")
      videoUrl1 = dirPath + sub.title + '.mp4';
      // Opción B: Nombre slugificado con guiones (ej. "cobro-en-efectivo.mp4")
      videoUrl2 = dirPath + slugify(sub.title) + '.mp4';
    } else {
      const modFolder = currentModule === 'inventario' ? 'Inventario' : 'PuntodeVenta';
      videoUrl1 = `Imagenes/${modFolder}/1. Operaciones/1.3 Recibir mercadería (IN)/Recibir mercadería (IN).mp4`;
      videoUrl2 = `Imagenes/${modFolder}/1. Operaciones/1.3 Recibir mercadería (IN)/recibir-mercaderia-in.mp4`;
    }

    let resolvedVideoUrl = "";

    const videoBtn = document.createElement('button');
    videoBtn.className = 'btn-nav btn-nav-next';
    videoBtn.style.margin = '16px auto 8px 12px';
    videoBtn.style.display = 'none'; // Ocultar por defecto hasta verificar existencia
    videoBtn.style.background = 'linear-gradient(135deg, var(--odoo-primary), var(--accent-color))';
    videoBtn.style.borderColor = 'transparent';
    videoBtn.style.width = 'calc(100% - 24px)';
    videoBtn.style.justifyContent = 'center';
    videoBtn.style.height = '38px';
    videoBtn.style.boxShadow = 'var(--shadow-sm)';
    videoBtn.innerHTML = '<span>Ver video  ▶</span>';
    
    videoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playVideoInViewer(resolvedVideoUrl, sub.title);
    });
    stepsContainer.appendChild(videoBtn);

    // Botón "Imprimir pasos" (siempre visible para todos los submódulos)
    const printBtn = document.createElement('button');
    printBtn.className = 'btn-nav btn-nav-next';
    printBtn.style.margin = '8px auto 8px 12px';
    printBtn.style.display = 'flex';
    printBtn.style.background = 'rgba(113, 75, 103, 0.08)';
    printBtn.style.color = 'var(--text-primary)';
    printBtn.style.borderColor = 'var(--border-color)';
    printBtn.style.width = 'calc(100% - 24px)';
    printBtn.style.justifyContent = 'center';
    printBtn.style.height = '38px';
    printBtn.style.boxShadow = 'var(--shadow-sm)';
    printBtn.innerHTML = '<span>Imprimir pasos 🖨</span>';
    
    printBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      printSubmoduleSteps(currentModule, currentSectionIdx, subIdx);
    });
    stepsContainer.appendChild(printBtn);

    // Detección automática en cascada y sin CORS (Compatible con file:/// y Servidor)
    checkVideoExists(videoUrl1, (exists1) => {
      if (exists1) {
        resolvedVideoUrl = videoUrl1;
        videoBtn.style.display = 'flex';
      } else {
        checkVideoExists(videoUrl2, (exists2) => {
          if (exists2) {
            resolvedVideoUrl = videoUrl2;
            videoBtn.style.display = 'flex';
          }
        });
      }
    });

    optContainer.appendChild(stepsContainer);
    DOM.stepsList.appendChild(optContainer);
  });
}

function renderStepsList(module) {
  DOM.stepsList.innerHTML = '';

  // ── Módulo PLANO (Inventario) ──────────────────────────────
  if (module.steps) {
    module.steps.forEach((step, index) => {
      const card = document.createElement('div');
      const isActive = index === currentStepIndex;
      card.className = `step-card ${isActive ? 'active' : ''}`;
      card.dataset.stepIndex = index;
      card.addEventListener('click', () => {
        currentStepIndex = index;
        updateActiveStepUI();
      });
      const isVisited = visitedSteps[currentModule] && visitedSteps[currentModule].has(index);
      let iconHtml = '';
      if (step.iconPath) {
        iconHtml = `<img src="${step.iconPath}" style="width:28px;height:28px;object-fit:cover;border-radius:4px;border:1px solid rgba(113,75,103,0.2);" />`;
      } else {
        const badgeClass = isActive ? 'active' : (isVisited ? 'completed' : '');
        const badgeText = isVisited && !isActive ? '✓' : (index + 1);
        iconHtml = `<div class="step-number-badge ${badgeClass}">${badgeText}</div>`;
      }
      card.innerHTML = `
        ${iconHtml}
        <div class="step-card-content">
          <h4 class="step-card-title">${step.title}</h4>
          <p class="step-card-text">${step.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
        </div>
      `;
      DOM.stepsList.appendChild(card);
    });
    return;
  }

  // ── Módulo JERÁRQUICO — ACORDEÓN de 3 niveles ────────────────
  if (!module.sections) return;
  const flatSteps = getFlatSteps(module);

  // Detectar qué sección contiene el paso activo
  let activeSectionIdx = -1;
  module.sections.forEach((section, sIdx) => {
    (section.subsections || []).forEach(sub => {
      (sub.steps || []).forEach(step => {
        if (flatSteps.indexOf(step) === currentStepIndex) activeSectionIdx = sIdx;
      });
    });
  });

  module.sections.forEach((section, sIdx) => {
    const isOpen = sIdx === activeSectionIdx;

    // NIVEL 1 — Encabezado de sección (siempre visible, clickeable)
    const secEl = document.createElement('div');
    secEl.style.cssText = [
      'padding:9px 12px 9px 10px',
      'font-size:11.5px',
      'font-weight:700',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'gap:8px',
      `border-left:3px solid ${isOpen ? 'var(--odoo-primary)' : 'transparent'}`,
      `background:${isOpen ? 'rgba(113,75,103,0.07)' : 'transparent'}`,
      `color:${isOpen ? 'var(--odoo-primary)' : 'var(--text-secondary)'}`,
      'transition:all .18s',
      sIdx > 0 ? 'border-top:1px solid var(--border-color)' : ''
    ].join(';');
    secEl.innerHTML = `
      <span style="
        background:${isOpen ? 'var(--odoo-primary)' : '#bbb'};
        color:#fff;border-radius:50%;
        width:22px;height:22px;
        display:inline-flex;align-items:center;justify-content:center;
        font-size:9px;font-weight:900;flex-shrink:0;
        transition:background .18s;
      ">${section.number}</span>
      <span style="flex:1;line-height:1.35;">${section.title}</span>
      <span style="font-size:10px;opacity:.5;transition:transform .2s;${isOpen ? 'transform:rotate(90deg)' : ''}">&#9654;</span>
    `;
    DOM.stepsList.appendChild(secEl);

    // CONTENIDO EXPANDIDO — solo si es la sección activa
    if (isOpen) {
      const expandContainer = document.createElement('div');
      expandContainer.style.cssText = 'background:rgba(113,75,103,0.03);border-left:3px solid var(--odoo-primary);margin-left:0;padding-bottom:6px;';

      section.subsections.forEach(sub => {
        const firstIdx = flatSteps.indexOf((sub.steps || [])[0]);

        // NIVEL 2 — Encabezado de subsección
        const subEl = document.createElement('div');
        subEl.style.cssText = 'padding:6px 12px 3px 18px;font-size:10.5px;font-weight:700;color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;gap:5px;border-top:1px solid var(--border-color);';
        subEl.innerHTML = `<span style="color:var(--odoo-primary);font-family:monospace;font-size:9.5px;min-width:26px;flex-shrink:0;">${sub.number}</span>${sub.title}`;
        subEl.addEventListener('click', () => {
          if (firstIdx >= 0) { currentStepIndex = firstIdx; updateActiveStepUI(); }
        });
        expandContainer.appendChild(subEl);

        // NIVEL 3 — Tarjetas de pasos individuales
        (sub.steps || []).forEach(step => {
          const stepIndex = flatSteps.indexOf(step);
          const card = document.createElement('div');
          const isActive = stepIndex === currentStepIndex;
          card.className = `step-card ${isActive ? 'active' : ''}`;
          card.dataset.stepIndex = stepIndex;
          card.style.paddingLeft = '28px';
          card.addEventListener('click', () => {
            currentStepIndex = stepIndex;
            updateActiveStepUI();
          });
          const isVisited = visitedSteps[currentModule] && visitedSteps[currentModule].has(stepIndex);
          const badgeClass = isActive ? 'active' : (isVisited ? 'completed' : '');
          const badgeText = isVisited && !isActive ? '✓' : step.number;
          card.innerHTML = `
            <div class="step-number-badge ${badgeClass}" style="font-size:7.5px;min-width:36px;padding:0 3px;text-align:center;flex-shrink:0;">${badgeText}</div>
            <div class="step-card-content">
              <h4 class="step-card-title">${step.title}</h4>
              <p class="step-card-text">${step.actionText || ''}</p>
            </div>
          `;
          expandContainer.appendChild(card);
        });
      });

      DOM.stepsList.appendChild(expandContainer);
    }

    // Click en sección → navegar a su primer paso (y expande)
    secEl.addEventListener('click', () => {
      const firstSubStep = ((section.subsections || [])[0]?.steps || [])[0];
      if (firstSubStep) {
        const idx = flatSteps.indexOf(firstSubStep);
        if (idx >= 0) { currentStepIndex = idx; updateActiveStepUI(); }
      }
    });
  });
}

function updateActiveStepUI() {
  markStepVisited(currentModule, currentStepIndex);

  const module = manualData[currentModule];
  const flatSteps = getFlatSteps(module);

  if (currentSectionIdx !== null && module.sections) {
    // Modo sección — detectar si el paso activo cambió de sección (al pulsar Siguiente/Anterior)
    let newSectionIdx = currentSectionIdx;
    module.sections.forEach((sec, sIdx) => {
      (sec.subsections || []).forEach(sub => {
        (sub.steps || []).forEach(step => {
          if (flatSteps.indexOf(step) === currentStepIndex) newSectionIdx = sIdx;
        });
      });
    });

    if (newSectionIdx !== currentSectionIdx) {
      currentSectionIdx = newSectionIdx;
      updateNavForSection(currentModule, currentSectionIdx);
      const newSec = module.sections[currentSectionIdx];
      DOM.headerTitle.textContent = `${newSec.number}. ${newSec.title}`;
      DOM.topicTitle.textContent  = `${newSec.number}. ${newSec.title}`;
    }

    renderSectionSteps(module.sections[currentSectionIdx], flatSteps);
  } else {
    renderStepsList(module);
  }

  // Scroll al paso activo
  const activeCard = DOM.stepsList.querySelector(`[data-step-index="${currentStepIndex}"]`);
  if (activeCard) activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  renderActiveStep();
}

// -------------------------------------------------------------
// RENDERIZACIÓN DE LA MOCK INTERFAZ ERP / POS
// -------------------------------------------------------------
function renderActiveStep() {
  const steps = getFlatSteps(manualData[currentModule]);
  const step = steps[currentStepIndex];

  // Si estamos en un módulo jerárquico (secciones) y ninguna subsección está expandida,
  // mostrar una pantalla de bienvenida limpia en el visor sin ninguna imagen ni controles de paso.
  if (currentSectionIdx !== null && openSubsections.size === 0) {
    DOM.btnPrev.style.visibility = 'hidden';
    DOM.btnNext.style.visibility = 'hidden';
    DOM.stepProgress.textContent = '';
    
    DOM.viewerContent.innerHTML = `
      <div style="height:100%; width:100%; background:var(--bg-primary);"></div>
    `;
    return;
  }

  // Asegurar que los controles de navegación estén visibles al renderizar un paso ordinario
  DOM.btnPrev.style.visibility = 'visible';
  DOM.btnNext.style.visibility = 'visible';
  
  // Actualizar estado de botones de navegación
  DOM.btnPrev.disabled = currentStepIndex === 0;
  DOM.btnNext.disabled = currentStepIndex === steps.length - 1;
  DOM.stepProgress.textContent = `Paso ${currentStepIndex + 1} de ${steps.length}`;
  
  // Generar la interfaz según el tipo de mockup
  DOM.viewerContent.innerHTML = '';
  
  const mockContainer = document.createElement('div');
  mockContainer.className = 'simulator-full-view';
  
  let odooInterfaceHtml = '';
  
  const activeImagePath = getStepImagePath(step, currentModule);
  
  // Si el paso tiene una imagen real, mostramos la imagen real.
  if (activeImagePath) {
    odooInterfaceHtml = `
      <div class="odoo-image-viewer-container">
        <button class="zoom-close-btn" title="Cerrar Zoom de Imagen">&times;</button>
        <div class="image-wrapper">
          <img src="${activeImagePath}" alt="${step.title}" />
        </div>
        <div class="img-placeholder-box" style="display:none;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:320px;gap:14px;padding:40px 20px;text-align:center;">
          <span style="font-size:60px;line-height:1;">📷</span>
          <div style="font-size:15px;font-weight:700;color:var(--text-secondary);">${step.title}</div>
          <div style="font-size:12px;color:var(--text-muted);max-width:320px;line-height:1.5;">Imagen pendiente de captura.</div>
        </div>
      </div>
    `;
  } else if (step.mockType && step.mockType.startsWith('odoo')) {
    odooInterfaceHtml = getOdooMockupHtml(step);
  } else if (step.mockType.startsWith('pos')) {
    odooInterfaceHtml = getPosMockupHtml(step);
  }
  
  mockContainer.innerHTML = odooInterfaceHtml;
  DOM.viewerContent.appendChild(mockContainer);
  
  // Limpiar cualquier marcador viejo
  const oldMarkers = document.querySelectorAll('.manual-marker-highlight');
  oldMarkers.forEach(el => el.remove());

  // Añadir marcador de números púrpuras dinámicamente si corresponde
  const targetSim = document.querySelector('.image-wrapper') || document.querySelector('.odoo-browser-mock') || document.querySelector('.pos-simulator-container');
  if (targetSim) {
    targetSim.style.position = 'relative';
    
    if (activeImagePath) {
      // Buscar todos los pasos del módulo actual que comparten la misma captura de pantalla
      steps.forEach((s, idx) => {
        const sImagePath = getStepImagePath(s);
        if (sImagePath === activeImagePath && s.marker) {
          const marker = document.createElement('div');
          const isActive = idx === currentStepIndex;
          
          marker.className = `manual-marker-highlight ${isActive ? 'active' : 'inactive'}`;
          marker.style.top = s.marker.top;
          marker.style.left = s.marker.left;
          
          // Estructura del marcador: número + tooltip explicativo
          marker.innerHTML = `
            ${s.marker.text}
            <span class="marker-tooltip">Paso ${idx + 1}: ${s.title}</span>
          `;
          
          // Registrar evento clic en el marcador
          marker.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isActive) {
              // Animación de clic correcto
              marker.classList.add('clicked');
              marker.innerHTML = `✓<span class="marker-tooltip">¡Correcto! Cargando siguiente paso...</span>`;
              
              setTimeout(() => {
                if (currentStepIndex < steps.length - 1) {
                  currentStepIndex++;
                  updateActiveStepUI();
                } else {
                  alert("¡Enhorabuena! Has completado con éxito todo el flujo de este tutorial paso a paso.");
                }
              }, 800);
            } else {
              // Si hace clic en otro paso de la misma pantalla, navegar a ese paso directamente
              currentStepIndex = idx;
              updateActiveStepUI();
            }
          });
          
          targetSim.appendChild(marker);
        }
      });
      
      // Controlar Zoom / Ampliación de la Imagen
      const imageWrapper = document.querySelector('.image-wrapper');
      const viewerContainer = document.querySelector('.odoo-image-viewer-container');
      const closeBtn = document.querySelector('.zoom-close-btn');
      
      if (imageWrapper && viewerContainer) {
        imageWrapper.addEventListener('click', (e) => {
          // Si ya está ampliado y hacen clic en la imagen, salimos del zoom
          if (viewerContainer.classList.contains('fullscreen-zoom')) {
            viewerContainer.classList.remove('fullscreen-zoom');
          } else {
            viewerContainer.classList.add('fullscreen-zoom');
          }
        });
        
        // El botón Cerrar sale del zoom y permite seguir el flujo
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewerContainer.classList.remove('fullscreen-zoom');
          });
        }
      }

      // Manejar imagen no encontrada — ocultar roto, mostrar placeholder
      const imgEl = document.querySelector('.image-wrapper img');
      if (imgEl) {
        imgEl.addEventListener('error', () => {
          const wrapper = document.querySelector('.image-wrapper');
          if (wrapper) wrapper.style.display = 'none';
          const pholder = document.querySelector('.img-placeholder-box');
          if (pholder) pholder.style.display = 'flex';
          document.querySelectorAll('.manual-marker-highlight').forEach(m => m.remove());
        });
      }
    } else if (step.marker) {
      // Marcador único para simulación interactiva HTML
      const marker = document.createElement('div');
      marker.className = 'manual-marker-highlight active';
      marker.style.top = step.marker.top;
      marker.style.left = step.marker.left;
      marker.innerHTML = `
        ${step.marker.text}
        <span class="marker-tooltip">${step.title}</span>
      `;
      
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        marker.classList.add('clicked');
        marker.innerHTML = `✓<span class="marker-tooltip">¡Correcto! Cargando siguiente...</span>`;
        
        setTimeout(() => {
          if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            updateActiveStepUI();
          } else {
            alert("¡Enhorabuena! Has completado con éxito todo el flujo de este tutorial paso a paso.");
          }
        }, 800);
      });
      
      targetSim.appendChild(marker);
    }
  }
  
  // Agregar guía explicativa bajo la interfaz interactiva
  const guideCard = document.createElement('div');
  guideCard.className = 'simulator-guide-card';
  guideCard.innerHTML = `
    <div class="simulator-guide-text">
      <h4>${step.title}</h4>
      <p><span style="color: var(--odoo-primary); font-weight: bold;">Acción:</span> ${step.actionText}</p>
    </div>
    <button class="btn-nav btn-nav-next" style="padding: 8px 16px; font-size:11px;" id="sim-btn-action">
      ${currentStepIndex === steps.length - 1 ? '¡Finalizar Guía!' : 'Siguiente Paso →'}
    </button>
  `;
  mockContainer.appendChild(guideCard);
  
  document.getElementById('sim-btn-action').addEventListener('click', () => {
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      updateActiveStepUI();
    } else {
      alert("¡Enhorabuena! Has completado con éxito todo el flujo de este tutorial paso a paso.");
    }
  });
}

// -------------------------------------------------------------
// PLANTILLAS HTML PARA MOCKUPS DE ODOO (ERP)
// -------------------------------------------------------------
function getOdooMockupHtml(step) {
  // Configuración de visualización dinámica en base al paso
  const isDrawerOpen = step.mockType === 'odoo-drawer-open' ? 'active' : '';
  const isOperationsActive = step.mockType === 'odoo-operations-dropdown' || step.mockType === 'odoo-navbar-active' ? 'highlight-active' : '';
  const isGridActive = step.mockType === 'odoo-navbar-only' ? 'highlight-active' : '';
  
  // Obtener estado de remito
  let statusText = 'Borrador';
  let statusActiveBorrador = 'active';
  let statusActiveDisponible = '';
  let statusActiveHecho = '';
  
  if (step.mockType === 'odoo-form-disponible') {
    statusText = 'Disponible';
    statusActiveBorrador = '';
    statusActiveDisponible = 'active';
  } else if (step.mockType === 'odoo-form-hecho') {
    statusText = 'Hecho';
    statusActiveBorrador = '';
    statusActiveDisponible = '';
    statusActiveHecho = 'active';
  }
  
  let odooBodyHtml = '';
  
  if (step.mockType === 'odoo-list-view' || step.mockType.startsWith('odoo-list')) {
    // Vista de Lista (List Grid)
    let rowsHtml = `
      <tr>
        <td style="color:#714B67; font-weight:bold;">IM/OUT/00034</td>
        <td>Deposito central</td>
        <td>23/05/2026 01:39:27</td>
        <td><span style="background-color:#EFEBEF; color:#666; padding: 2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">Borrador</span></td>
      </tr>
      <tr>
        <td style="color:#714B67; font-weight:bold;">IM/POS/00001</td>
        <td>Consumidor Final Anónimo</td>
        <td>05/02/2026 02:48:18</td>
        <td><span style="background-color:#D1FAE5; color:#065F46; padding: 2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">Hecho</span></td>
      </tr>
      <tr>
        <td style="color:#714B67; font-weight:bold;">IM/OUT/00035</td>
        <td>Deposito central</td>
        <td>23/05/2026 02:15:00</td>
        <td><span style="background-color:#FEE2E2; color:#991B1B; padding: 2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">Disponible</span></td>
      </tr>
    `;
    
    // Si está filtrado
    if (step.mockType === 'odoo-list-filtered') {
      rowsHtml = `
        <tr style="background-color:rgba(113,75,103,0.05)">
          <td style="color:#714B67; font-weight:bold;">IM/OUT/00034</td>
          <td>Deposito central</td>
          <td>23/05/2026 01:39:27</td>
          <td><span style="background-color:#EFEBEF; color:#666; padding: 2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">Borrador</span></td>
        </tr>
      `;
    }
    
    let filterVal = step.mockType === 'odoo-list-filtered' ? 'IM/OUT/00034' : '';
    let isSearchHighlight = step.mockType === 'odoo-list-search-focus' ? 'highlight-active' : '';
    
    odooBodyHtml = `
      <div class="odoo-control-panel">
        <div class="control-panel-left">
          <span class="odoo-breadcrumb">Inventario / <span class="active">Entregas</span></span>
          <button class="odoo-btn odoo-btn-primary ${step.mockType === 'odoo-list-view'?'highlight-active':''}">Nuevo</button>
        </div>
        <div style="position:relative;">
          <input type="text" placeholder="Buscar..." class="form-value-input ${isSearchHighlight}" value="${filterVal}" style="width:240px; padding: 4px 12px; font-size:11px;" />
          ${step.mockType === 'odoo-list-group-by' ? `
            <div style="position:absolute; top:32px; right:0; width:180px; background:#FFF; border:1px solid #CCC; box-shadow:0 4px 12px rgba(0,0,0,0.1); border-radius:4px; z-index:100; font-size:11px; padding:8px;">
              <strong style="color:#666; display:block; margin-bottom:4px;">Agrupar por</strong>
              <div style="padding:4px 0; font-weight:bold; color:#714B67; cursor:pointer;">✓ Estado</div>
              <div style="padding:4px 0; color:#555;">Fecha programada</div>
              <div style="padding:4px 0; color:#555;">Documento origen</div>
            </div>
          `: ''}
        </div>
      </div>
      <div class="odoo-workspace">
        <div style="background:#FFF; border:1px solid #E2D3DF; border-radius:4px; overflow:hidden;">
          <table class="odoo-form-table">
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Contacto</th>
                <th>Fecha programada</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (step.mockType === 'odoo-error-popup') {
    // Popup de Error de Acceso hr.employee
    odooBodyHtml = `
      <div class="odoo-workspace" style="display:flex; align-items:center; justify-content:center; height:100%;">
        <div class="error-access-popup">
          <div class="error-title-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h3 class="error-access-title">Error de acceso</h3>
          </div>
          <p class="error-access-desc">Estos registros están restringidos. Por favor comunícate con un administrador.</p>
          <div class="error-code-block">Evely (Administradora del sistema) (id=12) no tiene acceso 'leer' a:
- Empleado (hr.employee)</div>
          <button class="error-btn-close">Cerrar</button>
        </div>
      </div>
    `;
  } else if (step.mockType.startsWith('odoo-settings') || step.mockType.startsWith('odoo-technical')) {
    // Pantallas de Configuración Técnica
    let configContent = '';
    if (step.mockType === 'odoo-settings-developer') {
      configContent = `
        <div style="display:flex; flex-direction:column; gap:20px; align-items:center; padding-top:40px;">
          <h3 style="color:#714B67;">Ajustes de Odoo</h3>
          <div style="background:#EFEBEF; border:1px dashed #714B67; padding:20px; border-radius:8px; text-align:center; max-width:400px;">
            <p style="font-size:12px; margin-bottom:12px;">El modo desarrollador permite acceder a opciones de seguridad avanzadas en Odoo.</p>
            <button class="odoo-btn odoo-btn-primary highlight-active">Activar modo de desarrollador</button>
          </div>
        </div>
      `;
    } else if (step.mockType === 'odoo-technical-rules' || step.mockType === 'odoo-technical-rules-search') {
      let isSearchHighlight = step.mockType === 'odoo-technical-rules-search' ? 'highlight-active' : '';
      let filterVal = step.mockType === 'odoo-technical-rules-search' ? 'hr.employee' : '';
      let listRows = `
        <tr>
          <td>Employee multi-company rule</td>
          <td>hr.employee</td>
          <td>[('company_id', 'in', company_ids)]</td>
        </tr>
        <tr>
          <td>Employee skill: employee: read all</td>
          <td>hr.employee</td>
          <td>[(1, '=', 1)]</td>
        </tr>
      `;
      odooBodyHtml = `
        <div class="odoo-control-panel">
          <div class="control-panel-left">
            <span class="odoo-breadcrumb">Ajustes / Técnico / <span class="active">Reglas de registro</span></span>
          </div>
          <div>
            <input type="text" placeholder="Buscar..." class="form-value-input ${isSearchHighlight}" value="${filterVal}" style="width:200px; padding:4px; font-size:11px;" />
          </div>
        </div>
        <div class="odoo-workspace">
          <table class="odoo-form-table" style="background:#FFF; border:1px solid #CCC; border-radius:4px;">
            <thead>
              <tr>
                <th>Nombre de la Regla</th>
                <th>Modelo</th>
                <th>Filtro de Dominio</th>
              </tr>
            </thead>
            <tbody>
              ${listRows}
            </tbody>
          </table>
        </div>
      `;
    } else if (step.mockType === 'odoo-technical-rule-edit') {
      odooBodyHtml = `
        <div class="odoo-control-panel">
          <div class="control-panel-left">
            <span class="odoo-breadcrumb">Reglas de Registro / <span class="active">Employee multi-company rule</span></span>
            <button class="odoo-btn odoo-btn-primary">Guardar</button>
          </div>
        </div>
        <div class="odoo-workspace">
          <div class="odoo-form-sheet" style="padding:20px;">
            <div class="form-group">
              <label class="form-label">Nombre de la Regla</label>
              <input type="text" class="form-value-input" value="Employee multi-company rule" disabled />
            </div>
            <div class="form-group" style="margin-top:12px;">
              <label class="form-label">Modelo del Objeto</label>
              <input type="text" class="form-value-input" value="hr.employee" disabled />
            </div>
            <div class="form-group" style="margin-top:12px;">
              <label class="form-label">Filtro de Dominio (Domain)</label>
              <input type="text" class="form-value-input highlight-active" value="['|', ('company_id', '=', False), ('company_id', 'in', company_ids)]" style="font-family:monospace; color:#10B981; font-weight:bold;" />
            </div>
            <div style="margin-top:16px; font-size:11px; color:#666;">
              ✓ Lectura básica permitida para todos los cajeros en entorno multi-sucursal.
            </div>
          </div>
        </div>
      `;
    }
    
    if (odooBodyHtml === '') {
      odooBodyHtml = `<div class="odoo-workspace">${configContent}</div>`;
    }
  } else if (step.mockType === 'odoo-dashboard-inventario') {
    odooBodyHtml = `
      <div class="odoo-control-panel">
        <span class="odoo-breadcrumb active">Resumen de Inventario</span>
      </div>
      <div class="odoo-workspace" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
        <div style="background:#FFF; border:1px solid #E2D3DF; border-radius:4px; padding:20px; box-shadow:0 2px 4px rgba(0,0,0,0.02); border-top:4px solid #714B67;">
          <h4 style="color:#714B67; margin-bottom:8px;">Recepciones</h4>
          <p style="font-size:11px; color:#888;">Remitos de mercadería proveniente de Depósito Central</p>
          <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
            <button class="odoo-btn odoo-btn-primary highlight-active">1 Por recibir</button>
            <span style="font-size:12px; color:#666;">Ver historial</span>
          </div>
        </div>
        <div style="background:#FFF; border:1px solid #E2D3DF; border-radius:4px; padding:20px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
          <h4 style="color:#666; margin-bottom:8px;">Órdenes de entrega</h4>
          <p style="font-size:11px; color:#888;">Despachos desde esta sucursal</p>
          <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
            <button class="odoo-btn odoo-btn-secondary">4 Por entregar</button>
          </div>
        </div>
      </div>
    `;
  } else if (step.mockType === 'odoo-list-recepciones') {
    odooBodyHtml = `
      <div class="odoo-control-panel">
        <span class="odoo-breadcrumb">Inventario / <span class="active">Recepciones</span></span>
      </div>
      <div class="odoo-workspace">
        <table class="odoo-form-table" style="background:#FFF; border:1px solid #CCC; border-radius:4px;">
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Contacto</th>
              <th>Origen</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color:rgba(113,75,103,0.05)">
              <td style="color:#714B67; font-weight:bold;">IM/IN/00142</td>
              <td>Deposito Central</td>
              <td>Remito Depósito Central #3824</td>
              <td><span style="background-color:#FEE2E2; color:#991B1B; padding: 2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">Listo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else if (step.mockType.startsWith('odoo-form-recepcion')) {
    let cantVal = step.mockType === 'odoo-form-recepcion-edit' || step.mockType === 'odoo-form-recepcion-validate' ? '80.00' : '0.00';
    let isEditHighlight = step.mockType === 'odoo-form-recepcion-edit' ? 'highlight-active' : '';
    let isValidateHighlight = step.mockType === 'odoo-form-recepcion-validate' ? 'highlight-active' : '';
    
    odooBodyHtml = `
      <div class="odoo-control-panel">
        <div class="control-panel-left">
          <span class="odoo-breadcrumb">Recepciones / <span class="active">IM/IN/00142</span></span>
          <button class="odoo-btn odoo-btn-primary ${isValidateHighlight}">Validar</button>
        </div>
      </div>
      <div class="odoo-workspace">
        <div class="odoo-form-sheet" style="padding:16px;">
          <div class="odoo-statusbar">
            <span style="font-size:12px; font-weight:bold; color:#666;">Operación: Entrada de Depósito Central</span>
            <div class="statusbar-status">
              <span class="status-arrow">Borrador</span>
              <span class="status-arrow active">Listo</span>
              <span class="status-arrow">Hecho</span>
            </div>
          </div>
          <h2 class="form-number">IM/IN/00142</h2>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Recibido de</label>
              <div style="font-size:13px; font-weight:bold;">Deposito Central</div>
            </div>
            <div class="form-group">
              <label class="form-label">Fecha Programada</label>
              <div style="font-size:12px; color:#555;">23/05/2026</div>
            </div>
          </div>
          
          <table class="odoo-form-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align:right;">Demanda</th>
                <th style="text-align:right;">Hecho (Cantidad)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>COPA VERSALLES AGUA 300CC CRISTAR MERCATOR</td>
                <td style="text-align:right; font-weight:bold;">100.00</td>
                <td style="text-align:right;"><input type="text" class="form-value-input ${isEditHighlight}" value="${cantVal}" style="width:70px; text-align:right; padding:2px;" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (step.mockType === 'odoo-recepcion-backorder-popup') {
    odooBodyHtml = `
      <div class="odoo-workspace" style="display:flex; align-items:center; justify-content:center; height:100%;">
        <div style="width:450px; background:#FFF; border:1px solid #CCC; border-radius:8px; box-shadow:0 8px 32px rgba(0,0,0,0.15); padding:24px; display:flex; flex-direction:column; gap:16px;">
          <h3 style="color:#714B67;">¿Crear Entrega Parcial?</h3>
          <p style="font-size:13px; color:#666; line-height:1.5;">Has procesado menos cantidad que la demanda inicial (80 unidades recibidas de 100 demandadas).</p>
          <div style="font-size:12px; color:#888; background:#F8F9FA; padding:10px; border-radius:4px; border-left:4px solid #F59E0B;">
            Si creas una entrega parcial, Odoo creará un remito pendiente por las 20 unidades restantes.
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px;">
            <button class="odoo-btn odoo-btn-primary highlight-active">Crear Entrega Parcial</button>
            <button class="odoo-btn odoo-btn-secondary">No crear Entrega Parcial</button>
            <button class="odoo-btn odoo-btn-secondary" style="border:none;">Cancelar</button>
          </div>
        </div>
      </div>
    `;
  } else {
    // Formulario de Remito de Salida Manual (Módulo Inventario)
    let destVal = step.mockType.startsWith('odoo-form-empty') ? '' : 'Deposito Central';
    let isDestHighlight = step.mockType === 'odoo-form-empty' ? 'highlight-active' : '';
    let isAddLineHighlight = step.mockType === 'odoo-form-with-destination' ? 'highlight-active' : '';
    
    let tableLines = '';
    
    if (step.mockType === 'odoo-form-adding-line') {
      tableLines = `
        <tr>
          <td><input type="text" class="form-value-input highlight-active" value="35354" style="width:100%; border:none; border-bottom:1px solid #714B67;" /></td>
          <td style="text-align:right;">0,00</td>
        </tr>
      `;
    } else if (step.mockType === 'odoo-form-filled-line' || step.mockType.startsWith('odoo-form-borrador') || step.mockType.startsWith('odoo-form-disponible') || step.mockType.startsWith('odoo-form-hecho')) {
      let qtyVal = step.mockType === 'odoo-form-filled-line' ? '1.00' : '100.00';
      let isQtyHighlight = step.mockType === 'odoo-form-filled-line' ? 'highlight-active' : '';
      
      tableLines = `
        <tr>
          <td style="font-weight:bold; color:#333;">[5434AL24/35354] P.C1.C2 COPA VERSALLES AGUA 300CC CRISTAR MERCATOR (5434A...</td>
          <td style="text-align:right; font-weight:bold; color:#714B67;"><span class="${isQtyHighlight}" style="padding:2px 6px; border-radius:4px;">${qtyVal}</span></td>
        </tr>
      `;
    }
    
    let buttonsHeaderHtml = `
      <button class="odoo-btn odoo-btn-primary ${step.mockType === 'odoo-form-borrador-saved' ? 'highlight-active':''}">Marcar como por realizar</button>
      <button class="odoo-btn odoo-btn-secondary">Validar</button>
      <button class="odoo-btn odoo-btn-secondary">Cancelar</button>
    `;
    
    if (step.mockType === 'odoo-form-disponible') {
      buttonsHeaderHtml = `
        <button class="odoo-btn odoo-btn-primary highlight-active">Validar</button>
        <button class="odoo-btn odoo-btn-secondary">Imprimir</button>
        <button class="odoo-btn odoo-btn-secondary">Cancelar</button>
      `;
    } else if (step.mockType === 'odoo-form-hecho') {
      buttonsHeaderHtml = `
        <button class="odoo-btn odoo-btn-secondary highlight-active">Imprimir</button>
        <button class="odoo-btn odoo-btn-secondary" style="background:#EFEBEF; border:none; pointer-events:none; color:#888;">Valido</button>
      `;
    }
    
    let isSaveCloudActive = step.mockType === 'odoo-form-borrador' ? 'highlight-active' : '';
    
    odooBodyHtml = `
      <div class="odoo-control-panel">
        <div class="control-panel-left">
          <span class="odoo-breadcrumb">Entregas / <span class="active">${step.mockType.startsWith('odoo-form-empty')||step.mockType.startsWith('odoo-form-with')||step.mockType.startsWith('odoo-form-add')?'Nuevo':'IM/OUT/00042'}</span></span>
          <button class="theme-toggle-btn ${isSaveCloudActive}" style="border:none; width:32px; height:32px; margin-left:12px;" title="Guardar de forma manual">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" transform="rotate(45 12 12)"></path></svg>
          </button>
        </div>
      </div>
      <div class="odoo-workspace">
        <div class="odoo-form-sheet">
          <div class="odoo-statusbar">
            <div class="statusbar-buttons">
              ${buttonsHeaderHtml}
            </div>
            <div class="statusbar-status">
              <span class="status-arrow ${statusActiveBorrador}">Borrador</span>
              <span class="status-arrow ${statusActiveDisponible}">Disponible</span>
              <span class="status-arrow ${statusActiveHecho}">Hecho</span>
            </div>
          </div>
          
          <h2 class="form-number">${step.mockType.startsWith('odoo-form-empty')||step.mockType.startsWith('odoo-form-with')||step.mockType.startsWith('odoo-form-add')?'Nuevo':'IM/OUT/00042'}</h2>
          
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Dirección de entrega</label>
              <input type="text" class="form-value-input ${isDestHighlight}" placeholder="Por ejemplo, Lumber Inc." value="${destVal}" />
            </div>
            <div class="form-group">
              <label class="form-label">Fecha programada</label>
              <div style="font-size:12px; color:#555;">23/05/2026 04:34:12</div>
            </div>
          </div>
          
          <div style="border-bottom: 2px solid #714B67; padding-bottom:8px; margin-top:24px;">
            <span style="font-weight:bold; color:#714B67; font-size:13px; border-bottom:3px solid #714B67; padding-bottom:8px; padding-right:8px;">Operaciones</span>
            <span style="color:#666; font-size:13px; padding-left:16px;">Información adicional</span>
          </div>
          
          <table class="odoo-form-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align:right;">Demanda</th>
              </tr>
            </thead>
            <tbody>
              ${tableLines}
            </tbody>
          </table>
          
          ${step.mockType === 'odoo-form-with-destination' || step.mockType === 'odoo-form-empty' ? `
            <span class="add-line-btn ${isAddLineHighlight}">Agregar una línea</span>
          ` : ''}
        </div>
      </div>
    `;
  }
  
  return `
    <div class="odoo-browser-mock">
      <div class="browser-header">
        <div class="browser-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <div class="browser-tab">
          <span style="color:#714B67;">●</span> Odoo Enterprise
        </div>
      </div>
      <div class="odoo-navbar">
        <div class="odoo-nav-left">
          <div class="odoo-grid-menu ${isGridActive}">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <span class="odoo-navbar-brand">Dodo ERP</span>
          <div class="odoo-navbar-links">
            <span class="odoo-nav-link ${isOperationsActive}">Operaciones</span>
            <span class="odoo-nav-link">Productos</span>
            <span class="odoo-nav-link">Reportes</span>
            <span class="odoo-nav-link">Configuración</span>
          </div>
        </div>
        <div class="odoo-nav-right">
          <span class="odoo-user-badge">Cajero Sucursal (Evely)</span>
        </div>
      </div>
      <div class="odoo-viewport">
        <!-- Drawer de Aplicaciones -->
        <div class="odoo-app-drawer ${isDrawerOpen}">
          <div class="app-drawer-item">Conversaciones</div>
          <div class="app-drawer-item">Punto de venta</div>
          <div class="app-drawer-item">Ventas</div>
          <div class="app-drawer-item highlight-active">Inventario</div>
          <div class="app-drawer-item">Ajustes</div>
        </div>
        
        <!-- Cuerpo Dinámico -->
        ${odooBodyHtml}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PLANTILLAS HTML PARA MOCKUPS DE PUNTO DE VENTA (POS)
// -------------------------------------------------------------
function getPosMockupHtml(step) {
  let posBodyHtml = '';
  
  if (step.mockType === 'pos-apertura') {
    posBodyHtml = `
      <div style="display:flex; align-items:center; justify-content:center; height:100%; width:100%; background:#333;">
        <div style="width:380px; background:#FFF; border-radius:8px; padding:24px; text-align:center; box-shadow:0 8px 24px rgba(0,0,0,0.3); color:#333;">
          <h3 style="color:#714B67; margin-bottom:12px;">Control de Apertura de Caja</h3>
          <p style="font-size:12px; color:#666; margin-bottom:20px;">Establece el efectivo inicial disponible en el cajón físico.</p>
          <div style="font-size:28px; font-weight:800; border-bottom:2px solid #714B67; padding:8px 0; margin-bottom:20px; color:#111;">$ 5,000.00</div>
          <button class="btn-nav btn-nav-next" style="width:100%; display:block; padding:12px; font-size:14px; text-align:center; justify-content:center;">Abrir Sesión de Caja</button>
        </div>
      </div>
    `;
  } else if (step.mockType === 'pos-carrito') {
    posBodyHtml = `
      <div class="pos-main">
        <div class="pos-left">
          <div class="pos-order-list">
            <div class="pos-order-item">
              <div>
                <strong>Copa Versalles Agua 300cc</strong>
                <div style="font-size:11px; color:#666;">2 unidades x $850.00</div>
              </div>
              <strong style="color:#714B67;">$ 1,700.00</strong>
            </div>
            <div class="pos-order-item">
              <div>
                <strong>Gorro Lana para Dama</strong>
                <div style="font-size:11px; color:#666;">1 unidad x $2,500.00</div>
              </div>
              <strong style="color:#714B67;">$ 2,500.00</strong>
            </div>
            <div class="pos-order-total">
              <span>Total a Pagar</span>
              <span>$ 4,200.00</span>
            </div>
          </div>
        </div>
        <div class="pos-right">
          <div style="background:#444; padding:12px; border-radius:6px; text-align:center; color:#FFF; font-weight:bold;">
            Cliente: Consumidor Final
          </div>
          <div style="background:#714B67; color:#FFF; font-size:22px; font-weight:800; padding:16px; border-radius:6px; text-align:center; cursor:pointer; box-shadow:0 4px 12px rgba(113,75,103,0.4);" class="highlight-active">
            PAGO
          </div>
          <div class="pos-keyboard" style="opacity:0.5; pointer-events:none;">
            <div class="pos-key">1</div><div class="pos-key">2</div><div class="pos-key">3</div>
            <div class="pos-key">4</div><div class="pos-key">5</div><div class="pos-key">6</div>
          </div>
        </div>
      </div>
    `;
  } else if (step.mockType === 'pos-cierre') {
    posBodyHtml = `
      <div style="display:flex; align-items:center; justify-content:center; height:100%; width:100%; background:#2E2E2E;">
        <div style="width:400px; background:#FFF; border-radius:8px; padding:24px; box-shadow:0 8px 32px rgba(0,0,0,0.4); color:#333;">
          <h3 style="color:#714B67; border-bottom:2px solid #F0ECEF; padding-bottom:8px; margin-bottom:16px;">Cierre y Balance de Caja</h3>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:13px; margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between;"><span>Efectivo Teórico (Sistema):</span><strong>$ 9,200.00</strong></div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span>Dinero Físico en Caja:</span>
              <input type="text" class="form-value-input highlight-active" value="9200.00" style="width:100px; text-align:right; padding:4px;" />
            </div>
            <div style="display:flex; justify-content:space-between; color:#10B981;"><span>Diferencia:</span><strong>$ 0.00 (Cuadrado)</strong></div>
          </div>
          <button class="btn-nav btn-nav-next" style="width:100%; justify-content:center; padding:12px; font-size:13px;">Cerrar sesión y publicar asientos</button>
        </div>
      </div>
    `;
  } else {
    // Pantallas de Cobro (Payment Terminal Mock)
    let amountCharged = '$ 4,200.00';
    let paymentText = 'Seleccionar Método de Pago';
    let isValidateHighlight = '';
    
    // Configuración específica de cobro según el paso actual
    let activeBtnIndex = -1;
    let refPlaceholder = '';
    let refVal = '';
    let isRefHighlight = '';
    
    if (step.mockType === 'pos-pago-efectivo') {
      activeBtnIndex = 0;
      paymentText = 'Cobro Efectivo';
      refPlaceholder = 'Comentarios de caja';
      isValidateHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-debito') {
      activeBtnIndex = 2;
      paymentText = 'Cobro Débito Posnet';
      refPlaceholder = 'Nº Comprobante Posnet';
      refVal = '1042';
      isRefHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-credito') {
      activeBtnIndex = 4;
      paymentText = 'Cobro Tarjeta Crédito';
      refPlaceholder = 'Nº Cupón Tarjeta';
      refVal = '9042';
      isRefHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-mercadopago') {
      activeBtnIndex = 5;
      paymentText = 'Cobro MercadoPago';
      refPlaceholder = 'ID de Pago MercadoPago';
      refVal = 'MP-83948';
      isRefHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-banco') {
      activeBtnIndex = 6;
      paymentText = 'Cobro Transferencia Bancaria';
      refPlaceholder = 'Nº Transacción Bancaria';
      refVal = 'TX-483849';
      isRefHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-financieras') {
      activeBtnIndex = 8;
      paymentText = 'Financiación Especial';
      refPlaceholder = 'Nº Aprobación Crédito';
      refVal = 'GO-2834';
      isRefHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-cheque') {
      activeBtnIndex = 12;
      paymentText = 'Cobro Cheque';
      refPlaceholder = 'Banco + Nº Cheque + CUIT';
      refVal = 'Banco Nación - Nº 28491 - CUIT 27-38249-2';
      isRefHighlight = 'highlight-active';
    } else if (step.mockType === 'pos-pago-cuenta') {
      activeBtnIndex = 14;
      paymentText = 'Cobro Cuenta Corriente';
      refPlaceholder = 'Límite disponible: $15,000';
      refVal = 'Aprobado - Enviar a Cuenta';
      isRefHighlight = 'highlight-active';
    }
    
    // Generar listado de botones de pagos habilitados
    const payBtns = [
      { name: 'Efectivo', img: 'iconos/efectivo.jpg' },
      { name: 'Efectivo C2', img: 'iconos/efectivo_c2.jpg' },
      { name: 'Débito', img: 'iconos/debito.jpg' },
      { name: 'Tarj Débito', img: 'iconos/tarjeta_debito.jpg' },
      { name: 'Tarj Crédito', img: 'iconos/tarjetas_credito.jpg' },
      { name: 'MercadoPago', img: 'iconos/mercadopago.jpg' },
      { name: 'Banco', img: 'iconos/banco.jpg' },
      { name: 'Go Cuotas', img: 'iconos/go_cuotas.jpg' },
      { name: 'Credicompras', img: 'iconos/credicompras.jpg' },
      { name: 'Neacred', img: 'iconos/neacred.jpg' },
      { name: 'Ahora Cabal', img: 'iconos/planes_ahora_cabal.jpg' },
      { name: 'Tarjeta Naranja', img: 'iconos/tarjeta_naranja.jpg' },
      { name: 'Tarjeta Tuya', img: 'iconos/tarjeta_tuya.jpg' },
      { name: 'Visa', img: 'iconos/visa.jpg' },
      { name: 'Cheque', img: 'iconos/cheque.jpg' },
      { name: 'Cuenta Cliente', img: 'iconos/cuenta_cliente.jpg' }
    ];
    
    let payBtnsHtml = '';
    payBtns.forEach((btn, index) => {
      let activeClass = index === activeBtnIndex ? 'active' : '';
      payBtnsHtml += `
        <button class="pos-pay-btn ${activeClass}">
          <img src="${btn.img}" alt="${btn.name}" onerror="this.src='https://placehold.co/32?text=${btn.name.substring(0,2)}'" />
          <span>${btn.name}</span>
        </button>
      `;
    });
    
    posBodyHtml = `
      <div class="pos-main">
        <div class="pos-left" style="background:#2C2C2C; padding:20px; color:#FFF;">
          <h3 style="color:#714B67; margin-bottom:12px; border-bottom:1px solid #444; padding-bottom:6px;">Pantalla de Pagos</h3>
          <div style="font-size:12px; color:#AAA; margin-bottom:16px;">Cobrando a: **Consumidor Final**</div>
          
          <div style="background:#1A1A1A; border-radius:6px; padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; font-size:14px;">
              <span>Total a Cobrar:</span>
              <strong style="color:#FFF;">${amountCharged}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:14px; color:#10B981;">
              <span>Método seleccionado:</span>
              <strong>${paymentText}</strong>
            </div>
          </div>
          
          <div style="margin-top:20px; display:flex; flex-direction:column; gap:6px;">
            <label style="font-size:11px; text-transform:uppercase; color:#AAA; font-weight:bold;">Referencia de Cobro / Cupón</label>
            <input type="text" placeholder="${refPlaceholder}" value="${refVal}" class="form-value-input ${isRefHighlight}" style="background:#1A1A1A; color:#FFF; border:1px solid #444; padding:10px;" />
          </div>
        </div>
        <div class="pos-right">
          <label style="font-size:11px; text-transform:uppercase; color:#AAA; font-weight:bold;">Medios de Pago Habilitados</label>
          <div class="pos-payment-methods">
            ${payBtnsHtml}
          </div>
          <button class="pos-key-validate pos-key ${isValidateHighlight}">
            VALIDAR COBRO Y EMITIR TICKET
          </button>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="pos-simulator-container">
      <div class="pos-header">
        <div>● Dodo POS (Terminal de Sucursal)</div>
        <div style="display:flex; gap:12px;">
          <span>Caja Activa: Nº 1</span>
          <span style="background:#10B981; color:#FFF; padding:2px 6px; border-radius:10px; font-size:11px;">CONECTADO</span>
        </div>
      </div>
      ${posBodyHtml}
    </div>
  `;
}

// -------------------------------------------------------------
// BÚSQUEDA Y FILTRADO GLOBAL DINÁMICO
// -------------------------------------------------------------
function handleSearch(query) {
  query = query.toLowerCase().trim();
  if (query === '') {
    // Si la búsqueda está vacía, recargar el módulo o sección activa
    if (currentModule) {
      if (currentSectionIdx !== null) {
        loadSection(currentModule, currentSectionIdx, currentStepIndex);
      } else {
        loadModule(currentModule, currentStepIndex);
      }
    } else {
      showHome();
    }
    return;
  }
  
  // Buscar en todos los pasos de todos los módulos y opciones
  let results = [];
  
  Object.keys(manualData).forEach(moduleKey => {
    const module = manualData[moduleKey];
    const parentKey = (moduleKey === 'pos_medios_pago') ? 'pos_medios_pago' : 'inventario';
    if (!hasPermission(parentKey)) return;

    if (module.sections) {
      // Módulos jerárquicos (Punto de Venta)
      module.sections.forEach((section, secIdx) => {
        if (!hasPermission(parentKey, section.title)) return;
        
        (section.subsections || []).forEach((sub, subIdx) => {
          const isSectionMatch = section.title.toLowerCase().includes(query);
          const isSubMatch = sub.title.toLowerCase().includes(query);
          
          (sub.steps || []).forEach(step => {
            const isStepTitleMatch = step.title.toLowerCase().includes(query);
            const isStepTextMatch = step.text.toLowerCase().includes(query);
            const isStepActionMatch = (step.actionText || '').toLowerCase().includes(query);
            
            if (isSectionMatch || isSubMatch || isStepTitleMatch || isStepTextMatch || isStepActionMatch) {
              const flatSteps = getFlatSteps(module);
              const stepIndex = flatSteps.indexOf(step);
              results.push({
                type: 'step',
                moduleKey: moduleKey,
                sectionIdx: secIdx,
                subIdx: subIdx,
                stepIndex: stepIndex,
                title: step.title,
                text: step.text,
                path: `${module.title.split(' (')[0]} ➔ ${section.title} ➔ ${sub.title}`
              });
            }
          });
        });
      });
    } else if (module.steps) {
      // Módulos planos (Inventario)
      module.steps.forEach((step, stepIdx) => {
        const isModuleMatch = module.title.toLowerCase().includes(query);
        const isStepTitleMatch = step.title.toLowerCase().includes(query);
        const isStepTextMatch = step.text.toLowerCase().includes(query);
        const isStepActionMatch = (step.actionText || '').toLowerCase().includes(query);
        
        if (isModuleMatch || isStepTitleMatch || isStepTextMatch || isStepActionMatch) {
          results.push({
            type: 'flat_step',
            moduleKey: moduleKey,
            stepIndex: stepIdx,
            title: step.title,
            text: step.text,
            path: `${module.title} ➔ Paso ${stepIdx + 1}`
          });
        }
      });
    }
  });
  
  // Mostrar resultados en la barra lateral en tiempo real
  renderSearchResults(results);
}

function selectSearchResult(result) {
  DOM.searchBar.value = '';
  
  if (result.type === 'step') {
    isHomeMode = false;
    currentModule = result.moduleKey;
    currentSectionIdx = result.sectionIdx;
    
    // Expandir únicamente la subsección seleccionada y colapsar las demás
    openSubsections.clear();
    openSubsections.add(result.subIdx);
    
    // Posicionar el paso activo
    currentStepIndex = result.stepIndex;
    
    // Forzar actualización total del DOM
    updateActiveStepUI();
  } else {
    // Para módulos planos
    loadModule(result.moduleKey, result.stepIndex);
  }
}

function renderSearchResults(results) {
  DOM.stepsList.innerHTML = '';
  
  if (results.length === 0) {
    DOM.stepsList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
        No se encontraron coincidencias.
      </div>
    `;
    return;
  }
  
  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'step-card';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.gap = '6px';
    card.style.padding = '14px';
    card.style.margin = '4px 0';
    
    card.addEventListener('click', () => {
      selectSearchResult(result);
    });
    
    card.innerHTML = `
      <div style="font-size: 9px; font-weight: 700; color: var(--odoo-primary); text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85; line-height: 1.3;">
        ${result.path}
      </div>
      <div style="display: flex; gap: 10px; align-items: flex-start; width: 100%;">
        <div class="step-number-badge" style="width: 20px; height: 20px; font-size: 10px; background: rgba(113, 75, 103, 0.08);">🔍</div>
        <div class="step-card-content" style="flex: 1; gap: 2px;">
          <h4 class="step-card-title" style="font-size: 13px; font-weight: 700; margin: 0; line-height: 1.35;">${result.title}</h4>
        </div>
      </div>
    `;
    DOM.stepsList.appendChild(card);
  });
}

// -------------------------------------------------------------
// ENLACE DE EVENTOS E INICIALIZACIÓN
// -------------------------------------------------------------
function initApp() {
  initTheme();
  
  // Registrar controles de perfil
  const switchBtn = document.getElementById('profile-switch-btn');
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      showProfileSelector();
    });
  }

  // Registrar botón para cerrar sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
    });
  }

  // Registrar botón para colapsar la barra lateral
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const appContainer = document.querySelector('.app-container');
  if (sidebarToggle && appContainer) {
    sidebarToggle.addEventListener('click', () => {
      appContainer.classList.toggle('sidebar-collapsed');
    });
  }
  
  // Registrar eventos de navegación de barra lateral
  document.querySelectorAll('.nav-list li').forEach(li => {
    li.addEventListener('click', () => {
      const moduleKey = li.dataset.module;
      if (!moduleKey) return; // p.ej. nav-home no tiene data-module
      if (li.dataset.sectionIdx !== undefined) {
        loadSection(moduleKey, parseInt(li.dataset.sectionIdx));
      } else {
        loadModule(moduleKey, 0);
      }
    });
  });
  
  // Registrar controles de pie de visualizador (Anterior / Siguiente)
  DOM.btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      updateActiveStepUI();
    }
  });
  
  DOM.btnNext.addEventListener('click', () => {
    const steps = getFlatSteps(manualData[currentModule]);
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      updateActiveStepUI();
    }
  });
  
  // Búsqueda en tiempo real
  DOM.searchBar.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });
  
  // Hacer el logo/header de la barra lateral clickeable para volver al inicio
  const sidebarLogo = document.querySelector('.sidebar-header');
  if (sidebarLogo) {
    sidebarLogo.style.cursor = 'pointer';
    sidebarLogo.title = 'Volver al Índice Principal';
    sidebarLogo.addEventListener('click', () => showHome());
  }

  // Botón Inicio en nav
  const navHomeBtn = document.getElementById('nav-home');
  if (navHomeBtn) {
    navHomeBtn.addEventListener('click', () => {
      window.location.hash = ''; // Limpiar hash para volver a home
      showHome();
    });
  }

  // Inicializar mapa de enlaces directos
  buildSlugMap();

  // Controlar flujo de ingreso (Perfil -> App)
  if (!activeProfile) {
    showProfileSelector();
  } else {
    updateProfileUI();
    applyProfileAccessToSidebar();
    handleHashRoute();
  }

  // Escuchar cambios de hash en la barra de direcciones
  window.addEventListener('hashchange', handleHashRoute);
}

// Carga Inicial
document.addEventListener('DOMContentLoaded', initApp);

window.toggleSidebarSection = function(headerEl) {
  const listEl = headerEl.nextElementSibling;
  if (!listEl || !listEl.classList.contains('nav-list')) return;
  
  const isCollapsed = listEl.classList.toggle('section-collapsed');
  headerEl.classList.toggle('collapsed', isCollapsed);
};

// -------------------------------------------------------------
// LÓGICA DE CONTROL DE ACCESO POR PERFIL
// -------------------------------------------------------------
function showProfileSelector() {
  const overlay = document.getElementById('profile-selector-overlay');
  const grid = document.getElementById('profile-cards-grid');
  if (!overlay || !grid) return;

  grid.innerHTML = '';
  Object.keys(PROFILES_CONFIG).forEach(key => {
    const p = PROFILES_CONFIG[key];
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.style.setProperty('--card-border-color', p.color);
    card.innerHTML = `
      <div class="profile-card-icon" style="color:${p.color};">${p.icon}</div>
      <h3 class="profile-card-title">${p.name}</h3>
    `;
    card.addEventListener('click', () => {
      selectProfile(key);
    });
    grid.appendChild(card);
  });

  // Asegurar que login está oculto y perfil visible
  const loginOverlay = document.getElementById('login-overlay');
  if (loginOverlay) loginOverlay.classList.add('hidden');
  overlay.classList.remove('hidden');
}

function resetSidebarUI() {
  const headers = document.querySelectorAll('.nav-section-title');
  headers.forEach(header => {
    header.classList.add('collapsed');
    const nextList = header.nextElementSibling;
    if (nextList && nextList.classList.contains('nav-list')) {
      nextList.classList.add('section-collapsed');
    }
  });
}

function resetNavigationState() {
  currentModule = null;
  currentStepIndex = 0;
  lastActiveStepIndex = -1;
  currentSectionIdx = null;
  isHomeMode = true;
  visitedSteps = {};
  openSubsections.clear();
  initialSectionLoad = true;
  resetSidebarUI(); // Limpiar y colapsar todo el menú lateral
}

function selectProfile(key) {
  resetNavigationState();
  activeProfile = key;
  localStorage.setItem('dodo-profile', key);
  
  const overlay = document.getElementById('profile-selector-overlay');
  if (overlay) overlay.classList.add('hidden');
  
  // Actualizar UI del indicador
  updateProfileUI();
  
  // Volver a Home con el filtro del perfil aplicado
  showHome();
  
  // Aplicar acceso al sidebar
  applyProfileAccessToSidebar();
}

function updateProfileUI() {
  const nameEl = document.getElementById('active-profile-name');
  if (nameEl) {
    if (activeProfile && PROFILES_CONFIG[activeProfile]) {
      nameEl.textContent = PROFILES_CONFIG[activeProfile].name;
    } else {
      nameEl.textContent = "Sin seleccionar";
    }
  }
}

function applyProfileAccessToSidebar() {
  if (!activeProfile) return;
  
  // 1. Mostrar/Ocultar títulos de sección (Módulo de Inventario / Punto de Venta)
  const headers = document.querySelectorAll('.nav-section-title');
  headers.forEach(header => {
    const nextList = header.nextElementSibling;
    if (nextList && nextList.classList.contains('nav-list')) {
      const moduleKey = nextList.querySelector('li')?.dataset.module;
      if (moduleKey) {
        const allowed = hasPermission(moduleKey);
        header.style.display = allowed ? '' : 'none';
        nextList.style.display = allowed ? '' : 'none';
      }
    }
  });

  // 2. Mostrar/Ocultar ítems individuales si los permisos de subsecciones no fueran "all"
  document.querySelectorAll('.nav-list li').forEach(li => {
    const moduleKey = li.dataset.module;
    if (moduleKey) {
      const sectionIdx = parseInt(li.dataset.sectionIdx);
      const moduleDataObj = manualData[moduleKey];
      if (moduleDataObj && moduleDataObj.sections && moduleDataObj.sections[sectionIdx]) {
        const secTitle = moduleDataObj.sections[sectionIdx].title;
        const allowed = hasPermission(moduleKey, secTitle);
        li.style.display = allowed ? '' : 'none';
      }
    }
  });
}

// -------------------------------------------------------------
// LÓGICA DE LOGUEO Y AUTENTICACIÓN
// -------------------------------------------------------------
function showLoginScreen() {
  const loginOverlay = document.getElementById('login-overlay');
  const profileOverlay = document.getElementById('profile-selector-overlay');
  if (profileOverlay) profileOverlay.classList.add('hidden');
  if (loginOverlay) loginOverlay.classList.remove('hidden');
}

window.handleLoginSubmit = function() {
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const errorMsg = document.getElementById('login-error-msg');
  if (!emailInput || !passwordInput) return;

  const typedEmail = emailInput.value.trim();
  const typedPassword = passwordInput.value;

  if (typedEmail === LOGIN_CONFIG.email && typedPassword === LOGIN_CONFIG.password) {
    isLoggedIn = true;
    localStorage.setItem('dodo-logged-in', 'true');
    if (errorMsg) errorMsg.style.display = 'none';
    
    // Pasar a la pantalla de selección de perfil
    showProfileSelector();
  } else {
    if (errorMsg) errorMsg.style.display = 'flex';
    // Animación de sacudida (shake) para feedback de error
    const card = document.querySelector('#login-overlay .profile-card-container');
    if (card) {
      card.style.animation = 'none';
      setTimeout(() => {
        card.style.animation = 'shake 0.5s ease';
      }, 10);
    }
  }
};

function logout() {
  resetNavigationState();
  activeProfile = null;
  localStorage.removeItem('dodo-profile');
  
  // Mostrar pantalla de selección de perfil
  showProfileSelector();
}

window.printSubmoduleSteps = function(moduleKey, sectionIdx, subIdx) {
  const module = manualData[moduleKey];
  const section = module.sections[sectionIdx];
  const sub = section.subsections[subIdx];
  
  if (!sub) return;

  const dateStr = PRINT_TEMPLATE_CONFIG.showPrintDate ? new Date().toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : "";

  // Generar filas de pasos
  let stepsHtml = "";
  (sub.steps || []).forEach((step, idx) => {
    stepsHtml += `
      <div class="print-step">
        <div class="print-step-header">
          <span class="print-step-num">${idx + 1}</span>
          <span class="print-step-title">${step.title}</span>
        </div>
        <div class="print-step-desc">${step.text}</div>
        ${step.actionText ? `<div class="print-step-action"><strong>Acción:</strong> ${step.actionText}</div>` : ""}
      </div>
    `;
  });

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Imprimir - ${sub.title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          color: #1f2937;
          margin: 40px;
          line-height: 1.6;
          font-size: 16.5px;
          counter-reset: page;
        }
        .print-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid ${PRINT_TEMPLATE_CONFIG.themeColor};
          padding-bottom: 16px;
          margin-bottom: 30px;
        }
        .print-logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .print-logo {
          background: ${PRINT_TEMPLATE_CONFIG.themeColor};
          color: #FFF;
          font-weight: 800;
          font-size: 18px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        .print-logo-text {
          font-weight: 700;
          font-size: 20px;
          color: ${PRINT_TEMPLATE_CONFIG.themeColor};
        }
        .print-system-name {
          font-size: 14px;
          color: #6b7280;
        }
        .print-title-area {
          margin-bottom: 28px;
        }
        .print-module {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6b7280;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .print-submodule {
          font-size: 25px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        .print-step {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .print-step-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .print-step-num {
          background: ${PRINT_TEMPLATE_CONFIG.themeColor};
          color: #FFF;
          font-weight: 700;
          font-size: 14px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .print-step-title {
          font-weight: 700;
          font-size: 18px;
          color: #111827;
        }
        .print-step-desc {
          font-size: 15.5px;
          color: #374151;
          margin-bottom: 10px;
          padding-left: 40px;
        }
        .print-step-action {
          font-size: 14px;
          color: #4b5563;
          background: #f3f4f6;
          padding: 10px 14px;
          border-radius: 4px;
          margin-left: 40px;
          border-left: 3px solid ${PRINT_TEMPLATE_CONFIG.themeColor};
        }
        @page {
          size: auto;
          margin: 20mm 20mm 20mm 20mm;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print-header {
            border-bottom: 2px solid ${PRINT_TEMPLATE_CONFIG.themeColor} !important;
          }
          .print-step {
            border: 1px solid #e5e7eb !important;
            background: transparent !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <table style="width: 100%; border-collapse: collapse; border: none; margin: 0; padding: 0;">
        <thead>
          <tr>
            <td style="border: none; padding: 0;">
              <div class="print-header">
                <div class="print-logo-area">
                  ${PRINT_TEMPLATE_CONFIG.showLogo ? `
                    <div class="print-logo" style="display: flex; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; color: #FFF;">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    </div>
                  ` : ""}
                  <span class="print-logo-text">${PRINT_TEMPLATE_CONFIG.logoText}</span>
                </div>
                <span class="print-system-name">${PRINT_TEMPLATE_CONFIG.systemName}</span>
              </div>
              
              <div class="print-title-area">
                <div class="print-module">${module.title} &middot; ${section.title}</div>
                <h1 class="print-submodule">Submódulo: ${sub.title}</h1>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: none; padding: 0;">
              <div class="print-steps-list">
                ${stepsHtml}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() { window.close(); }, 500);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
};


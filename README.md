## 🗺️ Roadmap Frontend (Next.js)  

### 🌟 **Fase 1: MVP Funcional**  
**🎯 Objetivo:** Interfaz básica conectada al backend  
**🔧 Tecnologías Clave:**  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

📋 **Tareas Detalladas:**  
1. **Configuración inicial del proyecto**:  
   - Crear proyecto con Next.js 14 (App Router) + TypeScript.  
   - Configurar estructura de carpetas: `/autenticacion`, `/panel`, `/catalogo`.  
   

2. **Sistema de autenticación visual**:  
   - Usar NextAuth.js para manejar 2 roles:    
     - **Vendedor**: Gestión de inventario y órdenes.  
     - **Cliente**: Compra y seguimiento de pedidos.  
   - Diseñar pantallas de login/registro con componentes de **shadcn/ui**.  

3. **Vistas principales**:  
   - **Catálogo de vehículos**:  
     - Tabla filtrable por marca/año .  
     - Modal para añadir nuevos vehículos con validación.  
   - **Listado de repuestos**:  
     - Grid de cards responsive con imágenes optimizadas.  
     - Botones de acción rápida (añadir al carrito/favoritos).  
   - **Carrito de compras**:    
     - Resumen de compra con cálculo de impuestos.  

---

### 🎨 **Fase 2: Experiencia de Usuario Avanzada**  
**🎯 Objetivo:** Interfaz fluida y optimizada  
**🔧 Tecnologías Clave:**  
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=react-query&logoColor=white)

📋 **Tareas Detalladas:**  
1. **Búsqueda inteligente**:  
   - Autocompletado predictivo.  
   - Filtros por compatibilidad usando chips seleccionables.  
   - Historial de búsquedas almacenado en localStorage.  

2. **Componentes interactivos**:  
   - Galería de imágenes con zoom.  
   - Comparador de repuestos con arrastrar/soltar (dnd-kit).  
   - Transiciones suaves entre páginas.  

3. **Optimizaciones clave**:    
   - Convertir imágenes a WebP usando Image de Next.js.  

4. **Sistema de diseño**:  
   - Diseñar tema oscuro/claro con variables CSS.  

---

### 📈 **Fase 3: Soporte a Business Intelligence**  
**🎯 Objetivo:** Integración con analítica y recomendaciones del backend  
**🔧 Tecnologías Clave:**  
![React ChartJS](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)
![React Table](https://img.shields.io/badge/TanStack_Table-FF4154?style=flat&logo=react-table&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=flat&logo=websocket&logoColor=white)

📋 **Tareas Detalladas:**  
1. **Paneles de control**:  
   - Gráficos en tiempo real (ventas/inventario).  

2. **Sistema de recomendaciones**:  
   - Sección "Clientes también compraron..." (datos del backend).  
   - Carrusel de repuestos populares por categoría.  

3. **Automatizaciones frontend**:  
   - Notificaciones push para alertas de stock.  
   - Recordatorios de carrito abandonado.  

4. **Generación de reportes**:  
   - Exportar datos a PDF (usar **pdf-lib**).  
   - Botón "Descargar Excel" con datos filtrados.  

---

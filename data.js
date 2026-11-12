// Contenido de las listas. Para agregar o cambiar puntos, edita este archivo.
// "reset: true" = lista que se repite cada turno (se puede reiniciar con un botón).
window.CHECKLISTS = [
  {
    id: "prep",
    name: "Antes de abrir",
    desc: "Todo lo que hay que tener listo antes del día de apertura, para no salir corriendo a última hora.",
    reset: false,
    sections: [
      { id: "legal", title: "Permisos y legal", hint: "Los nombres exactos cambian según el país y la municipalidad: confirmar con el contador o abogado.", items: [
        "Permiso de funcionamiento / patente comercial vigente",
        "Permiso sanitario de funcionamiento (salud)",
        "Licencia de licores, si se va a vender alcohol",
        "Uso de suelo y aforo aprobado para 200–300 personas",
        "Inspección de bomberos aprobada (extintores, salidas, plan de emergencia)",
        "Permiso por humo/emisiones del ahumador y revisión con vecinos",
        "Carné de manipulación de alimentos de todo el personal de cocina y salón",
        "Pólizas: responsabilidad civil, incendio y riesgos del trabajo",
        "Inscripción tributaria y facturación electrónica funcionando",
        "Contratos laborales firmados y personal inscrito en la seguridad social",
        "Permiso de música (derechos de autor) y de rótulo exterior",
        "Contrato de alquiler revisado: horarios, ruido, remodelaciones permitidas"
      ]},
      { id: "local", title: "Local e instalaciones", items: [
        "Electricidad: probar TODA la cocina encendida a la vez sin que salten los breakers",
        "Planta eléctrica o plan claro en caso de apagón",
        "Gas: instalación certificada, detector de fugas y tanque de respaldo",
        "Agua: buena presión, agua caliente y tanque de reserva",
        "Trampa de grasa instalada y con calendario de limpieza",
        "Campanas de extracción con sistema contra incendios y filtros limpios",
        "Aire acondicionado / ventilación del salón (que el humo no llegue a las mesas)",
        "Baños suficientes para el aforo, con uno accesible",
        "Iluminación de salón, cocina, exterior y luces de emergencia",
        "Salidas de emergencia señalizadas y despejadas",
        "Rampas y accesos para sillas de ruedas y coches de bebé",
        "Parqueo, rótulo y entrada bien señalizados",
        "Control de plagas contratado y primera fumigación hecha",
        "Zona de basura, reciclaje y aceite usado con recolección contratada",
        "Internet principal y un respaldo (segundo proveedor o datos móviles)",
        "Cámaras de seguridad, alarma y caja fuerte"
      ]},
      { id: "equipo", title: "Cocina: equipo", items: [
        "Cuartos fríos y refrigeradoras con termómetro visible, ya probados 48 h",
        "Congeladores probados 48 h",
        "Estufas, planchas, parrilla, freidoras y hornos instalados y probados",
        "Baño maría / mantenedores de calor para la línea",
        "Mesas de acero, estanterías y carros de transporte",
        "Lavaplatos industrial con sus químicos y canastas",
        "Fregaderos separados: lavado de manos, vegetales y ollas",
        "Máquina de hielo con capacidad para bar + cocina",
        "Rebanadora, procesador, licuadoras y batidora",
        "Empacadora al vacío y bolsas",
        "Básculas (recepción y porcionado)",
        "Termómetros de sonda, varios, calibrados",
        "Ollas, sartenes, bandejas gastronorm, cuchillos y tablas por color",
        "Recipientes con tapa, etiquetas y marcadores para fechar",
        "Pase de cocina con lámparas de calor y riel de comandas o pantalla",
        "Teléfono del técnico de cada equipo y repuestos básicos (empaques, bombillos, mangueras)"
      ]},
      { id: "ahumados", title: "Ahumados", hint: "Lo más delicado: se cocina con 12–16 horas de anticipación y no se puede improvisar si se acaba.", items: [
        "Ahumador(es) con capacidad para el volumen: calcular kilos por día con el aforo lleno",
        "Leña / carbón / pellets: proveedor fijo, 2 semanas de stock y bodega seca",
        "Ahumador curado y con cocciones de prueba de cada corte",
        "Termómetro de cámara y sondas con alarma",
        "Tiempos y temperaturas escritos por corte (brisket, costilla, cerdo, pollo, etc.)",
        "Turno nocturno definido: quién enciende, quién vigila, quién saca",
        "Mantenedor caliente para reposo y servicio (arriba de 60 °C)",
        "Protocolo de enfriado rápido, empaque y recalentado de sobrantes",
        "Papel de carnicero, aluminio, guantes térmicos, cuchillos de corte y tablas grandes",
        "Rubs, salmueras y salsas con receta estándar por lote",
        "Tabla de rendimiento: cuántas porciones salen por pieza",
        "Plan «se acabó»: cómo se avisa al salón y qué se ofrece en su lugar",
        "Limpieza de grasa y cenizas programada; extintor clase K a mano"
      ]},
      { id: "pasta", title: "Pasta", items: [
        "Cocedor de pasta con canastas (u ollas suficientes para hora pico)",
        "Laminadora / máquina de pasta si es fresca, con repuestos",
        "Método de precocción y porcionado definido para salir rápido",
        "Salsas base por lote, con receta y gramaje",
        "Sartenes de salteo suficientes para todas las hornillas en hora pico",
        "Quesos, ralladores y aceites de terminación",
        "Opción sin gluten con olla y utensilios separados",
        "Tiempo objetivo por plato medido con cronómetro"
      ]},
      { id: "menu", title: "Menú y recetas", items: [
        "Menú final con precios y costeo de cada plato",
        "Ficha técnica con foto, gramaje y emplatado de cada plato",
        "Lista de alérgenos por plato para los meseros",
        "Menús impresos, código QR y menú infantil",
        "Todos los platos cargados en el sistema de caja con modificadores (término, sin…, extra…)",
        "Degustación del menú completo con todo el personal",
        "Menú reducido de apertura: qué platos se quitan si la cocina se satura",
        "Lista de mise en place y cantidades mínimas por estación"
      ]},
      { id: "salon", title: "Salón y mesas", items: [
        "Mesas y sillas instaladas, numeradas y con plano impreso",
        "Mesas que no cojean y sillas revisadas una por una",
        "Sillas para bebé y espacio para grupos grandes",
        "Vajilla, cubiertos y cristalería: de 2 a 3 veces el aforo",
        "Servilletas, saleros, salsas de mesa y portamenús",
        "Estaciones de servicio para meseros (cubiertos, agua, servilletas, pulidos)",
        "Bandejas, charolas y soportes",
        "Puesto de anfitrión con sistema de reservas y lista de espera",
        "Secciones por mesero y corredores de comida definidos",
        "Música, volumen y parlantes por zona",
        "Rotulación interna: baños, salida, caja, área de espera",
        "Empaques para llevar y bolsas"
      ]},
      { id: "bar", title: "Bar y bebidas", items: [
        "Carta de bebidas con recetas y medidas estándar",
        "Cristalería de bar, cocteleras, medidores y abridores",
        "Refrigeración de bar, dispensadores y cerveza de barril probados",
        "Máquina de café y molino calibrados",
        "Inventario inicial de licores, cervezas, refrescos, agua y jugos",
        "Hielo: quién lo repone y cada cuánto"
      ]},
      { id: "personal", title: "Personal", items: [
        "Organigrama: quién manda en cocina, en salón y quién decide si falta el dueño",
        "Cocina completa: jefe, ahumador, pasta, parrilla/línea, fríos, preparación, lavaplatos",
        "Salón completo: capitán, meseros, corredores, anfitrión, bar, caja, limpieza, seguridad",
        "Horarios de las dos primeras semanas con personal extra",
        "Uniformes, delantales, gafetes y zapatos antideslizantes",
        "Capacitación: menú, pasos del servicio, sistema de caja, higiene y emergencias",
        "Manual corto por puesto y lista de tareas de apertura y cierre",
        "Política de propinas, descuentos, cortesías y comida de personal",
        "Lista de suplentes para cubrir ausencias",
        "Grupo de comunicación del equipo y contactos de emergencia"
      ]},
      { id: "proveedores", title: "Proveedores e inventario", items: [
        "Carnes: proveedor principal y uno de respaldo, con cortes y pesos acordados",
        "Pasta/harinas, lácteos, vegetales, abarrotes y pan: proveedor por categoría",
        "Calendario de entregas y horario de recepción",
        "Primer pedido grande hecho y confirmado",
        "Inventario inicial contado y cantidades mínimas definidas",
        "Recepción: báscula, termómetro y persona responsable de revisar",
        "Productos de limpieza, químicos y papel (baños, cocina)",
        "Desechables, empaques para llevar y bolsas de basura",
        "Gas, leña y hielo con pedido recurrente",
        "Condiciones de pago y crédito con cada proveedor"
      ]},
      { id: "tecnologia", title: "Caja, sistema y cobro", items: [
        "Sistema de caja configurado: mesas, usuarios, permisos e impuestos",
        "Impresora o pantalla de comandas en cada estación (ahumados, pasta, fríos, bar)",
        "Datáfonos (idealmente de dos bancos) y pagos por teléfono",
        "Factura electrónica emitida de prueba",
        "Fondo de caja y cambio en billetes y monedas",
        "Wi-Fi de clientes separado del Wi-Fi del sistema",
        "Teléfono, WhatsApp y correo del restaurante",
        "Plan manual si se cae el sistema: comandas de papel, calculadora y precios impresos",
        "Papel para impresoras y datáfonos de repuesto",
        "Decidir si hay servicio a domicilio desde el día 1 (mejor esperar unas semanas)"
      ]},
      { id: "higiene", title: "Higiene y seguridad", items: [
        "Plan de limpieza diario, semanal y mensual con responsables",
        "Hojas de registro de temperaturas (frío, calor, ahumador)",
        "Estaciones de lavado de manos con jabón, toallas y sanitizante",
        "Almacenamiento ordenado: crudos abajo, cocidos arriba, primero en entrar primero en salir",
        "Químicos guardados lejos de los alimentos",
        "Botiquín completo y personal capacitado en primeros auxilios y atragantamiento",
        "Extintores revisados y personal que sabe usarlos",
        "Pisos antideslizantes, alfombras de cocina y rótulos de piso mojado",
        "Simulacro de evacuación con el personal"
      ]},
      { id: "marketing", title: "Mercadeo e inauguración", items: [
        "Ficha de Google Maps con horario, fotos, menú y teléfono",
        "Redes sociales con fotos profesionales de los platos",
        "Fecha de apertura y horario anunciados",
        "Sistema de reservas abierto y alguien que conteste mensajes",
        "Lista de invitados para los ensayos",
        "Quién responde reseñas y quejas, y con qué tono"
      ]},
      { id: "ensayos", title: "Ensayos generales", hint: "Con este tamaño de restaurante, no abrir sin al menos dos ensayos.", items: [
        "Ensayo 1: familia y amigos al 30 % del aforo, menú reducido",
        "Ensayo 2: 60 % del aforo con menú completo",
        "Prueba de estrés: muchas mesas ordenando al mismo tiempo",
        "Medir tiempos: de la orden a la mesa, por estación",
        "Simular fallas: se cae el sistema, se va la luz, se acaba un plato",
        "Probar el ciclo completo de ahumado nocturno y servicio al día siguiente",
        "Reunión con el equipo después de cada ensayo y lista de ajustes",
        "Todos los ajustes resueltos antes de abrir al público"
      ]}
    ]
  },
  {
    id: "apertura",
    name: "Apertura del turno",
    desc: "Recorrido antes de abrir puertas: marca lo que funciona y señala con «Falla» lo que no, para resolverlo antes del primer cliente.",
    reset: true,
    sections: [
      { id: "servicios", title: "Servicios del local", items: [
        "Luz en todas las zonas, sin breakers caídos",
        "Gas abierto y sin olor a fuga",
        "Agua con presión y agua caliente",
        "Internet funcionando (principal y respaldo)",
        "Extracción de cocina encendida",
        "Aire acondicionado / ventilación del salón"
      ]},
      { id: "frio", title: "Frío", items: [
        "Cuartos fríos y refrigeradoras a 4 °C o menos (anotar)",
        "Congeladores a −18 °C o menos (anotar)",
        "Máquina de hielo produciendo y hieleras llenas",
        "Nada vencido: fechas revisadas"
      ]},
      { id: "ahumador", title: "Ahumador", items: [
        "Carnes de la noche listas y con temperatura interna correcta",
        "Carnes en reposo/mantenedor arriba de 60 °C",
        "Porciones disponibles contadas por corte",
        "Cantidades comunicadas al salón y cargadas en el sistema",
        "Leña / carbón suficiente para hoy y para esta noche",
        "Siguiente tanda cargada o programada",
        "Salsas y acompañamientos listos",
        "Estación de corte montada: tablas, cuchillos afilados, papel, guantes"
      ]},
      { id: "pasta", title: "Estación de pasta", items: [
        "Cocedor con agua hirviendo y con sal",
        "Salsas calientes y a temperatura",
        "Pasta porcionada suficiente para el turno",
        "Quesos rallados, hierbas y aceites listos",
        "Sartenes y pinzas suficientes en la estación"
      ]},
      { id: "cocina", title: "Cocina general", items: [
        "Todos los equipos encendidos y a temperatura (plancha, freidoras, hornos)",
        "Mise en place completo en cada estación",
        "Todo etiquetado y fechado",
        "Termómetros y sanitizante en cada estación",
        "Lavaplatos funcionando, con químicos",
        "Lavamanos con jabón y toallas",
        "Lámparas de calor del pase encendidas",
        "Basureros vacíos y con bolsa"
      ]},
      { id: "salon", title: "Salón", items: [
        "Mesas montadas, limpias y alineadas",
        "Pisos limpios y secos",
        "Menús limpios y completos",
        "Estaciones de servicio surtidas (cubiertos, servilletas, agua)",
        "Baños limpios, con papel, jabón y toallas",
        "Luces y música encendidas, volumen correcto",
        "Sillas de bebé limpias y disponibles",
        "Entrada, rótulo y parqueo limpios e iluminados"
      ]},
      { id: "bar", title: "Bar", items: [
        "Hielo, frutas y guarniciones listas",
        "Cervezas y refrescos fríos; barriles con gas",
        "Máquina de café caliente y probada",
        "Cristalería limpia y suficiente"
      ]},
      { id: "caja", title: "Caja y sistema", items: [
        "Sistema de caja abierto con la fecha y el turno correctos",
        "Comanda de prueba impresa en CADA estación",
        "Datáfonos encendidos, con señal, batería y papel",
        "Factura de prueba emitida",
        "Fondo de caja contado y con cambio",
        "Platos agotados bloqueados en el sistema",
        "Reservas y grupos del día revisados"
      ]},
      { id: "equipo", title: "Equipo", items: [
        "Asistencia completa; ausencias cubiertas",
        "Uniformes y presentación revisados",
        "Secciones y puestos asignados",
        "Reunión de 10 minutos: agotados, especiales, reservas, metas del día"
      ]},
      { id: "seguridad", title: "Seguridad", items: [
        "Salidas de emergencia despejadas",
        "Extintores en su lugar",
        "Botiquín completo"
      ]}
    ]
  },
  {
    id: "cierre",
    name: "Cierre",
    desc: "Para dejar todo listo y seguro, y que la apertura de mañana empiece bien.",
    reset: true,
    sections: [
      { id: "ahumador", title: "Ahumador para mañana", items: [
        "Carnes de mañana sazonadas y cargadas según la proyección de ventas",
        "Leña suficiente y temperatura estable",
        "Responsable nocturno confirmado y con alarmas activas",
        "Sobrantes enfriados rápido, empacados y fechados"
      ]},
      { id: "cocina", title: "Cocina", items: [
        "Alimentos guardados, tapados y fechados",
        "Temperaturas de frío anotadas",
        "Equipos apagados; gas cerrado",
        "Freidoras filtradas; plancha y parrilla limpias",
        "Pisos, desagües y trampa de grasa limpios",
        "Basura y reciclaje fuera",
        "Lista de compras y faltantes para mañana enviada"
      ]},
      { id: "salon", title: "Salón y bar", items: [
        "Mesas limpias y montadas para mañana",
        "Baños limpios y surtidos",
        "Bar limpio, inventario rápido de licores",
        "Luces, música y aire apagados"
      ]},
      { id: "caja", title: "Caja", items: [
        "Cierre de caja cuadrado contra el sistema",
        "Datáfonos cerrados (lote enviado)",
        "Propinas repartidas según la política",
        "Efectivo en caja fuerte o depositado",
        "Reporte del día enviado: ventas, agotados, quejas, fallas"
      ]},
      { id: "local", title: "Local", items: [
        "Puertas y ventanas cerradas",
        "Alarma activada y cámaras grabando",
        "Fallas del día reportadas a mantenimiento"
      ]}
    ]
  }
];

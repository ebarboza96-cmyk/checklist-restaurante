// Contenido de las listas. Para agregar o cambiar puntos, edite este archivo.
// "reset: true" = lista que se repite cada turno (se puede reiniciar con un botón).
window.CHECKLISTS = [
  {
    id: "prep",
    name: "Antes de abrir",
    desc: "Todo lo que hay que tener listo antes del día de apertura, para no andar en carreras a última hora.",
    reset: false,
    sections: [
      { id: "legal", title: "Permisos y papeles", hint: "El local es propio, así que no hay contrato de alquiler. Lo demás conviene revisarlo con el contador o el abogado.", items: [
        "Patente municipal al día",
        "Permiso sanitario de funcionamiento del Ministerio de Salud",
        "Patente de licores, si se va a vender guaro, cerveza o vino",
        "Uso de suelo y capacidad aprobada para 200–300 personas",
        "Visto bueno de Bomberos (extintores, salidas, plan de emergencia)",
        "Revisar el tema del humo del ahumador con la Muni y con los vecinos",
        "Carné de manipulación de alimentos de toda la gente de cocina y de salón",
        "Póliza de riesgos del trabajo del INS",
        "Pólizas de incendio y de responsabilidad civil",
        "Inscripción en Hacienda y factura electrónica funcionando",
        "Contratos firmados y toda la planilla inscrita en la Caja",
        "Permiso de música (ACAM) y permiso del rótulo de afuera",
        "Papeles de la propiedad a mano: escritura, plano e impuestos municipales al día"
      ]},
      { id: "local", title: "El local", items: [
        "Electricidad: probar TODA la cocina prendida a la vez sin que se disparen los breakers",
        "Planta eléctrica, o tener claro qué se hace si se va la luz",
        "Gas: instalación revisada por un técnico, detector de fugas y cilindros de repuesto",
        "Agua: buena presión, agua caliente y tanque de reserva por si la cortan",
        "Trampa de grasa instalada y con fechas de limpieza",
        "Campanas de extracción con sistema contra incendios y filtros limpios",
        "Aire acondicionado o abanicos en el salón (que el humo no llegue a las mesas)",
        "Baños suficientes para tanta gente, y uno para personas con discapacidad (Ley 7600)",
        "Luces del salón, la cocina, afuera y luces de emergencia",
        "Salidas de emergencia rotuladas y sin estorbos",
        "Rampas para sillas de ruedas y coches de bebé",
        "Parqueo, rótulo y entrada bien señalados",
        "Fumigación contratada y la primera ya hecha",
        "Lugar para la basura, el reciclaje y el aceite usado, con quien se lo lleve",
        "Internet principal y uno de respaldo (otra compañía o datos del celular)",
        "Cámaras, alarma y caja fuerte"
      ]},
      { id: "equipo", title: "Cocina: equipo", items: [
        "Cámaras frías y refris con termómetro a la vista, probadas 48 horas",
        "Congeladores probados 48 horas",
        "Cocinas, planchas, parrilla, freidoras y hornos instalados y probados",
        "Baño maría y equipo para mantener la comida caliente en la línea",
        "Mesas de acero, estantes y carritos",
        "Máquina lavaplatos con sus químicos y canastas",
        "Pilas separadas: una para lavarse las manos, otra para verduras y otra para ollas",
        "Máquina de hielo que alcance para el bar y la cocina",
        "Rebanadora, procesador, licuadoras y batidora",
        "Empacadora al vacío y bolsas",
        "Romanas (para recibir mercadería y para porcionar)",
        "Termómetros de pincho, varios y revisados",
        "Ollas, sartenes, bandejas, cuchillos y tablas de picar por color",
        "Recipientes con tapa, etiquetas y marcadores para poner la fecha",
        "El pase (donde sale la comida) con lámparas de calor y lugar para las comandas",
        "Teléfono del técnico de cada equipo y repuestos básicos (empaques, bombillos, mangueras)"
      ]},
      { id: "ahumados", title: "Ahumados", hint: "Lo más delicado: se cocina con 12 a 16 horas de anticipación y, si se acaba, no hay cómo improvisar.", items: [
        "Ahumador(es) que den abasto: calcular cuántos kilos por día con el restaurante lleno",
        "Leña o carbón: proveedor fijo, reserva para 2 semanas y bodega seca",
        "Ahumador curado y con pruebas hechas de cada corte",
        "Termómetro del ahumador y termómetros de pincho con alarma",
        "Tiempos y temperaturas apuntados por corte (brisket, costilla, cerdo, pollo, etc.)",
        "Turno de noche definido: quién prende, quién vigila y quién saca la carne",
        "Equipo para reposar y mantener la carne caliente (arriba de 60 °C)",
        "Cómo se enfría, se empaca y se recalienta lo que sobra",
        "Papel de carnicero, papel aluminio, guantes para calor, cuchillos y tablas grandes",
        "Adobos, salmueras y salsas con receta fija",
        "Tabla de rendimiento: cuántas porciones salen de cada pieza",
        "Plan para cuando algo se acaba: cómo se avisa al salón y qué se ofrece a cambio",
        "Limpieza de grasa y ceniza programada; extintor de cocina (tipo K) a mano"
      ]},
      { id: "pasta", title: "Pasta", items: [
        "Cocedor de pasta con canastas (u ollas suficientes para la hora pico)",
        "Máquina de pasta, si es fresca, con repuestos",
        "Definido cómo se precocina y se porciona para que salga rápido",
        "Salsas base hechas en cantidad, con receta y medidas",
        "Sartenes suficientes para todos los quemadores en hora pico",
        "Quesos, ralladores y aceites para terminar el plato",
        "Opción sin gluten, con olla y utensilios aparte",
        "Tiempo de cada plato medido con cronómetro"
      ]},
      { id: "menu", title: "Menú y recetas", items: [
        "Menú final con precios (IVA y 10% de servicio claros) y el costo de cada plato",
        "Receta de cada plato con foto, cantidades y cómo se sirve",
        "Lista de alergias por plato para los saloneros",
        "Menús impresos, código QR y menú de niños",
        "Todos los platos metidos en el sistema de caja con sus opciones (término, sin…, extra…)",
        "Que todo el personal pruebe el menú completo",
        "Menú corto de apertura: qué platos se quitan si la cocina se atrasa",
        "Lista de lo que cada estación tiene que tener picado y listo, con cantidades mínimas"
      ]},
      { id: "salon", title: "Salón y mesas", items: [
        "Mesas y sillas puestas, numeradas y con el plano impreso",
        "Mesas firmes (que no se muevan) y sillas revisadas una por una",
        "Sillas de bebé y espacio para grupos grandes",
        "Platos, cubiertos y vasos: de 2 a 3 veces la capacidad del salón",
        "Servilletas, saleros, salsas de mesa y portamenús",
        "Estaciones para los saloneros (cubiertos, agua, servilletas)",
        "Azafates y soportes para llevar la comida",
        "Puesto en la entrada para recibir a la gente, con reservas y lista de espera",
        "Zonas repartidas por salonero y quién ayuda a sacar la comida",
        "Música, volumen y parlantes por zona",
        "Rótulos adentro: baños, salida, caja, zona de espera",
        "Cajitas y bolsas para llevar"
      ]},
      { id: "bar", title: "Bar y bebidas", items: [
        "Carta de bebidas con recetas y medidas fijas",
        "Copas, vasos, cocteleras, medidores y destapadores",
        "Refris del bar, dispensadores y cerveza de barril probados",
        "Máquina de café y molino ajustados",
        "Inventario inicial de licores, cervezas, gaseosas, agua y frescos naturales",
        "Hielo: quién lo repone y cada cuánto"
      ]},
      { id: "personal", title: "Personal", items: [
        "Quién manda en cocina, quién en salón y quién decide si no está el dueño",
        "Cocina completa: chef, encargado del ahumador, pasta, parrilla/línea, fríos, ayudantes y lavaplatos",
        "Salón completo: capitán, saloneros, ayudantes, quien recibe en la entrada, bar, caja, limpieza y guarda",
        "Horarios de las dos primeras semanas, con gente de más",
        "Uniformes, delantales, gafetes y zapatos antideslizantes",
        "Capacitación: menú, cómo se atiende, sistema de caja, higiene y emergencias",
        "Hojita por puesto con las tareas de abrir y de cerrar",
        "Reglas claras: reparto del 10% de servicio, descuentos, cortesías y comida del personal",
        "Lista de gente para cubrir cuando alguien falta",
        "Chat del equipo y teléfonos de emergencia"
      ]},
      { id: "proveedores", title: "Proveedores e inventario", items: [
        "Carnes: proveedor principal y otro de respaldo, con cortes y pesos acordados",
        "Pasta y harinas, lácteos, verduras, abarrotes y pan: un proveedor para cada cosa",
        "Días de entrega y horario para recibir mercadería",
        "Primer pedido grande hecho y confirmado",
        "Inventario inicial contado y cantidades mínimas definidas",
        "Para recibir mercadería: romana, termómetro y alguien encargado de revisar",
        "Productos de limpieza, químicos y papel (baños y cocina)",
        "Desechables, empaques para llevar y bolsas de basura",
        "Gas, leña y hielo con pedido fijo",
        "Forma de pago y crédito acordados con cada proveedor"
      ]},
      { id: "tecnologia", title: "Caja, sistema y cobro", items: [
        "Sistema de caja listo: mesas, usuarios, permisos, IVA y 10% de servicio",
        "Impresora o pantalla de comandas en cada estación (ahumados, pasta, fríos, bar)",
        "Datáfonos (ojalá de dos bancos) y SINPE Móvil del negocio",
        "Factura electrónica de prueba hecha",
        "Fondo de caja con menudo y billetes para dar vueltos",
        "Wifi de clientes aparte del wifi del sistema",
        "Teléfono, WhatsApp y correo del restaurante",
        "Plan si se cae el sistema: comandas de papel, calculadora y lista de precios impresa",
        "Rollos de papel de repuesto para impresoras y datáfonos",
        "Decidir si hay exprés desde el primer día (mejor esperar unas semanas)"
      ]},
      { id: "higiene", title: "Higiene y seguridad", items: [
        "Plan de limpieza de todos los días, de cada semana y de cada mes, con encargados",
        "Hojas para apuntar temperaturas (frío, caliente y ahumador)",
        "Lugares para lavarse las manos con jabón, toallas y alcohol",
        "Bodega y cámaras ordenadas: lo crudo abajo, lo cocinado arriba, y lo más viejo se usa primero",
        "Químicos guardados lejos de la comida",
        "Botiquín completo y gente que sepa primeros auxilios y qué hacer si alguien se atraganta",
        "Extintores revisados y personal que sepa usarlos",
        "Pisos que no resbalen, alfombras de hule en cocina y rótulos de piso mojado",
        "Simulacro de evacuación con el personal"
      ]},
      { id: "marketing", title: "Mercadeo e inauguración", items: [
        "Negocio en Google Maps y Waze con horario, fotos, menú y teléfono",
        "Redes sociales con buenas fotos de los platos",
        "Fecha de apertura y horario anunciados",
        "Reservas abiertas y alguien que conteste los mensajes",
        "Lista de invitados para los ensayos",
        "Quién contesta los comentarios y las quejas, y de qué manera"
      ]},
      { id: "ensayos", title: "Ensayos antes de abrir", hint: "Con un restaurante de este tamaño, no abrir sin al menos dos ensayos.", items: [
        "Ensayo 1: familia y amigos, con el salón a un tercio y menú corto",
        "Ensayo 2: salón a más de la mitad, con el menú completo",
        "Prueba de fuego: muchas mesas pidiendo al mismo tiempo",
        "Medir tiempos: de que se pide a que llega a la mesa, por estación",
        "Ensayar problemas: se cae el sistema, se va la luz, se acaba un plato",
        "Probar la vuelta completa: ahumar de noche y servir al día siguiente",
        "Reunión con el equipo después de cada ensayo y lista de cosas por arreglar",
        "Todo lo de esa lista arreglado antes de abrir al público"
      ]}
    ]
  },
  {
    id: "apertura",
    name: "Apertura del turno",
    desc: "Vuelta de revisión antes de abrir las puertas: marque lo que funciona y póngale «Falla» a lo que no, para arreglarlo antes de que llegue el primer cliente.",
    reset: true,
    sections: [
      { id: "servicios", title: "Luz, agua y gas", items: [
        "Hay luz en todo lado y ningún breaker disparado",
        "Gas abierto y sin olor a fuga",
        "Agua con buena presión y agua caliente",
        "Internet funcionando (el principal y el de respaldo)",
        "Extractores de la cocina prendidos",
        "Aire acondicionado o abanicos del salón prendidos"
      ]},
      { id: "frio", title: "Frío", items: [
        "Cámaras frías y refris a 4 °C o menos (apuntar)",
        "Congeladores a −18 °C o menos (apuntar)",
        "Máquina de hielo haciendo hielo y hieleras llenas",
        "Nada vencido: fechas revisadas"
      ]},
      { id: "ahumador", title: "Ahumador", items: [
        "Carnes de anoche listas y con la temperatura correcta por dentro",
        "Carnes reposando o guardadas en caliente, arriba de 60 °C",
        "Porciones contadas por corte",
        "Cantidades avisadas al salón y metidas en el sistema",
        "Leña o carbón suficiente para hoy y para esta noche",
        "Siguiente tanda montada o programada",
        "Salsas y acompañamientos listos",
        "Estación de corte lista: tablas, cuchillos afilados, papel y guantes"
      ]},
      { id: "pasta", title: "Estación de pasta", items: [
        "Cocedor con agua hirviendo y con sal",
        "Salsas calientes",
        "Pasta porcionada suficiente para el turno",
        "Quesos rallados, hierbas y aceites listos",
        "Sartenes y pinzas suficientes en la estación"
      ]},
      { id: "cocina", title: "Cocina en general", items: [
        "Todos los equipos prendidos y calientes (plancha, freidoras, hornos)",
        "Todo picado y listo en cada estación",
        "Todo con etiqueta y fecha",
        "Termómetro y desinfectante en cada estación",
        "Máquina lavaplatos funcionando y con químicos",
        "Pilas de lavarse las manos con jabón y toallas",
        "Lámparas de calor del pase prendidas",
        "Basureros vacíos y con bolsa"
      ]},
      { id: "salon", title: "Salón", items: [
        "Mesas montadas, limpias y alineadas",
        "Pisos limpios y secos",
        "Menús limpios y completos",
        "Estaciones de saloneros surtidas (cubiertos, servilletas, agua)",
        "Baños limpios, con papel, jabón y toallas",
        "Luces y música prendidas, con buen volumen",
        "Sillas de bebé limpias y a mano",
        "Entrada, rótulo y parqueo limpios y con luz"
      ]},
      { id: "bar", title: "Bar", items: [
        "Hielo, frutas y adornos listos",
        "Cervezas y gaseosas frías; barriles con gas",
        "Máquina de café caliente y probada",
        "Copas y vasos limpios y suficientes"
      ]},
      { id: "caja", title: "Caja y sistema", items: [
        "Sistema de caja abierto con la fecha y el turno correctos",
        "Comanda de prueba impresa en CADA estación",
        "Datáfonos prendidos, con señal, batería y papel",
        "SINPE Móvil del negocio recibiendo (teléfono cargado y a mano)",
        "Factura de prueba hecha",
        "Fondo de caja contado y con menudo",
        "Platos que no hay hoy bloqueados en el sistema",
        "Reservas y grupos del día revisados"
      ]},
      { id: "equipo", title: "La gente", items: [
        "Llegaron todos; los que faltan ya están cubiertos",
        "Uniformes y presentación revisados",
        "Zonas y puestos repartidos",
        "Reunión de 10 minutos: qué no hay, especiales, reservas y metas del día"
      ]},
      { id: "seguridad", title: "Seguridad", items: [
        "Salidas de emergencia sin estorbos",
        "Extintores en su lugar",
        "Botiquín completo"
      ]}
    ]
  },
  {
    id: "cierre",
    name: "Cierre",
    desc: "Para dejar todo listo y seguro, y que mañana se arranque bien.",
    reset: true,
    sections: [
      { id: "ahumador", title: "Ahumador para mañana", items: [
        "Carnes de mañana adobadas y montadas según lo que se espera vender",
        "Leña suficiente y temperatura estable",
        "Encargado de la noche confirmado y con las alarmas puestas",
        "Lo que sobró: enfriado rápido, empacado y con fecha"
      ]},
      { id: "cocina", title: "Cocina", items: [
        "Comida guardada, tapada y con fecha",
        "Temperaturas de frío apuntadas",
        "Equipos apagados y gas cerrado",
        "Freidoras filtradas; plancha y parrilla limpias",
        "Pisos, desagües y trampa de grasa limpios",
        "Basura y reciclaje afuera",
        "Lista de compras y de lo que falta para mañana enviada"
      ]},
      { id: "salon", title: "Salón y bar", items: [
        "Mesas limpias y montadas para mañana",
        "Baños limpios y surtidos",
        "Bar limpio y conteo rápido de licores",
        "Luces, música y aire apagados"
      ]},
      { id: "caja", title: "Caja", items: [
        "Cierre de caja que calce con el sistema",
        "Cierre de los datáfonos hecho",
        "SINPE del día revisado contra las ventas",
        "10% de servicio repartido según lo acordado",
        "Plata en la caja fuerte o depositada",
        "Reporte del día enviado: ventas, lo que se acabó, quejas y fallas"
      ]},
      { id: "local", title: "El local", items: [
        "Puertas, portones y ventanas cerrados",
        "Alarma puesta y cámaras grabando",
        "Fallas del día reportadas a mantenimiento"
      ]}
    ]
  }
];

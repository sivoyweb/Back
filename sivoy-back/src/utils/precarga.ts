import { ServiceType } from 'src/helpers/serviceType.enum';

export const categorizedDisabilities = [
  {
    category: 'Físicas',
    disabilities: [
      'Paraplejia',
      'Tetraplejia',
      'Amputación de miembro superior',
      'Amputación de miembro inferior',
      'Distrofia muscular',
      'Esclerosis múltiple',
      'Parálisis cerebral',
      'Espina bífida',
    ],
  },
  {
    category: 'Sensoriales',
    disabilities: [
      'Ceguera total',
      'Baja visión',
      'Sordera total',
      'Hipoacusia',
    ],
  },
  {
    category: 'Cognitivas',
    disabilities: [
      'Autismo',
      'Síndrome de Down',
      'Discapacidad cognitiva leve',
      'Afasia',
      'Dislexia',
    ],
  },
  {
    category: 'Psicosociales',
    disabilities: [
      'Discapacidad psicosocial (ansiedad, depresión severa)',
      'Parkinson',
      'Alzheimer',
    ],
  },
];

export const travelsMock = [
  {
    name: '1980 Costa Este Restaurante',
    country: 'Argentina',
    city: 'Santa Fe',
    date: new Date('2024-09-10'), // Puedes cambiar la fecha si es necesario
    description:
      'Disfruta de la mejor vista de Santa Fe junto al emblemático Puente Colgante. Especialidad en carnes y pescados a la parrilla, con opciones accesibles para todos.',

    serviceType: ServiceType.Gastronomy,

    images: [
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/88/74/17/cervezas-en-costa-del.jpg?w=1200&h=-1&s=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxIF6pIg7VA4d_zXAjVrdNoadoMx2Z9sVCQ&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgri68wTqIz3t8968j9_mRIjom1yPYcH-iw&s',
        publicId: 'imagen1',
      },
    ],
    website: '', // Puedes añadir la URL del sitio web si la tienes
    phone: '0342 15-421-5566',
    email: '', // No se proporcionó un email, puedes añadirlo si lo tienes
    address: 'Junto al Puente Colgante, Santa Fe',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00', // Puedes ajustar los horarios si es necesario
    available: true,
  },

  {
    name: 'Almacén De Pizzas',
    country: 'Argentina',
    city: 'Rosario',
    date: new Date('2024-12-01'), // Manteniendo la fecha original
    description: 'La Pizza más rica, moderna y divertida!',

    serviceType: ServiceType.Gastronomy,

    images: [
      {
        url: 'https://www.anura.com.ar/wp-content/uploads/2017/06/foto-almacen1.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/f8/c2/f0/almacen-de-pizzas.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/31/6e/20/photo4jpg.jpg?w=1200&h=-1&s=1',
        publicId: 'imagen1',
      },
    ],
    website: 'https://www.almacendepizzas.com',
    facebook:
      'https://www.facebook.com/pages/category/Pizza-Place/Almacen-de-Pizzas-Rosario-291103111004051/',
    phone: '0341 430-9147',
    email: 'a@b.com', // Manteniendo el correo original
    address: '1980 Costa Este Restaurante', // Manteniendo la dirección original
    openingHours: 'Lunes a Viernes de 9:00 a 18:00', // Manteniendo horarios originales
    available: true,
  },

  {
    name: 'Bamboo Brasas',
    country: 'Argentina',
    city: 'San Martin de los Andes',
    date: new Date('2024-12-01'), // Manteniendo la fecha original
    description:
      'Bamboo Brasas ofrece tanto a turistas como locales las mejores carnes asadas, comidas al horno a leña, cordero patagónico, deliciosos platos regionales, pastas y postres caseros.',

    serviceType: ServiceType.Gastronomy,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuItI69sNh7X9LL-mHr1Dz0QsH0WDWNp-vrg&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqHCm2TpaO38Jz6v4itYElPInVi2JDSVDMXw&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9gyKfY-UaEUTPKijt49oXtqDtLphFrN9OTw&s',
        publicId: 'imagen1',
      },
    ],
    website: 'http://www.sanmartindelosandes.gov.ar/turismo',
    phone: '02972 42-0042',
    email: 'bamboobrasas@gmail.com',
    address: 'Calle 1, 2, 3', // Puedes cambiar esto si tienes una dirección específica
    openingHours: 'Lunes a Viernes de 9:00 a 18:00', // Manteniendo horarios originales
    available: true,
  },

  {
    name: 'Baum La Perla',
    country: 'Argentina',
    city: 'Mar del Plata',
    date: new Date('2024-12-01'),
    description:
      'Viví el #Verano a tu manera, vivilo con #Espíritu. Ingreso accesible o asistido, circuito interior accesible, baño adaptado en zona común, menú Braille. Distinguido por el Programa Directrices de Accesibilidad de la Secretaria de Turismo de la Nación.',

    serviceType: ServiceType.Gastronomy,

    images: [
      {
        url: 'https://restorantes.com.ar/wp-content/uploads/2024/07/unnamed.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://restorantes.com.ar/wp-content/uploads/2024/07/IMG_20210707_202919504_HDR-1.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://lh4.googleusercontent.com/proxy/cOo2sWHCDW7tYv60f9K0P3dhb2zI-5rXXHGMDtLL20PeCN-Xu3BIKbhUT7b2fQM3jWuWO3QRqjcgCCmhgf1z9yojVeAMJtkVHo_zNsSIssgoTn6-yQ',
        publicId: 'imagen1',
      },
    ],
    website: 'http://www.cervezabaum.com/#fabrica',
    phone: '0223 474-1392',
    email: 'a@b.com',
    address: 'Calle 1, 2, 3',
    openingHours: 'Lunes a Viernes de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Bahía Bonita',
    country: 'Argentina',
    city: 'Mar del Plata',
    date: new Date('2024-12-01'),
    description:
      'Ubicada en Mar del Plata desde 1998, nuestra empresa se dedica a la actividad balnearia. Estamos en la zona norte, a una cuadra del Museo Mar y a 2 km del centro. La administración del balneario está abierta todo el año de 13 a 17 hs, con opción de alquilar unidades de sombra durante todo el año con planes de pago. Desde el 1 de diciembre al 31 de marzo, abrimos todos los días de 9 a 19 hs. Contamos con ingreso y circuito interior accesibles, así como baño adaptado en zona común.',

    serviceType: ServiceType.BeachResort,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj3kl_px-iL1ePrchY5_Hicvaep7go3XW-Tg&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk2xWJq_5g6GaHL5-JPk9CekigKFxYfDFtoQ&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://yappla.com/uploads/204/img/bahia-bonita_YSinZU.jpg',
        publicId: 'imagen1',
      },
    ],
    website: 'http://www.balneariobahiabonita.com/',
    phone: '0223 15-400-1008',
    email: 'a@b.com',
    address: 'Calle 1, 2, 3',
    openingHours: 'Lunes a Viernes de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Balneario Apolo',
    country: 'Argentina',
    city: 'Mar del Plata',
    date: new Date('2024-12-01'),
    description:
      'Para este verano, yo elijo lo que me hace bien. Por eso elijo Apolo. Ingreso accesible o asistido, circuito interior accesible, baño adaptado en zona común, silla anfibia a disposición. Información proporcionada por el prestador. Sujeta a verificación. Fuente: http://www.turismomardelplata.gob.ar/accesible.',

    serviceType: ServiceType.BeachResort,

    images: [
      {
        url: 'https://lh3.googleusercontent.com/proxy/xCczP_N9_lZbRu-aViM3qdkzBuL37S9E67LqUPGJDobbZGGVvAZp_UtF2yrdjfhJ1pDQ130PlVVHZhyrtCRAzBG2OVRflVCb9ksH0WMhV7MI9CW6rQ',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8SFP7dMdjODO02D8M3EnTU0DZR7EAHsrlFA&s',
        publicId: 'imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYYKlzitP5u0gwnyYewXfr_bt7OqGQkdTJkg&s',
        publicId: 'imagen3',
      },
    ],
    website: 'https://www.balnearioapolo.com.ar/',
    phone: '0223 485 1188',
    email: 'a@b.com',
    address: 'Calle 1, 2, 3',
    openingHours: 'Lunes a Viernes de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Balneario Alicante',
    country: 'Argentina',
    city: 'Mar del Plata',
    date: new Date('2025-01-15'),
    description:
      'Balneario de La Perla caracterizado por el lindo mar y el deporte que se puede realizar allí. Ingreso accesible o asistido, ascensor, circuito interior accesible, baño adaptado en zona común, silla anfibia a disposición. Información proporcionada por el prestador. Sujeta a verificación. Fuente: http://www.turismomardelplata.gob.ar/accesible.',

    serviceType: ServiceType.BeachResort,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtF7DVHrIzfrKwBlVU_nbJQv9R0GidUyaJ1Q&s',
        publicId: 'imagen4',
      },
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0b/f6/98/balneario-alicante.jpg?w=1200&h=1200&s=1',
        publicId: 'imagen5',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_vS8fRrFSEIiDd9zvuQizoftOriSThFz0A&s',
        publicId: 'imagen6',
      },
    ],
    website: 'http://www.balnearioalicante.com.ar/',
    phone: '0223 475-4773',
    email: 'balnearioalicante@gmail.com',
    address: 'Bv. Marítimo P. P. Ramos 750',
    openingHours: 'Lunes a Viernes de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Alamos Del Mar Apart Hotel & Spa',
    country: 'Argentina',
    city: 'Valeria del Mar',
    date: new Date('2024-11-20'),
    description:
      'Situado en Valeria del Mar, a tan solo 360 km de la Capital Federal, Alamos del Mar Apart Hotel & Spa ofrece una experiencia única con modernas tendencias en apart hoteles. Disfruta de confort, tranquilidad y seguridad en un entorno excepcional con grandes extensiones de médanos y playas de fina arena. Servicios de excelencia en Hotelería y Gastronomía.',

    serviceType: ServiceType.Accommodation,

    images: [
      {
        url: 'https://www.alamosdelmar.com.ar/imagenes/hotel.jpg',
        publicId: 'imagen7',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/45051327.jpg?k=60dcf76d2579785dd66a204547659b52d7824b02de719f66d22843b27f11e221&o=&hp=1',
        publicId: 'imagen8',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/544404150.jpg?k=d1feafa703dd34543e5dd12925f1a61441111fd2a39c2ab20c4126be10dd79e8&o=&hp=1',
        publicId: 'imagen9',
      },
    ],
    website: 'http://www.alamosdelmar.com.ar/',
    phone: '02254 480300',
    email: 'info@alamosdelmar.com.ar',
    address: 'Valeria del Mar, Buenos Aires',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Aires Patagónicos Hotel',
    country: 'Argentina',
    city: 'El Bolsón',
    date: new Date('2025-03-05'),
    description:
      'Ubicado en El Bolsón, Aires Patagónicos Hotel ofrece un ambiente acogedor y accesible. Disfruta de un circuito interior accesible y un ingreso asistido para garantizar una estancia cómoda.',

    serviceType: ServiceType.Accommodation,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2NEJIxTkiRq2ffjPwloQyifepD0kCiWNEJg&s',
        publicId: 'imagen10',
      },
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/b0/14/30/aires-patagonicos.jpg?w=700&h=-1&s=1',
        publicId: 'imagen11',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Vts1H_D3VA-ejNYE7ZV7dUjTAvfFVYRYhA&s',
        publicId: 'imagen12',
      },
    ],
    website: 'https://www.google.com',
    phone: '0294 15-490-9821',
    email: 'airespatagonicoshotel@gmail.com',
    address: 'El Bolsón, Rio Negro',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Aikendor Hotel Panorámico',
    country: 'Argentina',
    city: 'El Calafate',
    date: new Date('2024-09-10'),
    description:
      'Con vista panorámica al Lago Argentino y la Cordillera de los Andes, Aikendor Hotel Panorámico combina comodidad y relax en una ubicación privilegiada. Disfruta de su piscina climatizada, mini gimnasio, y desayuno buffet.',

    serviceType: ServiceType.Accommodation,

    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230765397.jpg?k=33ead257f0362ae2cd200e870dcde6d7154269b5fa7f3f21970f46d2bdfdcde9&o=&hp=1',
        publicId: 'imagen13',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230768222.jpg?k=410ccca4986758cee38f10f28112b13643edbd73548af6ed74929fefc0fad040&o=&hp=1',
        publicId: 'imagen14',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/84777330.jpg?k=51e28ceefd8ede70eb18083d8f5711e776bd94d3ef5a0fd3d5abc4a33f5371f7&o=&hp=1',
        publicId: 'imagen15',
      },
    ],
    website: 'https://www.aikendorhotel.com/index.php?action=inicio',
    phone: '54 02902 49-6030',
    email: 'reservas@aikendorhotel.com',
    address: 'El Calafate, Santa Cruz',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },
  {
    name: 'Abril Hotel Boutique',
    country: 'Argentina',
    city: 'Mendoza',
    date: new Date('2024-09-10'), // Puedes cambiar la fecha si es necesario
    description:
      'Abril Hotel Boutique es un hotel nuevo con solo 22 habitaciones, ubicado a pocos metros de la Peatonal Sarmiento y la plaza Independencia, ofreciendo comodidad y accesibilidad en el corazón de Mendoza.',

    serviceType: ServiceType.Accommodation,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlgSXBLAxjA7STzMI9XWaLx9uMFUyDVfX8w&s',
        publicId: 'imagen16',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/38309797.jpg?k=91f67dc1884ee2dfb89e2f330c8b8cf5152b964db4004ea9aefede4542e4d7f3&o=&hp=1',
        publicId: 'imagen17',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSpBGMZ7aqba-EL7zfP6E6SqETy-W64SXVug&s',
        publicId: 'imagen18',
      },
    ],
    website: 'http://www.hotel-abril.com/index.html',
    phone: '0261 429-0027',
    email: 'reservas@hotel-abril.com',
    address: 'Mendoza, Mendoza',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },
  {
    name: 'ACA - Balneario 5 a 8, Complejo Punta Mogotes',
    country: 'Argentina',
    city: 'Mar del Plata',
    date: new Date('2024-09-10'), // Puedes cambiar la fecha si es necesario
    description:
      'Mar del Plata es uno de los destinos preferidos por los argentinos para las vacaciones de verano. El balneario del ACA ofrece comodidad y servicios para disfrutar plenamente de la playa, con un entorno natural mejorado durante más de 30 años.',

    serviceType: ServiceType.BeachResort,

    images: [
      {
        url: 'https://www.autoclub.org.ar/wp-content/uploads/2021/12/punta-mogotes-06.jpg',
        publicId: 'imagen19',
      },
      {
        url: 'https://www.autoclub.org.ar/wp-content/uploads/2021/12/punta-mogotes-01-destacada.jpg',
        publicId: 'imagen20',
      },
      {
        url: 'https://www.aca.tur.ar/promociones/balnearios/ficha/puntamogotes/images/06.JPG',
        publicId: 'imagen21',
      },
    ],
    website: 'http://www.aca.tur.ar/index.php',
    phone: '+542234841569',
    email: 'comercial@aquarium.com.ar', // No se proporcionó un email, puedes añadirlo si lo tienes
    address: 'Punta Mogotes, Mar del Plata, Buenos Aires',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00', // Puedes ajustar los horarios si es necesario
    available: true,
  },

  {
    name: 'Aquarium',
    country: 'Argentina',
    city: 'Mar del Plata - Buenos Aires',
    date: new Date('2024-09-10'),
    description:
      'Aquarium es uno de los parques marinos más importantes de Argentina, situado en Mar del Plata junto al Faro de Punta Mogotes.',

    serviceType: ServiceType.LeisureAndRecreation,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7424/1262021123249PM1.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7424/1262021123311PM1.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7424/1262021123311PM3.jpg',
        publicId: 'imagen1',
      },
    ],
    website: 'https://www.aquarium.com.ar/',
    phone: '0223 467-0700',
    email: 'comercial@aquarium.com.ar',
    address: 'Av. de los Trabajadores 5600, B7600',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Auditorio Juan Victoria',
    country: 'Argentina',
    city: 'San Juan - San Juan',
    date: new Date('2024-09-10'),
    description:
      'El Complejo Cultural Auditorio "Juan Victoria" se ubica frente al Parque de Mayo y al Estadio Abierto Aldo Cantoni en la ciudad de San Juan, ocupando una extensión superior a los 25.000 m2, cuya superficie cubierta es de 6.880 m2. Se inauguró en 1970, siendo una obra única por sus características en la Argentina.',

    serviceType: ServiceType.LeisureAndRecreation,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7261/1014202020501PM4.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://auditorio.sanjuan.gob.ar/wp-content/uploads/2016/11/frente_auditorio_juan_victoria.jpg',
        publicId: 'imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMt2GaDmZsMKMxmZ30v9m-PHDp0u8Wk2mQw&s',
        publicId: 'imagen3',
      },
    ],
    website: 'http://auditorio.sanjuan.gob.ar/',
    phone: '54-264-4222305',
    email: 'auditoriojuanvictoria@sanjuan.gov.ar',
    address: '25 de Mayo Oeste 1215, J5400AHY',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Auditorio Municipal de Esquel',
    country: 'Argentina',
    city: 'Esquel - Chubut',
    date: new Date('2024-09-10'),
    description: 'Se proyectan películas y obras de teatro.',

    serviceType: ServiceType.LeisureAndRecreation,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7582/612021112255AM1.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://mapainteractivocultural.com.ar:4002/place-413a19a9-3e00-41f0-967f-bb551a15fd4c/d020564db9e42838cea4ba84d01f2c31.jpg',
        publicId: 'imagen2',
      },
      {
        url: 'https://pxb.cdn.red43.com.ar/red43/102021/1633608139921.jpg?&cw=350&ch=220',
        publicId: 'imagen3',
      },
    ],
    website: '', // Sitio web no proporcionado
    phone: '02945 45-1929',
    email: '', // Correo no proporcionado
    address: 'Belgrano 330, U9200 Esquel, Chubut',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Bodega Costa & Pampa - Trapiche',
    country: 'Argentina',
    city: 'Mar del Plata - Buenos Aires',
    date: new Date('2024-09-10'),
    description:
      'Exploramos la tierra combinando tradición y tecnología para que descubras nuevas sensaciones en cada uno de nuestros vinos.',

    serviceType: ServiceType.LeisureAndRecreation,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7425/127202194517AM1.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7425/127202194532AM1.jpg',
        publicId: 'imagen2',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7425/127202194553AM1.jpg',
        publicId: 'imagen3',
      },
    ],
    website: 'www.trapiche.com.ar',
    phone: '+542234644312',
    email: '', // Correo no proporcionado
    address:
      'Av. Antártida Argentina Km 16, Estancia Santa Isabel, Chapadmalal, B7600 Mar del Plata, Provincia de Buenos Aires',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Museo de Arte Moderno de Buenos Aires',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-11-15'),
    description:
      'El Museo de Arte Moderno de Buenos Aires exhibe una extensa colección de arte contemporáneo y moderno, promoviendo actividades culturales y educativas en la comunidad.',

    serviceType: ServiceType.CulturalActivities,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOLf_WIWjAuynqCPT45VxbRgfNroNtp6w9SQ&s',
        publicId: 'museo1-imagen1',
      },
      {
        url: 'https://museomoderno.org/wp-content/uploads/2023/12/Fachada-Museo-Moderno-para-Gaby-2-1024x727.jpg',
        publicId: 'museo1-imagen2',
      },
      {
        url: 'https://artishockrevista.com/wp-content/uploads/2018/07/37079225_2225718084111355_5499293563365621760_n.jpg',
        publicId: 'museo1-imagen3',
      },
    ],
    website: 'https://www.museomoderno.org',
    phone: '+5411 5555-1234',
    email: 'contacto@museomoderno.org',
    address: 'Av. San Juan 350, Buenos Aires',
    openingHours: 'Martes a Domingo de 10:00 a 18:00',
    available: true,
  },

  {
    name: 'Teatro Colón',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-10-25'),
    description:
      'El Teatro Colón es una de las casas de ópera más importantes del mundo, ofreciendo espectáculos de ballet, ópera y conciertos de música clásica.',

    serviceType: ServiceType.CulturalActivities,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk40Rg7UUyMTLyNGbZM3jM2ymWF24Jyc0ocQ&s',
        publicId: 'teatro1-imagen1',
      },
      {
        url: 'https://images.adsttc.com/media/images/5899/d0b6/e58e/cead/d600/0167/large_jpg/CC0_Public_Domain_opera-594592.jpg?1486475429',
        publicId: 'teatro1-imagen2',
      },
      {
        url: 'https://www.laizquierdadiario.cl/IMG/logo/logo-2-2.jpg?1713996479',
        publicId: 'teatro1-imagen3',
      },
    ],
    website: 'https://www.teatrocolon.org.ar',
    phone: '+5411 4378-7100',
    email: 'info@teatrocolon.org.ar',
    address: 'Cerrito 628, Buenos Aires',
    openingHours: 'Lunes a Sábado de 9:00 a 20:00',
    available: true,
  },

  {
    name: 'Centro Cultural Kirchner',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-11-10'),
    description:
      'El Centro Cultural Kirchner (CCK) es un espacio dedicado a la promoción de la cultura y las artes visuales, escénicas y musicales, con eventos y exposiciones permanentes.',

    serviceType: ServiceType.CulturalActivities,

    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Buenos_Aires_Centrum_Kirchner.jpg',
        publicId: 'cck1-imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGNK8UHQ5T9xvsZgjlP4J6Jv_n7op-R_-Z7Q&s',
        publicId: 'cck1-imagen2',
      },
      {
        url: 'https://c8.alamy.com/comp/P4AX8G/interior-of-kirchner-cultural-centre-centro-cultural-kirchner-cck-buenos-aires-argentina-P4AX8G.jpg',
        publicId: 'cck1-imagen3',
      },
    ],
    website: 'https://www.cck.gob.ar',
    phone: '+5411 5555-5555',
    email: 'info@cck.gob.ar',
    address: 'Sarmiento 151, Buenos Aires',
    openingHours: 'Martes a Domingo de 14:00 a 20:00',
    available: true,
  },

  {
    name: 'Museo de Bellas Artes de Córdoba',
    country: 'Argentina',
    city: 'Córdoba',
    date: new Date('2024-12-05'),
    description:
      'El Museo de Bellas Artes de Córdoba alberga una amplia colección de arte argentino e internacional, con exposiciones temporales y permanentes de distintas disciplinas artísticas.',

    serviceType: ServiceType.CulturalActivities,

    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Museo_de_Bellas_Artes_de_C%C3%B3rdoba._Fachada.jpg/320px-Museo_de_Bellas_Artes_de_C%C3%B3rdoba._Fachada.jpg',
        publicId: 'museo2-imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcsugxUz9avxn5yx0JOw9NbwhFcDHkNvEuIA&s',
        publicId: 'museo2-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNLecpa5aP4jAPanuRnC0wxKbOTSJ3s_b8w&s',
        publicId: 'museo2-imagen3',
      },
    ],
    website: 'https://www.museobellasartescba.org.ar',
    phone: '+54351 488-5555',
    email: 'info@museobellasartescba.org.ar',
    address: 'Av. Hipólito Yrigoyen 622, Córdoba',
    openingHours: 'Lunes a Viernes de 9:00 a 18:00',
    available: true,
  },

  {
    name: 'Tren Mitre (Línea Retiro-Tigre)',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-11-10'),
    description:
      'El Tren Mitre conecta la estación Retiro en el centro de Buenos Aires con la zona norte del conurbano, ofreciendo un transporte accesible y rápido para los pasajeros.',

    serviceType: ServiceType.MeanOfTransport,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCf3FGtem0-hJ_2WOuBDoUznK_f_lmG2p8w&s',
        publicId: 'trenmitre-imagen1',
      },
      {
        url: 'https://www.enelsubte.com/wp-content/uploads/2024/07/mitre-tigre-1068x712.jpg',
        publicId: 'trenmitre-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdIg1pFvSDf2nHrqdtFi97UHE6cF4RoAphQ&s',
        publicId: 'trenmitre-imagen3',
      },
    ],
    website: 'https://www.trenmitre.com.ar',
    phone: '+5411 4000-5252',
    email: 'info@trenmitre.com.ar',
    address: 'Av. Ramos Mejía 1358, Buenos Aires',
    openingHours: 'Lunes a Domingo de 5:00 a 23:00',
    available: true,
  },

  {
    name: 'Aerolíneas Argentinas',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-12-01'),
    description:
      'Aerolíneas Argentinas es la aerolínea de bandera del país, ofreciendo vuelos nacionales e internacionales con un enfoque en la accesibilidad y comodidad de sus pasajeros.',

    serviceType: ServiceType.MeanOfTransport,

    images: [
      {
        url: 'https://aviacionline.com/wp-content/uploads/2016/08/Aerolineas-Argentinas-Airbus-A330-200-LV-GHQ-05.jpg',
        publicId: 'aerolineas-imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP7gXiYnFd74q1bguUKC-vTezM1lDPDQzeOA&s',
        publicId: 'aerolineas-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-giqo35AfTP9h-LvHSgNYaqh-EbLfdo5RQw&s',
        publicId: 'aerolineas-imagen3',
      },
    ],
    website: 'https://www.aerolineas.com.ar',
    phone: '+5411 4340-7777',
    email: 'info@aerolineas.com.ar',
    address: 'Av. Rafael Obligado s/n, Buenos Aires',
    openingHours: 'Lunes a Domingo de 24 horas',
    available: true,
  },

  {
    name: 'Subte de Buenos Aires (Línea D)',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-10-30'),
    description:
      'El Subte de Buenos Aires es uno de los principales medios de transporte público en la ciudad. La Línea D conecta el norte de la ciudad con el centro y es accesible para personas con discapacidad.',

    serviceType: ServiceType.MeanOfTransport,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-fQuIykJwb0no3kyalIfq5pb6oZCX-LHLwg&s',
        publicId: 'subteD-imagen1',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Estacion_Bulnes.jpg',
        publicId: 'subteD-imagen2',
      },
      {
        url: 'https://media.a24.com/p/4462b5cd7d4c28725af2cea6661a60db/adjuntos/296/imagenes/009/276/0009276923/1200x675/smart/subte-linea-dwebp.png',
        publicId: 'subteD-imagen3',
      },
    ],
    website: 'https://www.buenosaires.gob.ar/subte',
    phone: '+5411 4550-2222',
    email: 'info@subte.com.ar',
    address: 'Av. Roque Sáenz Peña 500, Buenos Aires',
    openingHours: 'Lunes a Domingo de 5:00 a 23:30',
    available: true,
  },

  {
    name: 'Terminal de Ómnibus de Córdoba',
    country: 'Argentina',
    city: 'Córdoba',
    date: new Date('2024-12-20'),
    description:
      'La Terminal de Ómnibus de Córdoba es un importante punto de conexión para el transporte interurbano en Argentina, ofreciendo servicios accesibles para los pasajeros.',

    serviceType: ServiceType.MeanOfTransport,

    images: [
      {
        url: 'https://www.plataforma10.com.ar/viajes/wp-content/uploads/2022/10/terminal-de-cordoba.webp',
        publicId: 'terminalcordoba-imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0rOrAwtIDLtEmzveQU9OSb9jlV9I2Tj1hw&s',
        publicId: 'terminalcordoba-imagen2',
      },
      {
        url: 'https://riva.com.ar/wp-content/uploads/2018/05/Terminal-de-Omnibus-C%C3%B3rdoba-4.jpg',
        publicId: 'terminalcordoba-imagen3',
      },
    ],
    website: 'https://www.terminalcordoba.com.ar',
    phone: '+54351 426-7200',
    email: 'info@terminalcordoba.com.ar',
    address: 'Bv. Juan Domingo Perón 380, Córdoba',
    openingHours: 'Lunes a Domingo de 24 horas',
    available: true,
  },

  {
    name: 'Aljibe Tango',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-10-07'),
    description:
      'Disfruta de una noche de Tango en Buenos Aires en un espacio tradicional con espectáculos en vivo.',

    serviceType: ServiceType.Experiences,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7692/724202444721PM1.jpg',
        publicId: 'aljibetango-imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7692/724202444739PM1.jpg',
        publicId: 'aljibetango-imagen2',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7692/724202444739PM2.jpg',
        publicId: 'aljibetango-imagen3',
      },
    ],

    website: 'https://aljibetango.com/es',
    phone: '+5411 3220-3300',
    email: 'info@aljibetango.com',
    address: 'Balcarce 425, C1064AAI, C1064 Cdad. Autónoma de Buenos Aires',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Bucea Hoy-Dive Today',
    country: 'Argentina',
    city: 'Puerto Madryn',
    date: new Date('2024-10-07'),
    description:
      'Centro de buceo PADI 5 Star IDC en Puerto Madryn, especializado en buceo adaptado y experiencias submarinas inolvidables.',

    serviceType: ServiceType.Experiences,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/3175/722201925329PM1.jpg',
        publicId: 'buceahoy-imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/3175/722201925329PM2.jpg',
        publicId: 'buceahoy-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLxT2VHBK0uDSNQoFGHdqtkQEHP1jFc2Njw&s',
        publicId: 'buceahoy-imagen3',
      },
    ],

    website: 'https://bucea-hoy-dive-today-centro-de-buceo.negocio.site/',
    phone: '+54280154601647',
    email: '',
    address: 'Furnillo 12, U9120 Puerto Madryn, Chubut',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Centro Invernal Ushuaia Blanca',
    country: 'Argentina',
    city: 'Ushuaia',
    date: new Date('2024-10-07'),
    description:
      'Descubre el Fin del Mundo en Ushuaia Blanca, donde las tradiciones y aventuras se combinan en un entorno natural único, accesible para todos.',

    serviceType: ServiceType.Experiences,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/3184/724201924909PM1.jpg',
        publicId: 'ushuaiablanca-imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/3184/724201924909PM2.jpg',
        publicId: 'ushuaiablanca-imagen2',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/3184/724201924909PM3.jpg',
        publicId: 'ushuaiablanca-imagen3',
      },
    ],

    website: 'https://www.ushuaiablanca.com.ar/',
    phone: '',
    email: '',
    address: 'RN3 Nº 3 Km. 25, Ushuaia, Tierra del Fuego',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'HeliUshuaia',
    country: 'Argentina',
    city: 'Ushuaia',
    date: new Date('2024-10-07'),
    description:
      'Experimenta la majestuosidad de los paisajes fueguinos desde el aire. Disfruta de glaciares colgantes y picos nevados en una emocionante excursión en helicóptero.',

    serviceType: ServiceType.Experiences,

    images: [
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7680/372024104555AM1.jpg',
        publicId: 'heliushua-imagen1',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7680/372024104555AM2.jpg',
        publicId: 'heliushua-imagen2',
      },
      {
        url: 'http://admin.sivoy.com.ar/Images/Lugares/7680/372024104555AM3.jpg',
        publicId: 'heliushua-imagen3',
      },
    ],

    website: 'https://heliushuaia.com.ar/',
    phone: '+54 2901 444 444',
    email: 'info@heliushuaia.com.ar',
    address: 'BFN, Luis Pedro Fique 119, V9410 Ushuaia, Tierra del Fuego',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Taller de Cerámica',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-10-07'),
    description:
      'Aprende el arte de la cerámica en un taller accesible para todos. Disfruta de una experiencia creativa mientras moldeas tu propia obra maestra.',

    serviceType: ServiceType.PersonalServices,

    images: [
      {
        url: 'https://www.parati.com.ar/wp-content/uploads/2023/03/CERAMICA-DESTACADA-749x561.jpg.webp',
        publicId: 'ceramica-imagen1',
      },
      {
        url: 'https://media.revistaad.es/photos/60c74842589517c2edfd085f/master/w_1600%2Cc_limit/178313.jpg',
        publicId: 'ceramica-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3GkIPk8JWKJ3XC3NP4C-pxRxyFO57bV-MQ&s',
        publicId: 'ceramica-imagen3',
      },
    ],

    website: 'https://www.tallerdeceramica.com',
    phone: '+54 11 5555-5555',
    email: 'info@tallerdeceramica.com',
    address: 'Av. Libertador 1234, CABA, Buenos Aires',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Clases de Cocina Argentina',
    country: 'Argentina',
    city: 'Córdoba',
    date: new Date('2024-10-07'),
    description:
      'Descubre la cocina tradicional argentina con nuestras clases accesibles. Aprende a preparar platos típicos en un ambiente amigable.',

    serviceType: ServiceType.PersonalServices,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3Rhd895CLZrZlEH8Eq_iVkrvRTewOgOekw&s',
        publicId: 'cocinaclases-imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRi0zsnTdWhEgLcrg5Uq9L2yRt80bf7fDWw&s',
        publicId: 'cocinaclases-imagen2',
      },
      {
        url: 'https://finde.latercera.com/wp-content/uploads/2023/11/Kitchen-Club-Ok--700x450.jpg',
        publicId: 'cocinaclases-imagen3',
      },
    ],

    website: 'https://www.clasesdecocinargentina.com',
    phone: '+54 351 444-4444',
    email: 'info@clasesdecocinargentina.com',
    address: 'Av. General Paz 5678, Córdoba',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Asesoría de Imagen Personal',
    country: 'Argentina',
    city: 'Mendoza',
    date: new Date('2024-10-07'),
    description:
      'Transforma tu estilo con nuestra asesoría de imagen adaptada para personas con discapacidad. Ofrecemos consultas personalizadas y servicios inclusivos para ayudarte a encontrar tu look ideal.',

    serviceType: ServiceType.PersonalServices,

    images: [
      {
        url: 'https://sananastasio.com/wp-content/uploads/asesoria-de-imagen.jpg',
        publicId: 'imagenpersonal-imagen1',
      },
      {
        url: 'https://prensaeventos.cl/wp-content/uploads/2019/11/la-asesoria-de-imagen-se-vuelve-una-tendencia-sostenible.jpg',
        publicId: 'imagenpersonal-imagen2',
      },
      {
        url: 'https://www.blog.cazcarra.com/wp-content/uploads/2018/01/asesoramiento-color.jpg',
        publicId: 'imagenpersonal-imagen3',
      },
    ],

    website: 'https://www.asesoriadeimagenpersonal.com',
    phone: '+54 261 555-5555',
    email: 'info@asesoriadeimagenpersonal.com',
    address: 'Calle Las Tipas 123, Mendoza',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Consultoría de Bienestar Integral',
    country: 'Argentina',
    city: 'Rosario',
    date: new Date('2024-10-07'),
    description:
      'Mejora tu calidad de vida con nuestra consultoría de bienestar adaptada para personas con discapacidades. Ofrecemos servicios de coaching personal y talleres de relajación inclusivos.',

    serviceType: ServiceType.PersonalServices,

    images: [
      {
        url: 'https://equalitasaccesibilidad.com/wp-content/uploads/2014/03/principal-equalitas-accesibilidad-consultoria.jpg',
        publicId: 'bienestar-imagen1',
      },
      {
        url: 'https://sumacinc.com/wp-content/uploads/2023/08/side-view-colleagues-being-inclusive-scaled.jpg',
        publicId: 'bienestar-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxahrzyaoZdqNeEHDu_POIxNwVGlcqB9CQw&s',
        publicId: 'bienestar-imagen3',
      },
    ],

    website: 'https://www.consultoriadebienestar.com',
    phone: '+54 341 666-6666',
    email: 'info@consultoriadebienestar.com',
    address: 'Av. Pellegrini 4567, Rosario',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Taller de Arte Inclusivo',
    country: 'Argentina',
    city: 'Buenos Aires',
    date: new Date('2024-10-07'),
    description:
      'Un espacio creativo donde todas las personas, independientemente de sus habilidades, pueden explorar su talento artístico a través de diferentes técnicas y materiales.',

    serviceType: ServiceType.Other,

    images: [
      {
        url: 'https://img.europapress.es/fotoweb/fotonoticia_20171202133356_1200.jpg',
        publicId: 'arte-inclusivo-imagen1',
      },
      {
        url: 'https://www.artedown.cl/wp-content/uploads/2022/06/Foto-Taller-Arte-Inclusivo-3.jpeg',
        publicId: 'arte-inclusivo-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlTNgM0-htFoWppTxHVNIa3sDCiDnO-J_q5A&s',
        publicId: 'arte-inclusivo-imagen3',
      },
    ],

    website: 'https://www.tallerdearteinclusivo.com',
    phone: '+54 11 5555-5555',
    email: 'info@tallerdearteinclusivo.com',
    address: 'Calle Arco Iris 45, Buenos Aires',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Clases de Yoga Adaptado',
    country: 'Argentina',
    city: 'Córdoba',
    date: new Date('2024-10-07'),
    description:
      'Clases de yoga diseñadas especialmente para personas con discapacidades, enfocadas en la relajación, la respiración y el bienestar integral.',

    serviceType: ServiceType.Other,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JXlCzdWxMGoEV6KN5OBSqBtefO3f6GzICA&s',
        publicId: 'yoga-adaptado-imagen1',
      },
      {
        url: 'https://arunaiyoga.com/wp-content/uploads/2017/05/otras-clases15.jpg',
        publicId: 'yoga-adaptado-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnStK3vKwCGp6VLRk3f29jtXuKVHNonMX9g&s',
        publicId: 'yoga-adaptado-imagen3',
      },
    ],

    website: 'https://www.yogainclusivo.com',
    phone: '+54 351 777-7777',
    email: 'info@yogainclusivo.com',
    address: 'Av. Libertador 987, Córdoba',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Paseos Ecológicos Adaptados',
    country: 'Argentina',
    city: 'Salta',
    date: new Date('2024-10-07'),
    description:
      'Explora la naturaleza en paseos ecológicos diseñados para ser accesibles, con guías capacitados para ofrecer una experiencia inclusiva y enriquecedora.',

    serviceType: ServiceType.Other,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsCUGgytf6nC-NfvgVdHWLFdQaopfcZoK2w&s',
        publicId: 'paseos-ecologicos-imagen1',
      },
      {
        url: 'https://www.teleton.cl/wp-content/uploads/2022/03/parqueconaf975.png',
        publicId: 'paseos-ecologicos-imagen2',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tvO9IvTaKGOp2rwyHhi8xa5BVr18Kbwpdw&s',
        publicId: 'paseos-ecologicos-imagen3',
      },
    ],

    website: 'https://www.paseosecologicos.com',
    phone: '+54 387 444-4444',
    email: 'info@paseosecologicos.com',
    address: 'Calle de la Naturaleza 12, Salta',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },

  {
    name: 'Clases de Danza Inclusiva',
    country: 'Argentina',
    city: 'Rosario',
    date: new Date('2024-10-07'),
    description:
      'Clases de danza adaptadas que promueven la expresión corporal y la creatividad, con un enfoque inclusivo para todas las personas, sin importar sus habilidades físicas.',

    serviceType: ServiceType.Other,

    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbzlIOsVO0nYvhJNm6NtqUsbQDe5xNUuUPw&s',
        publicId: 'danza-inclusiva-imagen1',
      },
      {
        url: 'https://www.semana.com/resizer/v2/VH4PD2FOG5CJNDCSK3L6BAJZVQ.jpg?auth=aeaca3b6487c61b11b33adcd730ca74023bc84626e80e0cfa2c25233e2b58676&smart=true&quality=75&width=1280&height=720',
        publicId: 'danza-inclusiva-imagen2',
      },
      {
        url: 'https://cloudfront-us-east-1.images.arcpublishing.com/semana/6GA7HNKPQJD7DLA3XN52RKEBHQ.jpg',
        publicId: 'danza-inclusiva-imagen3',
      },
    ],

    website: 'https://www.danzainclusiva.com',
    phone: '+54 341 999-9999',
    email: 'info@danzainclusiva.com',
    address: 'Calle de la Danza 34, Rosario',
    openingHours: 'Lunes a Domingo de 11:00 a 23:00',
    available: true,
  },
];

export const promotionsMock = [
  {
    name: 'Descuento Verano',
    description:
      'Disfruta de un 20% de descuento en todos los destinos de playa.',
    images: [
      { url: 'https://example.com/verano1.jpg', publicId: 'imagen1' },
      { url: 'https://example.com/verano2.jpg', publicId: 'imagen1' },
    ],
    validFrom: new Date('2024-06-01'),
    validUntil: new Date('2024-08-31'),
  },
  {
    name: 'Aventura Extrema',
    description:
      '30% de descuento en paquetes de aventura extrema, por tiempo limitado.',
    images: [
      { url: 'https://example.com/aventura1.jpg', publicId: 'imagen1' },
      { url: 'https://example.com/aventura2.jpg', publicId: 'imagen1' },
    ],
    validFrom: new Date('2024-09-15'),
    validUntil: new Date('2024-10-15'),
  },
  {
    name: 'Viajes Navideños',
    description:
      '¡Celebra la Navidad con un 15% de descuento en viajes navideños!',
    images: [
      { url: 'https://example.com/navidad1.jpg', publicId: 'imagen1' },
      { url: 'https://example.com/navidad2.jpg', publicId: 'imagen1' },
    ],
    validFrom: new Date('2024-12-01'),
    validUntil: new Date('2024-12-25'),
  },
  {
    name: 'Ofertas de Año Nuevo',
    description:
      'Descuento del 25% en destinos seleccionados para celebrar el Año Nuevo.',
    images: [
      { url: 'https://example.com/ano_nuevo1.jpg', publicId: 'imagen1' },
      { url: 'https://example.com/ano_nuevo2.jpg', publicId: 'imagen1' },
    ],
    validFrom: new Date('2024-12-26'),
    validUntil: new Date('2025-01-05'),
  },
  {
    name: 'Escapada Romántica',
    description:
      '10% de descuento en paquetes para parejas en destinos románticos.',
    images: [
      { url: 'https://example.com/romantica1.jpg', publicId: 'imagen1' },
      { url: 'https://example.com/romantica2.jpg', publicId: 'imagen1' },
    ],
    validFrom: new Date('2024-02-10'),
    validUntil: new Date('2024-02-15'),
    isActive: false, // explicitamente desactivada
  },
];

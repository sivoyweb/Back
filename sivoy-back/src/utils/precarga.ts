import { ServiceType } from "src/helpers/serviceType.enum";

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

    accesibilitySeal:
      'Distinguido por el Programa Directrices de Accesibilidad de la Secretaria de Turismo de la Nación',
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

    accesibilitySeal:
      'Ingreso accesible o asistido, Circuito interior accesible, Baño adaptado en zona común, Menú Braille',
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

    accesibilitySeal:
      'Establecimiento turístico accesible. Información proporcionada por el prestador. Sujeta a verificación.',
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

    accesibilitySeal:
      'Distinguido por el Programa Directrices de Accesibilidad de la Secretaria de Turismo de la Nación.',
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

    accesibilitySeal: 'Ingreso accesible o asistido',
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

    accesibilitySeal: 'Ingreso accesible o asistido',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/proxy/xCczP_N9_lZbRu-aViM3qdkzBuL37S9E67LqUPGJDobbZGGVvAZp_UtF2yrdjfhJ1pDQ130PlVVHZhyrtCRAzBG2OVRflVCb9ksH0WMhV7MI9CW6rQ',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8SFP7dMdjODO02D8M3EnTU0DZR7EAHsrlFA&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYYKlzitP5u0gwnyYewXfr_bt7OqGQkdTJkg&s',
        publicId: 'imagen1',
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

    accesibilitySeal: 'Ingreso accesible o asistido',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtF7DVHrIzfrKwBlVU_nbJQv9R0GidUyaJ1Q&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0b/f6/98/balneario-alicante.jpg?w=1200&h=1200&s=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_vS8fRrFSEIiDd9zvuQizoftOriSThFz0A&s',
        publicId: 'imagen1',
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

    accesibilitySeal: 'Ingreso accesible o asistido (80 cm o más, rampas)',
    images: [
      {
        url: 'https://www.alamosdelmar.com.ar/imagenes/hotel.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/45051327.jpg?k=60dcf76d2579785dd66a204547659b52d7824b02de719f66d22843b27f11e221&o=&hp=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/544404150.jpg?k=d1feafa703dd34543e5dd12925f1a61441111fd2a39c2ab20c4126be10dd79e8&o=&hp=1',
        publicId: 'imagen1',
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

    accesibilitySeal: 'Ingreso accesible o asistido',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2NEJIxTkiRq2ffjPwloQyifepD0kCiWNEJg&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/b0/14/30/aires-patagonicos.jpg?w=700&h=-1&s=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Vts1H_D3VA-ejNYE7ZV7dUjTAvfFVYRYhA&s',
        publicId: 'imagen1',
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

    accesibilitySeal: 'Habitación y baño accesible',
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230765397.jpg?k=33ead257f0362ae2cd200e870dcde6d7154269b5fa7f3f21970f46d2bdfdcde9&o=&hp=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230768222.jpg?k=410ccca4986758cee38f10f28112b13643edbd73548af6ed74929fefc0fad040&o=&hp=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/84777330.jpg?k=51e28ceefd8ede70eb18083d8f5711e776bd94d3ef5a0fd3d5abc4a33f5371f7&o=&hp=1',
        publicId: 'imagen1',
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

    accesibilitySeal: 'Ingreso y habitación accesible',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlgSXBLAxjA7STzMI9XWaLx9uMFUyDVfX8w&s',
        publicId: 'imagen1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/38309797.jpg?k=91f67dc1884ee2dfb89e2f330c8b8cf5152b964db4004ea9aefede4542e4d7f3&o=&hp=1',
        publicId: 'imagen1',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSpBGMZ7aqba-EL7zfP6E6SqETy-W64SXVug&s',
        publicId: 'imagen1',
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

    accesibilitySeal: 'Accesible para personas con movilidad reducida',
    images: [
      {
        url: 'https://www.autoclub.org.ar/wp-content/uploads/2021/12/punta-mogotes-06.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://www.autoclub.org.ar/wp-content/uploads/2021/12/punta-mogotes-01-destacada.jpg',
        publicId: 'imagen1',
      },
      {
        url: 'https://www.aca.tur.ar/promociones/balnearios/ficha/puntamogotes/images/06.JPG',
        publicId: 'imagen1',
      },
    ],
    website: 'http://www.aca.tur.ar/index.php',
    phone: '+542234841569',
    email: '', // No se proporcionó un email, puedes añadirlo si lo tienes
    address: 'Punta Mogotes, Mar del Plata, Buenos Aires',
    openingHours: 'Lunes a Domingo de 9:00 a 18:00', // Puedes ajustar los horarios si es necesario
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

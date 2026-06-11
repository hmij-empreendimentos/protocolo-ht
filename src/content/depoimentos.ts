/**
 * Testimonios de clientes (prueba social) para el carrusel de la home.
 * Edita libremente con casos reales.
 *
 * `foto` es opcional: si no hay, se genera un avatar con las iniciales.
 * Para usar fotos reales, ponlas en `public/depoimentos/` y referencia
 * `/depoimentos/archivo.jpg` (cuadradas, ~400×400).
 */

export type Depoimento = {
  id: string;
  nombre: string;
  edad?: number;
  ciudad?: string;
  estrellas: 1 | 2 | 3 | 4 | 5;
  texto: string;
  foto?: string;
};

export const DEPOIMENTOS: Depoimento[] = [
  {
    id: "carlos",
    nombre: "Carlos M.",
    edad: 47,
    ciudad: "Madrid",
    estrellas: 5,
    texto:
      "Pensé que a mi edad ya era tarde. En 3 semanas con el protocolo recuperé energía y confianza. Lo recomiendo a cualquier hombre.",
  },
  {
    id: "jorge",
    nombre: "Jorge R.",
    edad: 52,
    ciudad: "Buenos Aires",
    estrellas: 5,
    texto:
      "El app es muy fácil de usar, incluso para mí que no soy de tecnología. Cada día sé exactamente qué hacer.",
  },
  {
    id: "antonio",
    nombre: "Antonio G.",
    edad: 44,
    ciudad: "Ciudad de México",
    estrellas: 5,
    texto:
      "El Modo Acelerado me dio resultados en la primera semana. Estoy más activo y mi pareja lo notó.",
  },
  {
    id: "ricardo",
    nombre: "Ricardo P.",
    edad: 49,
    ciudad: "Bogotá",
    estrellas: 4,
    texto:
      "Seguí el Código del Hombre al pie de la letra. Cambió mi mentalidad y mi disciplina diaria.",
  },
];

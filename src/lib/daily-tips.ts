/**
 * Tip del día. Rota por día del año (mismo tip para todos ese día).
 * Edita / agrega tips libremente.
 */

export type Tip = {
  titulo: string;
  texto: string;
};

export const TIPS: Tip[] = [
  {
    titulo: "Imagina tu versión de 30 días",
    texto:
      "Con más energía, más firme y más seguro. Cada meta que cumples hoy es un paso real hacia ese hombre. Empieza ahora.",
  },
  {
    titulo: "El vaso de agua que lo cambia todo",
    texto:
      "Bebe agua al despertar y siente la diferencia: mente más clara y cuerpo activado en minutos. Tan simple, tan poderoso.",
  },
  {
    titulo: "Duerme bien y despierta a otro nivel",
    texto:
      "Mientras duermes, tu cuerpo recupera energía y testosterona. 7 horas hoy = más fuerza y mejor ánimo mañana.",
  },
  {
    titulo: "10 minutos que tu cuerpo agradece",
    texto:
      "No necesitas horas. Mueve tu cuerpo 10 minutos y activa tu energía, tu fuerza y tu confianza para todo el día.",
  },
  {
    titulo: "Una lección al día, una vida nueva",
    texto:
      "Parece poco, pero en un mes habrás transformado tu rutina y tus resultados. La constancia es tu superpoder.",
  },
  {
    titulo: "Tu postura cambia cómo te ven",
    texto:
      "Espalda recta, hombros atrás, mirada al frente. En segundos proyectas más presencia y te sientes más seguro.",
  },
  {
    titulo: "Menos azúcar, más hombre",
    texto:
      "Baja el azúcar hoy y nota energía estable, cabeza clara y menos cansancio. Tu cuerpo te lo devuelve rápido.",
  },
  {
    titulo: "El hombre tranquilo manda",
    texto:
      "3 respiraciones profundas antes de reaccionar. Quien controla su calma, controla la situación. Practícalo hoy.",
  },
  {
    titulo: "Cumple tu palabra contigo mismo",
    texto:
      "Cada promesa que te cumples construye tu confianza. Hoy: una meta, cúmplela, y siente cómo crece tu poder.",
  },
  {
    titulo: "Sol de la mañana, energía todo el día",
    texto:
      "10 minutos de luz natural temprano ordenan tu energía y tu descanso. Un detalle pequeño, un cambio enorme.",
  },
];

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function getTipDelDia(d: Date = new Date()): Tip {
  return TIPS[dayOfYear(d) % TIPS.length];
}

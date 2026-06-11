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
    titulo: "Empieza por lo simple",
    texto:
      "No intentes cambiar todo de golpe. Elige una sola meta hoy y cúmplela. La constancia gana.",
  },
  {
    titulo: "Hidratación primero",
    texto:
      "Bebe un vaso de agua al despertar. Es el gesto más simple que activa tu cuerpo para el día.",
  },
  {
    titulo: "El sueño es rendimiento",
    texto:
      "Dormir bien no es perder tiempo: es cuando tu cuerpo se recupera y tu mente se afila.",
  },
  {
    titulo: "Muévete 10 minutos",
    texto:
      "Si no tienes tiempo para entrenar, camina 10 minutos. Hecho es mejor que perfecto.",
  },
  {
    titulo: "Mira tu lección",
    texto:
      "Avanzar un módulo al día parece poco, pero en un mes habrás transformado tu rutina.",
  },
  {
    titulo: "La postura habla",
    texto:
      "Endereza la espalda y los hombros atrás. Tu cuerpo le dice a tu mente cómo sentirse.",
  },
  {
    titulo: "Menos azúcar, más energía",
    texto:
      "Reduce el azúcar de hoy. Tu energía será más estable y tu cabeza más clara.",
  },
  {
    titulo: "Respira antes de reaccionar",
    texto:
      "3 respiraciones profundas antes de responder. El hombre tranquilo controla la situación.",
  },
  {
    titulo: "Tu palabra es tu poder",
    texto:
      "Cumple lo que te prometes a ti mismo. Cada promesa cumplida construye tu confianza.",
  },
  {
    titulo: "Sol de la mañana",
    texto:
      "10 minutos de luz natural temprano regulan tu energía y tu descanso de la noche.",
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

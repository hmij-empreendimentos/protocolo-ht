/**
 * Feedback de "dopamina" sin dependencias: confeti + toast flotante.
 * Solo en navegador, usando Web Animations API. Respeta prefers-reduced-motion.
 */

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Toast flotante que sube y se desvanece (ej. "+10 XP"). */
export function floatToast(texto: string, opts?: { grande?: boolean }) {
  if (typeof document === "undefined") return;

  const el = document.createElement("div");
  el.textContent = texto;
  el.setAttribute("role", "status");
  const grande = opts?.grande;
  Object.assign(el.style, {
    position: "fixed",
    left: "50%",
    bottom: grande ? "38%" : "30%",
    transform: "translateX(-50%)",
    zIndex: "120",
    padding: grande ? "12px 20px" : "8px 14px",
    borderRadius: "999px",
    background: "linear-gradient(180deg,#e8cd6b,#a8801f)",
    color: "#1a1305",
    fontWeight: "800",
    fontSize: grande ? "18px" : "15px",
    boxShadow: "0 10px 30px -8px rgba(212,175,55,.6)",
    pointerEvents: "none",
    whiteSpace: "nowrap",
  } as CSSStyleDeclaration);

  document.body.appendChild(el);

  const dur = grande ? 1600 : 1100;
  const rise = grande ? 70 : 48;

  if (reducedMotion()) {
    window.setTimeout(() => el.remove(), 900);
    return;
  }

  const anim = el.animate(
    [
      { opacity: 0, transform: "translateX(-50%) translateY(10px) scale(0.9)" },
      { opacity: 1, transform: "translateX(-50%) translateY(0) scale(1)", offset: 0.18 },
      { opacity: 1, transform: `translateX(-50%) translateY(-${rise * 0.6}px) scale(1)`, offset: 0.7 },
      { opacity: 0, transform: `translateX(-50%) translateY(-${rise}px) scale(0.98)` },
    ],
    { duration: dur, easing: "cubic-bezier(0.22,1,0.36,1)" },
  );
  anim.onfinish = () => el.remove();
}

/** Explosión de confeti dorado/rojo/blanco. */
export function confettiBurst() {
  if (typeof document === "undefined") return;
  if (reducedMotion()) return;

  const colors = ["#d4af37", "#e8c46b", "#c0392b", "#f5f3ec"];
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    zIndex: "110",
    pointerEvents: "none",
    overflow: "hidden",
  } as CSSStyleDeclaration);
  document.body.appendChild(container);

  const N = 80;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.35;

  for (let i = 0; i < N; i++) {
    const piece = document.createElement("div");
    const size = 6 + Math.floor(Math.random() * 8);
    const color = colors[i % colors.length];
    Object.assign(piece.style, {
      position: "absolute",
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size * 0.5}px`,
      background: color,
      borderRadius: "1px",
      opacity: "1",
    } as CSSStyleDeclaration);
    container.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 120 + Math.random() * 260;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - (120 + Math.random() * 120);
    const rot = (Math.random() * 720 - 360).toFixed(0);
    const dur = 1100 + Math.random() * 900;

    const anim = piece.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy + 420}px) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      { duration: dur, easing: "cubic-bezier(0.18,0.7,0.3,1)" },
    );
    anim.onfinish = () => piece.remove();
  }

  window.setTimeout(() => container.remove(), 2200);
}

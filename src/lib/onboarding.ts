/**
 * Onboarding mínimo del Protocolo HT.
 * Pensado para un público 40+ poco técnico: una sola pregunta (el nombre),
 * sin fricción. Todo en localStorage, sin backend.
 */

const NAME_KEY = "ht-user-name";
const COMPLETE_KEY = "ht-onboarding-complete";

export function getUserName(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(NAME_KEY);
  } catch {
    return null;
  }
}

export function setUserName(name: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NAME_KEY, name.trim());
  } catch {
    // ignore
  }
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(COMPLETE_KEY) === "true";
  } catch {
    return false;
  }
}

export function markOnboardingComplete() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMPLETE_KEY, "true");
  } catch {
    // ignore
  }
}

export function resetOnboarding() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(COMPLETE_KEY);
    localStorage.removeItem(NAME_KEY);
  } catch {
    // ignore
  }
}

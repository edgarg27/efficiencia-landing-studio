import { useEffect } from "react";

/**
 * Revelado por tiempo al hacer scroll: cuando un bloque entra en pantalla se le agrega `is-in`
 * y el CSS lo anima (~0.9 s). Al ser por tiempo y no ligado al scroll, se nota aunque se baje rápido
 * y funciona igual en todos los navegadores.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("js-rv");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    document.querySelectorAll(".rv, .rv2, .rv3, .line").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("js-rv");
    };
  }, []);
}

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Desplazamiento animado SOLO para los enlaces con ancla (#seccion): arranca y frena suave con una
 * curva sinusoidal (velocidad máxima baja), con duración proporcional a la distancia. La rueda del mouse y el trackpad usan el scroll nativo
 * del navegador (velocidad pareja, sin la cola de inercia exponencial que daba "rápido y luego lento").
 * Se desactiva si el sistema pide reducir movimiento.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ smoothWheel: false, syncTouch: false });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href="/"]');
      if (!link) return;
      let hash = link.getAttribute("href") ?? "";
      // El logo ("/") sube al inicio solo si ya estamos en la página principal.
      if (hash === "/") {
        if (window.location.pathname !== "/") return;
        hash = "#inicio";
      }
      const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
      if (!target && hash !== "#") return;
      e.preventDefault();
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hd-h")) || 76;
      // Se alinea el inicio del contenido de la sección (no su borde superior, que incluye mucho padding)
      // justo debajo del encabezado fijo. Se descuenta el desplazamiento de la animación de entrada.
      const first = target?.querySelector<HTMLElement>(".rv, .rv2, .rv3") ?? target;
      let top = 0;
      if (first) {
        const lift = new DOMMatrix(getComputedStyle(first).transform).m42;
        top = first.getBoundingClientRect().top - lift + window.scrollY - (header + 28);
      }
      const dest = Math.max(0, Math.round(top));
      const distance = Math.abs(dest - window.scrollY);
      // Al inicio (logo): respuesta inmediata y corta. A una sección: arranque y frenado suaves.
      const toTop = dest === 0;
      lenis.scrollTo(dest, {
        duration: toTop
          ? Math.min(1.1, Math.max(0.6, 0.5 + distance / 9000))
          : Math.min(1.5, Math.max(0.7, 0.6 + distance / 5000)),
        easing: toTop ? (t: number) => 1 - Math.pow(1 - t, 3) : (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
      });
      // "#inicio" no se escribe en la URL: queda limpia (solo la ruta).
      history.replaceState(null, "", hash === "#inicio" ? window.location.pathname + window.location.search : hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

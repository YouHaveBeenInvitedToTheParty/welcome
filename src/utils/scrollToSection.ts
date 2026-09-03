let frame = 0;

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  cancelAnimationFrame(frame);

  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  if (Math.abs(distance) < 2) return;

  const duration = 880;
  const origin = performance.now();
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const t = Math.min(1, (now - origin) / duration);
    window.scrollTo(0, start + distance * ease(t));
    if (t < 1) {
      frame = requestAnimationFrame(step);
      return;
    }
    html.style.scrollBehavior = previous;
  };

  frame = requestAnimationFrame(step);
}

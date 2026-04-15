(() => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = Number(node.dataset.count || "0");
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        node.textContent = Math.round(progress * target).toString();
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(node);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("[data-count]").forEach((node) => counterObserver.observe(node));
})();

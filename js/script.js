// DreamSpace Interior Design interactions

document.addEventListener("DOMContentLoaded", () => {
  // Dynamic footer year
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Collapse mobile menu after selecting a section
  const nav = document.getElementById("siteNav");
  document.querySelectorAll("#siteNav .nav-link, #siteNav .btn").forEach(link => {
    link.addEventListener("click", () => {
      if (nav && nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // Hero background slider
  const hero = document.querySelector(".hero");
  const dots = [...document.querySelectorAll(".hero-dot")];
  const heroImages = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85"
  ];
  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = (index + heroImages.length) % heroImages.length;
    hero.style.backgroundImage = `url("${heroImages[currentSlide]}")`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
  }

  document.querySelector(".hero-prev")?.addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector(".hero-next")?.addEventListener("click", () => showSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("visible", window.scrollY > 350);
  }, { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Contact form: client-side validation/demo only.
  // Connect to a backend or form service to receive real enquiries.
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const customerName = document.getElementById("name").value.trim();
    feedback.textContent = `Thank you, ${customerName}! Your details are ready. Please connect this form to an email service or backend to receive enquiries.`;
    form.reset();
  });
});

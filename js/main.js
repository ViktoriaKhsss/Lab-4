// 🟦 УНІВЕРСАЛЬНІ ФУНКЦІЇ (важливо вставити на самий початок!)
const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);


// 1. Поточний рік у футері

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = qs("#year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});


// 2. Наші майстри – слайдер

document.addEventListener("DOMContentLoaded", () => {
  const slides = qsa(".slide");
  const prev = qs(".prev");
  const next = qs(".next");
  if (!slides.length || !prev || !next) return;

  let current = 0;
  const show = (i) => slides.forEach((s, idx) => s.classList.toggle("active", idx === i));

  next.addEventListener("click", () => { current = (current + 1) % slides.length; show(current); });
  prev.addEventListener("click", () => { current = (current - 1 + slides.length) % slides.length; show(current); });

  show(current);
});


// 3. Карусель товарів

document.addEventListener("DOMContentLoaded", () => {
  const slides = qsa(".hc-slide");
  const prev = qs(".hc-prev");
  const next = qs(".hc-next");
  if (!slides.length || !prev || !next) return;

  let i = 0, timer;

  const show = (n) => slides.forEach((s, idx) => s.classList.toggle("active", idx === n));
  const go = (d = 1) => { i = (i + d + slides.length) % slides.length; show(i); };
  const start = () => timer = setInterval(() => go(1), 4000);
  const stop = () => timer && clearInterval(timer);

  prev.addEventListener("click", () => { stop(); go(-1); start(); });
  next.addEventListener("click", () => { stop(); go(1); start(); });

  show(i);
  start();
});


// 4. Підпункти

document.addEventListener("DOMContentLoaded", () => {
  qsa(".cat-title").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".cat");
      if (item) item.classList.toggle("open");
    });
  });
});


// 5. Підписка на новини

document.addEventListener("DOMContentLoaded", () => {
  const form = qs(".subscribe-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.sub_email.value.trim();
    if (email) {
      alert(`Дякуємо! Ви підписані: ${email}`);
      form.reset();
    }
  });
});


// 6. Сердечки на фоні

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.body;
  if (!mainContainer) return;

  const createHeart = () => {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");

    const colors = ["yellow", "blue"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundImage = `url('img/heart-${randomColor}.png')`;

    heart.style.left = `${Math.random() * 80 - 45}%`;
    heart.style.animationDuration = `${Math.random() * 3 + 5}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;

    mainContainer.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
  };

  setInterval(createHeart, 800);
  for (let i = 0; i < 5; i++) setTimeout(createHeart, i * 300);
});


// 7. Карусель відгуків

document.addEventListener("DOMContentLoaded", () => {
  const testiSlides = qsa(".testi-slide");
  const prevBtn = qs(".tc-prev");
  const nextBtn = qs(".tc-next");

  if (!testiSlides.length) return;

  let testiIndex = 0;

  const showTestimonial = (n) =>
    testiSlides.forEach((s, i) => s.classList.toggle("active", i === n));

  const nextTestimonial = () => {
    testiIndex = (testiIndex + 1) % testiSlides.length;
    showTestimonial(testiIndex);
  };

  const prevTestimonial = () => {
    testiIndex = (testiIndex - 1 + testiSlides.length) % testiSlides.length;
    showTestimonial(testiIndex);
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextTestimonial);
    prevBtn.addEventListener("click", prevTestimonial);
  }

  setInterval(nextTestimonial, 5000);
  showTestimonial(testiIndex);
});


// 8. Додатковий параграф

document.addEventListener("DOMContentLoaded", () => {
  const main = qs("main");
  if (!main) return;

  const newParagraph = document.createElement("p");
  newParagraph.textContent = "Відкрийте для себе унікальні речі, створені з любов’ю";
  newParagraph.style.color = "green";
  newParagraph.style.marginTop = "20px";

  main.append(newParagraph);
});


// 9. Поточна дата

document.addEventListener("DOMContentLoaded", () => {
  const dateSpan = qs("#current-date");
  if (!dateSpan) return;

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  dateSpan.textContent = `${day}.${month}.${year}`;
});


// 10. Показати більше

document.addEventListener("DOMContentLoaded", () => {
  const btn = qs("#moreBtn");
  const hidden = qs("#hiddenText");

  if (!btn || !hidden) return;

  btn.addEventListener("click", () => {
    hidden.classList.toggle("open");
    btn.textContent = hidden.classList.contains("open")
      ? "Приховати"
      : "Показати більше";
  });
});


// 11. DARK MODE

document.addEventListener("DOMContentLoaded", () => {
  const switcher = qs("#themeSwitch");
  if (!switcher) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    switcher.checked = true;
  }

  switcher.addEventListener("change", () => {
    if (switcher.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
});


// 12. Форма "Звʼяжіться з нами"

document.addEventListener("DOMContentLoaded", () => {
  const form = qs("#contactForm");
  if (!form) return;

  const successBox = document.createElement("div");
  successBox.id = "formSuccessMessage";
  successBox.style.cssText = `
    display:none;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    font-weight:bold;
    text-align:center;
  `;
  form.parentNode.insertBefore(successBox, form);

  const fields = {
    name: {
      input: qs("#name"),
      validate: (v) => v.trim().length >= 3,
      message: "Імʼя має містити мінімум 3 символи",
    },
    email: {
      input: qs("#email"),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Введіть коректний email",
    },
    phone: {
      input: qs("#phone"),
      validate: (v) => v === "" || /^\d{10}$/.test(v),
      message: "Телефон: 10 цифр",
    },
    message: {
      input: qs("#message"),
      validate: (v) => v.trim().length >= 10,
      message: "Повідомлення має бути ≥ 10 символів",
    },
  };

  function validateField(input, isValid, msg) {
    const errorSpan = input.nextElementSibling;
    if (!isValid) {
      input.classList.add("error");
      input.classList.remove("success");
      if (errorSpan) {
        errorSpan.textContent = msg;
        errorSpan.classList.add("show");
      }
    } else {
      input.classList.remove("error");
      input.classList.add("success");
      if (errorSpan) errorSpan.classList.remove("show");
    }
  }

  Object.values(fields).forEach((f) =>
    f.input.addEventListener("input", () =>
      validateField(f.input, f.validate(f.input.value), f.message)
    )
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    const data = {};

    Object.values(fields).forEach((f) => {
      const ok = f.validate(f.input.value);
      validateField(f.input, ok, f.message);
      if (!ok) valid = false;
      data[f.input.id] = f.input.value.trim();
    });

    if (!valid) return;

    console.log("Дані форми:", data);
    localStorage.setItem("username", data.name);
    form.reset();
    Object.values(fields).forEach((f) => f.input.classList.remove("success", "error"));

    successBox.textContent = "✅ Форма успішно надіслана!";
    successBox.style.display = "block";
    setTimeout(() => (successBox.style.display = "none"), 5000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const phone = document.getElementById("phone");
  if (!phone) return;

  phone.addEventListener("input", () => {
    // Видаляємо всі НЕцифри
    phone.value = phone.value.replace(/\D/g, "");

    // Обрізаємо до 10 цифр
    if (phone.value.length > 10) {
      phone.value = phone.value.slice(0, 10);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("username");
    const nameInput = document.querySelector("#name");

    if (savedName && nameInput) {
        nameInput.value = savedName;
    }
});

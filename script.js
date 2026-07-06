const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const yearEl = document.getElementById("year");
const heroSlider = document.querySelector("[data-hero-slider]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form && statusText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      statusText.textContent = "Bitte alle Felder korrekt ausfuellen.";
      return;
    }

    statusText.textContent = "Danke! Ihre Nachricht wurde vorbereitet.";
    form.reset();
  });
}

if (heroSlider) {
  const slides = heroSlider.querySelectorAll("[data-hero-slide]");
  const indicators = heroSlider.querySelectorAll("[data-hero-indicator]");
  let activeIndex = 0;

  const setActiveSlide = (nextIndex) => {
    slides[activeIndex].classList.remove("is-active");
    indicators[activeIndex].classList.remove("is-active");

    activeIndex = nextIndex;

    slides[activeIndex].classList.add("is-active");
    indicators[activeIndex].classList.add("is-active");
  };

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      setActiveSlide(index);
    });
  });

  setInterval(() => {
    const nextIndex = (activeIndex + 1) % slides.length;
    setActiveSlide(nextIndex);
  }, 4200);
}

const serviceModal = document.getElementById("service-modal");
const serviceModalTitle = document.getElementById("service-modal-title");
const serviceModalText = document.getElementById("service-modal-text");
const serviceModalDetails = document.getElementById("service-modal-details");
const serviceCards = document.querySelectorAll(".service-card[data-service]");

const serviceContent = {
  statik: {
    title: "Tragwerksplanung / Statik",
    text: "Wir entwickeln belastbare und wirtschaftliche statische Konzepte für Neubau, Umbau und Sanierung. Dabei achten wir auf Sicherheit, klare Kommunikation und eine planbare Umsetzung.",
    details: [
      "Statische Berechnungen und Tragwerkskonzepte",
      "Baustatische Begleitung bis zur Ausführung",
      "Praktische Lösungen für realisierbare Bauwerke"
    ]
  },
  objektplanung: {
    title: "Objektplanung / Entwurfsverfasser",
    text: "Unsere Objektplanung verbindet funktionale Anforderungen mit gestalterischer Qualität und genehmigungsfähigen Lösungen. So entstehen durchdachte Entwürfe, die sich auch in der Umsetzung bewähren.",
    details: [
      "Entwurfs- und Objektplanung",
      "Koordination mit Fachplanern und Behörden",
      "Fokus auf Qualität, Wirtschaftlichkeit und Umsetzbarkeit"
    ]
  },
  schallschutz: {
    title: "Schallschutz",
    text: "Wir beraten und planen Schallschutzmaßnahmen, die den Anforderungen an Wohn- und Arbeitsqualität entsprechen und eine nachhaltige Nutzung sichern.",
    details: [
      "Schallschutzkonzepte für Gebäude",
      "Analyse und Nachweise nach aktuellen Vorgaben",
      "Maßnahmen für ruhige und komfortable Innenräume"
    ]
  },
  energie: {
    title: "Energieberater",
    text: "Wir begleiten energieeffiziente Bauvorhaben mit fundierter Beratung und nachvollziehbaren Lösungen, die sowohl technisch als auch wirtschaftlich sinnvoll sind.",
    details: [
      "Energieberatung und Konzepterstellung",
      "Förderfähige und nachhaltige Umsetzungswege",
      "Unterstützung bei der Planung und Dokumentation"
    ]
  },
  brandschutz: {
    title: "Brandschutz",
    text: "Unsere Brandschutzplanung schafft sichere, regelkonforme und praxisnahe Lösungen, die den Betrieb und die Nutzung eines Gebäudes zuverlässig unterstützen.",
    details: [
      "Brandschutzkonzepte und Nachweise",
      "Koordination mit Architektur und Technik",
      "Sichere Umsetzung im Bau- und Nutzungsprozess"
    ]
  },
  bauleitung: {
    title: "Bauleitung / Bauüberwachung",
    text: "Wir begleiten Ihre Bauprojekte aktiv vor Ort und sorgen für Qualität, Termine und Kostenkontrolle – von der Vorbereitung bis zur Übergabe.",
    details: [
      "Bauleitung und Bauüberwachung",
      "Kontrolle von Ausführung und Dokumentation",
      "Praktische Abstimmung mit Bauunternehmen und Fachplanern"
    ]
  }
};

const openServiceModal = (serviceKey) => {
  if (!serviceModal || !serviceContent[serviceKey]) {
    return;
  }

  const content = serviceContent[serviceKey];

  serviceModalTitle.textContent = content.title;
  serviceModalText.textContent = content.text;
  serviceModalDetails.innerHTML = "";

  content.details.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    serviceModalDetails.appendChild(listItem);
  });

  serviceModal.classList.add("is-open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeServiceModal = () => {
  if (!serviceModal) {
    return;
  }

  serviceModal.classList.remove("is-open");
  serviceModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    openServiceModal(card.dataset.service);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openServiceModal(card.dataset.service);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeServiceModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && serviceModal?.classList.contains("is-open")) {
    closeServiceModal();
  }
});

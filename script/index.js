// index.js

// — Preloader & Typewriter — 
const preloader = document.getElementById("preloader");
const text =
  "Lia isn't just about recipes. It's about bringing passion back to cooking. Pure, simple, and uninterrupted.";
const typewriterText = document.getElementById("typewriter-text");
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typewriterText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}

window.onload = function () {
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    preloader.style.pointerEvents = "none";
  }, 2200);
  typeWriter();
};

// — Mobile Menu Toggle — 
const hamburger = document.getElementById("hamburger");
const navArea = document.getElementById("nav-area");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navArea.classList.toggle("open");
});

// — Smooth Scroll + Close Mobile Menu on Link Click — 
document.querySelectorAll("#nav-area .nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    // close mobile menu
    hamburger.classList.remove("open");
    navArea.classList.remove("open");

    // perform smooth scroll
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// — Scroll-based Reveal Animation — 
let lastScrollPosition = window.pageYOffset;
const reveals = document.querySelectorAll(".reveal");

reveals.forEach(el => el.classList.remove("active"));

function handleScroll() {
  const currentScrollPosition = window.pageYOffset;
  const scrollingDown = currentScrollPosition > lastScrollPosition;
  const windowHeight = window.innerHeight;

  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      if (!scrollingDown) element.classList.add("active");
    } else {
      if (scrollingDown) element.classList.remove("active");
    }

    if (elementTop < 0 && scrollingDown) {
      element.classList.remove("active");
    }
  });

  lastScrollPosition = currentScrollPosition;
}

function throttle(callback, delay) {
  let previousCall = 0;
  return function () {
    const now = Date.now();
    if (now - previousCall >= delay) {
      previousCall = now;
      callback.apply(null, arguments);
    }
  };
}

window.addEventListener("scroll", throttle(handleScroll, 100));
document.addEventListener("DOMContentLoaded", handleScroll);

// — Fade-block Animation (GSAP & ScrollMagic) — 
document.addEventListener("DOMContentLoaded", () => {
  const controller = new ScrollMagic.Controller();

  document.querySelectorAll(".fade-block").forEach(el => {
    const tweenIn = gsap.to(el, { opacity: 1, duration: 0.6 });
    const tweenOut = gsap.to(el, { opacity: 0, duration: 0.6 });

    new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 0.8,
      reverse: true,
    })
      .setTween(tweenIn)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 0,
      offset: el.offsetHeight,
      reverse: true,
    })
      .setTween(tweenOut)
      .addTo(controller);
  });
});

// — Email.js Contact Form — 
function sendMail() {
  const params = {
    name:   document.getElementById("name").value,
    email:  document.getElementById("email").value,
    message:document.getElementById("message").value,
  };

  const serviceID = "service_bsart0i";
  const templateID = "template_26kdkm2";

  emailjs
    .send(serviceID, templateID, params)
    .then(res => {
      // clear form
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      alert("Your message was sent successfully!");
      console.log("Email sent:", res);
    })
    .catch(err => {
      console.error("Email send error:", err);
      alert("Failed to send message. Please try again.");
    });
}
document.addEventListener('DOMContentLoaded', () => {
  const modal       = document.getElementById('legal-modal');
  const modalText   = document.getElementById('legal-modal-text');
  const closeBtn    = document.querySelector('.legal-modal-close');
  const btnPrivacy  = document.getElementById('show-privacy');
  const btnTerms    = document.getElementById('show-terms');

  const privacyHTML = `
    <h2>Privacy Policy</h2>
    <p><strong>Effective Date:</strong> 20/05/2025</p>
    <p>LIA (“we,” “us,” “our”) values your privacy. This policy explains how we handle your information.</p>
    <h3>Information We Collect</h3>
    <ul>
      <li><strong>Personal Information:</strong> We do not collect personal information unless you provide it voluntarily (e.g., in app feedback).</li>
      <li><strong>Usage Data:</strong> We collect non-personal data such as general app usage to improve our services.</li>
      <li><strong>Third-Party Integration:</strong> Recipes are provided via the Spoonacular API, and chat responses are powered by Gemini AI. These third parties may handle your data according to their own privacy policies.</li>
    </ul>
    <h3>Use of Information</h3>
    <p>To deliver recipe and cooking advice.<br/>To improve the app’s features and content.</p>
    <h3>Data Sharing</h3>
    <p>Third-Party Services: Recipe searches and chat queries are sent to Spoonacular and Gemini AI as part of app functionality. We do not sell your data.</p>
    <h3>Security</h3>
    <p>We use standard security practices to protect any stored or transmitted data. LIA is committed to complying with the UAE Federal Decree Law No. 45 of 2021 on the Protection of Personal Data. Your information is processed transparently and securely, in line with applicable UAE laws. We also adhere to UAE consumer protection guidelines regarding clear communication of service limitations and rights.</p>
    <h3>Changes</h3>
    <p>We may update this policy. Continued app use indicates acceptance of revisions.</p>
    <h3>Contact</h3>
    <p>For privacy questions, contact: <a href="mailto:liaaiadvisor@gmail.com">liaaiadvisor@gmail.com</a></p>
  `;

  const termsHTML = `
    <h2>Terms and Conditions</h2>
    <p><strong>Effective Date:</strong> 20/05/2025</p>
    <ol>
      <li><strong>Recipes and Service Limits:</strong> Recipes are sourced from the Spoonacular API. Response time for loading recipes may vary depending on network conditions and external service status. Free users are subject to a daily recipe request limit determined by Spoonacular's free plan. If you reach the daily limit, you may need to wait until the next day to access more recipes. We appreciate your understanding and patience.</li>
      <li><strong>Chat Functionality:</strong> Chat answers and advice are generated by Gemini AI. While we strive for accuracy, the app is intended for informational and support purposes related to cooking.</li>
      <li><strong>External Services:</strong> Some features rely on third-party services. We cannot guarantee uninterrupted access to recipe information if these services experience technical issues or outages.</li>
      <li><strong>Intellectual Property:</strong> Except for third-party content, the app and its features are owned by us. You agree not to reproduce or distribute content without permission.</li>
      <li><strong>Modifications:</strong> We may update these terms periodically. Continued use of LIA implies acceptance of the latest terms.</li>
      <li><strong>Governing Law:</strong> These terms are governed by the laws of United Arab Emirates. We comply with all relevant UAE data protection and consumer laws, including Federal Decree Law No. 45 of 2021 on the Protection of Personal Data and Federal Law No. 15 of 2020 on Consumer Protection.</li>
      <li><strong>Contact:</strong> For questions, contact: <a href="mailto:liaaiadvisor@gmail.com">liaaiadvisor@gmail.com</a></li>
    </ol>
  `;

  function showModal(content) {
    modalText.innerHTML = content;
    modal.style.display = 'flex';
  }

  btnPrivacy.addEventListener('click', e => {
    e.preventDefault();
    showModal(privacyHTML);
  });

  btnTerms.addEventListener('click', e => {
    e.preventDefault();
    showModal(termsHTML);
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
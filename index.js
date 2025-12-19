// Navbar
const firstNav = document.querySelector(".first-nav");
const secNav = document.querySelector(".sec-nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // scroll down
    firstNav.classList.add("hide");
    secNav.style.display = "flex";
  } else {
    // back to top
    firstNav.classList.remove("hide");
    secNav.style.display = "none";
  }
});

// hero image scroll
  document.querySelectorAll('.v-col').forEach(col => {
            const clone = col.innerHTML;
            col.innerHTML += clone;
        });

// Pause animation  (school section)
document.querySelectorAll(".track").forEach((track) => {
  track.addEventListener("focusin", () => {
    track.style.animationPlayState = "paused";
  });
  track.addEventListener("focusout", () => {
    track.style.animationPlayState = "running";
  });
});
// 

// exhibition section
const slider = document.getElementById("slider");
const cards = document.querySelectorAll(".slide-card");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;

function visibleCards() {
  if (window.innerWidth <= 767) return 1;
  if (window.innerWidth <= 1023) return 2;
  return 3;
}

function updateSlider() {
  const cardWidth = cards[0].getBoundingClientRect().width + 24; // Width + Margin
  slider.style.transform = `translateX(-${index * cardWidth}px)`;
}

next.onclick = () => {
  index++;
  if (index > cards.length - visibleCards()) index = 0;
  updateSlider();
};

prev.onclick = () => {
  index--;
  if (index < 0) index = cards.length - visibleCards();
  updateSlider();
};

// Auto rotate
let autoSlide = setInterval(() => next.click(), 5000);

// Reset timer on manual click
[next, prev].forEach((btn) => {
  btn.addEventListener("click", () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => next.click(), 5000);
  });
});

window.addEventListener("resize", updateSlider);

// school fits you section
const sliders = document.querySelector('.card-grid');
  const slides = document.querySelectorAll('.card'); 
  const dots = document.querySelectorAll('.pagination button');

  function cardsPerView() {
    if (window.innerWidth <= 767) return 1; // mobile
    if (window.innerWidth <= 1023) return 2; // tablet
    return slides.length;
  }

  function goToSlide(index) {
    const cardWidth = slides[0].offsetWidth + 16; 
    const moveBy = index * cardsPerView() * cardWidth;

    sliders.scrollTo({
      left: moveBy,
      behavior: 'smooth'
    });

    dots.forEach(d => d.classList.remove('active'));
    dots[index]?.classList.add('active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  sliders.addEventListener('scroll', () => {
    const cardWidth = slides[0].offsetWidth + 16;
    const index = Math.round(
      sliders.scrollLeft / (cardWidth * cardsPerView())
    );

    dots.forEach(d => d.classList.remove('active'));
    dots[index]?.classList.add('active');
  });

  window.addEventListener('resize', () => goToSlide(0));


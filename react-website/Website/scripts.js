// AUTO-UPDATE THE FOOTER YEAR
const footerText = document.querySelector(".footer-bottom p");
if (footerText) {
  footerText.innerHTML = footerText.innerHTML.replace(
    /\d{4}/,
    new Date().getFullYear()
  );
}

// BACK-TO-TOP BUTTON
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.id = "back-to-top";
topBtn.setAttribute("aria-label", "Back to top");
document.body.appendChild(topBtn);

window.addEventListener("scroll", function () {
  topBtn.classList.toggle("show", window.scrollY > 300);
});

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// FADE-IN ON SCROLL
const revealItems = document.querySelectorAll("article, .category-card, .join-banner");
revealItems.forEach(function (item) {
  item.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(function (item) {
  observer.observe(item);
});

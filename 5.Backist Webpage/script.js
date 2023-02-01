"use strict";

// Smooth Scrolling
let learnMoreBtn = document.querySelector(".btn--scroll-to");
let section_1 = document.querySelector("#section--1");
let navLinks = document.querySelector(".nav__links");
learnMoreBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //! old way of scrolling
  window.scrollTo({
    top: window.scrollY + section_1.getBoundingClientRect().top,
    left: window.screenX + section_1.getBoundingClientRect().left,
    behavior: "smooth",
  });
});

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.getAttribute("href") || e.target.getAttribute("href") == "#")
    return;

  //! New Way of scrolling
  let navLink = document.querySelector(`${e.target.getAttribute("href")}`);
  navLink.scrollIntoView({ behavior: "smooth" });
});

// Tabs Toggle
let tabs = document.querySelector(".operations__tab-container");
tabs.addEventListener("click", function (e) {
  if (!e.target.closest(".operations__tab")) return;

  let clicked = e.target.closest(".operations__tab");
  let allTabs = document.querySelectorAll(".operations__tab");
  let tabContents = document.querySelectorAll(".operations__content");

  allTabs.forEach((newTab) => {
    newTab.classList.remove("operations__tab--active");
    clicked.classList.add("operations__tab--active");
  });
  tabContents.forEach((content) => {
    content.classList.remove("operations__content--active");
    let clickedContent = document.querySelector(
      `.operations__content--${clicked.dataset.tab}`
    );
    clickedContent.classList.add("operations__content--active");
  });
});

// Navigation hover effect
let navBar = document.querySelector(".nav");

navBar.addEventListener("mouseover", function (e) {
  e.preventDefault();
  if (!e.target.closest(".nav__item")) return;
  // console.log(navBar.children);
  Array.from(Array.from(navBar.children).at(1).children).forEach(
    (navElement) => {
      navElement.classList.add("mouseOver");
      navElement.children[0].getAttribute("href") ==
      e.target.getAttribute("href")
        ? navElement.classList.remove("mouseOver")
        : null;
    }
  );
});

navBar.addEventListener("mouseout", function (e) {
  Array.from(Array.from(navBar.children).at(1).children).forEach(
    (navElement) => {
      navElement.classList.remove("mouseOver");
    }
  );
});

// Sticky Navigation Bar
let header = document.querySelector(".header");
let observeNext = function (entries) {
  if (!entries.at(0).isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};
let observer = new IntersectionObserver(observeNext, {
  root: null,
  threshold: 0.1,
  rootMargin: "-30px",
});
observer.observe(header);

// Heading fade-in effect
let allSection = document.querySelectorAll(".section");
allSection.forEach((section) => {
  let callBack = function (entries) {
    if (entries.at(0).isIntersecting)
      section.classList.remove("section--hidden");
    // sectionObserver.unobserve(section);
  };
  section.classList.add("section--hidden");
  let sectionObserver = new IntersectionObserver(callBack, {
    root: null,
    threshold: 0.15,
  });
  sectionObserver.observe(section);
});

// Lazy Loading
let imgs = document.querySelectorAll(".features__img");
console.log(imgs);
imgs.forEach((img) => {
  let orginalImg = img.dataset.src;
  let callBack = function (entries) {
    // console.log("hi");
  };
  let imgObserver = new IntersectionObserver(callBack, {
    root: null,
    threshold: 0.1,
    rootMargin: "-200px",
  });
  imgObserver.observe(img);
});

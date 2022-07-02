'use strict';
const body = document.querySelector('body')
const btnOpenForm = document.querySelector('.show-form');
const btnCloseForm = document.querySelector('.close-form');
const formModal = document.querySelector('.contact-form');
const overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.navbar-nav')
const tabContainer = document.querySelector('.services')
const btnTab = document.querySelectorAll('.hire-me')
const tabContent = document.querySelectorAll('.tabbed-component')
const mainNav = document.querySelector('.navbar')



//  show contact form
const showContactForm = function () {
  overlay.classList.remove('hidden');
  formModal.classList.remove('hidden');
};
//  close contact form
const closeContactForm = function () {
  overlay.classList.add('hidden');
  formModal.classList.add('hidden');
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !formModal.classList.contains('hidden')) {
    closeContactForm();
  }
});

btnOpenForm.addEventListener('click', showContactForm);
btnCloseForm.addEventListener('click', closeContactForm);

// button scroll================

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

// page navigation====================

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav-link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }; 
    
});

// tabbed component ========================

tabContainer.addEventListener('click', function(e){
  const clicked = e.target
 if(!clicked) return;

//  removing active class on button
  btnTab.forEach(btn =>{
  btn.classList.remove('service__btn-active')
})
// adding active class on button
  clicked.classList.add('service__btn-active')

  // remove active sevice class
  tabContent.forEach(tContent => {
    tContent.classList.remove('service__tabbed-active')
  })
  // add active service class
    document.querySelector(`.service__tabbed-${clicked.dataset.tab}`).classList.add('service__tabbed-active')

})

// menu fade navigation=====================

const handleHover = function(e){
    if(e.target.classList.contains('nav-link')){
      const link = e.target;
      const siblings = link.closest('.navbar').querySelectorAll('.nav-link')
  
      siblings.forEach(el =>{
        if(el !== link) el.style.opacity = this;
      })
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// scroll navigation============(would fix later)

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {

//   if (window.scrollY > initialCoords.top) mainNav.classList.add('sticky');
//   else mainNav.classList.remove('sticky');
// });

// Reveal sections =============================

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)

  
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold:0.15,
})

allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})
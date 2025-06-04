const sideMenu  = document.getElementById('sideMenu');
const openBtn   = document.getElementById('openMenu');
const closeBtn  = document.getElementById('closeMenu');

openBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

document.addEventListener('click', (e) => {
  const isDesktop = window.innerWidth > 768;
  const clickedOutside = !sideMenu.contains(e.target) && !openBtn.contains(e.target);

  if (isDesktop && sideMenu.classList.contains('open') && clickedOutside) {
    sideMenu.classList.remove('open');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const addBtns = document.querySelectorAll('.add-btn, .overlay-btn');
  const basketCount = document.getElementById('basket-count') || document.querySelector('.cart');
  let count = 0;

  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      count++;
      basketCount.textContent = count;

      btn.classList.add('added');
      const textEl = btn.querySelector('.btn-text');
      const arrowEl = btn.querySelector('.btn-arrow');
      const original = textEl.textContent;

      textEl.textContent = '✓ Added';
      if (arrowEl) arrowEl.style.visibility = 'hidden';

      setTimeout(() => {
        btn.classList.remove('added');
        textEl.textContent = original;
        if (arrowEl) arrowEl.style.visibility = 'visible';
      }, 1000);

      basketCount.classList.add('bump');
      setTimeout(() => basketCount.classList.remove('bump'), 350);
    });
  });
});
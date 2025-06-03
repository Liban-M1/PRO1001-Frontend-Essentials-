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
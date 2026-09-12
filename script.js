document.addEventListener("DOMContentLoaded", () => {

  // Seal fade-out reliability fix
  const sealOverlayFix =
    document.getElementById("opening") ||
    document.getElementById("openingScreen") ||
    document.querySelector(".opening") ||
    document.querySelector(".opening-screen") ||
    document.querySelector(".seal-screen") ||
    document.querySelector(".intro-screen");

  const sealButtonFix =
    document.getElementById("sealButton") ||
    document.getElementById("openInvitation") ||
    document.querySelector(".seal-button") ||
    document.querySelector(".opening-seal");

  function forceOpenAndFade() {
    if (!sealOverlayFix) return;

    sealOverlayFix.classList.add("opened", "is-open");
    sealOverlayFix.style.pointerEvents = "none";

    document.body.classList.remove("locked", "intro-lock", "no-scroll");

    // Fade first, then fully remove the overlay so it cannot stay over the site.
    window.setTimeout(() => {
      sealOverlayFix.classList.add("fade-complete");
      sealOverlayFix.setAttribute("aria-hidden", "true");
    }, 820);
  }

  if (sealButtonFix) {
    sealButtonFix.addEventListener("click", forceOpenAndFade, { once:false });
  }

  // Extra fallback: if old code already marks it opened, finish the fade automatically.
  if (sealOverlayFix) {
    const fadeObserver = new MutationObserver(() => {
      if (sealOverlayFix.classList.contains("opened") || sealOverlayFix.classList.contains("is-open")) {
        window.setTimeout(() => {
          sealOverlayFix.classList.add("fade-complete");
          sealOverlayFix.setAttribute("aria-hidden", "true");
          document.body.classList.remove("locked", "intro-lock", "no-scroll");
        }, 820);
      }
    });
    fadeObserver.observe(sealOverlayFix, { attributes:true, attributeFilter:["class"] });
  }

});
const opening=document.getElementById('opening'),seal=document.getElementById('seal'),music=document.getElementById('bgMusic'),musicBtn=document.getElementById('musicBtn');
function openInvite(){opening.classList.add('open');document.body.classList.remove('locked');music.volume=.32;music.play().then(()=>musicBtn.classList.add('playing')).catch(()=>{});setTimeout(()=>document.querySelector('#cover .reveal').classList.add('visible'),650)}
seal.addEventListener('click',openInvite);seal.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openInvite()});
musicBtn.addEventListener('click',()=>{if(music.paused){music.play();musicBtn.classList.add('playing')}else{music.pause();musicBtn.classList.remove('playing')}});
document.querySelectorAll('.scroll').forEach(b=>b.addEventListener('click',()=>document.querySelector(b.dataset.target).scrollIntoView({behavior:'smooth'})));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.reveal').forEach(x=>x.classList.add('visible'))}),{threshold:.42});document.querySelectorAll('.page').forEach(p=>obs.observe(p));
const blurObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.body.classList.toggle('bgblur',e.target.classList.contains('blurzone'))}),{threshold:.55});document.querySelectorAll('.page').forEach(p=>blurObs.observe(p));

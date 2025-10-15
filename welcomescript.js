
//fleche qui descend//
   function scrollToContent() {
      document.getElementById('content').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }

    document.querySelector('.arrowbottom').addEventListener('click', function() {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      }
    )
})




//Carrousel//
const buttonsWrapper = document.querySelector(".map");
const slides = document.querySelector(".inner");


buttonsWrapper.addEventListener("click", e => {
    if (e.target.nodeName === "BUTTON") {
        Array.from(buttonsWrapper.children).forEach(item =>
            item.classList.remove("active")
        );
        if (e.target.classList.contains("first")) {
            slides.style.transform = "translateX(-0%)";
            e.target.classList.add("active");
        } else if (e.target.classList.contains("second")) {
            slides.style.transform = "translateX(-33.33333333333333%)";
            e.target.classList.add("active");
        } else if (e.target.classList.contains('third')) {
            slides.style.transform = 'translatex(-66.6666666667%)';
            e.target.classList.add('active');
        }
    }
});

//Rellax//
var rellax = new Rellax('.textpres2');
var rellax1 = new Rellax('.textpres1')
var rellax2 = new Rellax('.shopsentence');
const rellax3 = new Rellax (".built-your-imagination");
const lego1 = new Rellax('.lego1');
const lego2 = new Rellax('.lego2');
const lego3 = new Rellax('.lego3');
const lego4 = new Rellax('.lego4');
const lego5 = new Rellax('.lego5');
const lego6 = new Rellax('.lego6');


//cookies//
const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');

  const consent = localStorage.getItem('cookie_consent');

  if (!consent) {
    banner.setAttribute('aria-hidden', 'false');
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    banner.setAttribute('aria-hidden', 'true');
    enableCookies();
  });

  declineBtn.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    banner.setAttribute('aria-hidden', 'true');
    disableCookies();
  });

  function enableCookies() {
    console.log('Cookies acceptés');
  }

  function disableCookies() {
    console.log('Cookies refusés');
  }
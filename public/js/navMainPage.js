const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
      el.style.opacity = 1;
    }, 10);
};
const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};

myID = document.getElementById("navAfterScroll");

var myScrollFunc = function() {
  var y = window.scrollY;
  myIDStyle = getComputedStyle(myID)
  if (y >= 900) {
    if (myIDStyle.display == "none") {
        fadeIn(myID, 200, "flex")
    }

  } else {
    if (myIDStyle.display == "flex") {
        fadeOut(myID, 200)
    }
    
  }
};

window.addEventListener("scroll", myScrollFunc);
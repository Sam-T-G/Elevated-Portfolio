//Scrolling function to smoothen scroll through page
function scrollToWithRamping(targetElement, offset) {
    const start = window.scrollY;
    const targetPosition = targetElement.offsetTop - offset;
    const distance = targetPosition - start;
    // Adjustable, 750 seems to be the desired animation duration in milliseconds
    const duration = 750; 
    // This custom ease function I've created with the help of AI in order to create my desired effect of easing the navigation scroll effect to give a more modernized feel.
    const easingFunction = (t) => {
         // This conditional statement checks the value of 't' and because it's less than 0.5, it targets the first part of the animation
    return t < 0.5
        // This formula targets the first half of the animation and creates a cubic easing function that starts slowly but gradually accelerates multiplicatively
        ? 4 * t * t * t
        // This segment targets the second half of the animation from 0.5 to 1 and is a mirror to the first half in order to smoothen out deceleration of the animation.
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    //keeps tract of starting time of animation
    let startTime = null;
    //main animation function
    function scroll(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easingFunction(progress);

        window.scrollTo(0, start + distance * easedProgress);
        //makes animation persistent
        if (timeElapsed < duration) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}

//Parallax through hero elements and mainline photos

//Have Sweeping animation through main works area

// Potential interactive divider or mouse-triggered reveal divider

//3d animation?

//Typing animation for Hero Element
const header = document.getElementById('typing-header');
const textElement = document.getElementById('typing-text');
const typingSpeed = 75; // Adjust the typing speed in milliseconds
//Set default viewport value to false so element is empty on page load
let isElementInViewport = false;

function typeTextEffect() {
  const textToType = "Unspoken beauty through simplicity";
  //Clears text element to an empty string by default when not in viewport
  textElement.textContent = '';
    //typeCharacter element checks to see if the if the header is in the viewport, and if not, halts the animation
  function typeCharacter(charIndex = 0) {
    if (!isElementInViewport || charIndex >= textToType.length) return;
    //if the header is within the viewport, it appends the letters to be typed one by one according to the set delay in milliseconds dicated under typingSpeed variable
    textElement.textContent += textToType.charAt(charIndex);
    setTimeout(() => typeCharacter(charIndex + 1), typingSpeed);
  }
  //calls typeCharacter function
  typeCharacter();
}
//Utilize IntersectionObserver to check if the header element is within the viewport
const observer = new IntersectionObserver(entries => {
  isElementInViewport = entries[0].isIntersecting;
  //Clears text element if it is out of the viewport
  isElementInViewport ? typeTextEffect() : (textElement.textContent = '');
});
//Set the IntersectionObserver to observe the header element
observer.observe(header);
typeTextEffect();

window.addEventListener('scroll', function () {
  const container = document.querySelector('.hero');
  let offset = window.pageYOffset;
  container.style.backgroundPositionY = -offset * 0.3 + 'px';
});
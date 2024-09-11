var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function fisrtPageAnim(){
    var t1= gsap.timeline();

    t1.from("#nav",{
        y:'-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

        .to(".boundingelem", {
          y:0,
          stagger: .2,
          duration: 2,
          delay:-1,
          ease: Expo.easeInOut
    })
    .from(".herofooter",{
        y: 10,
        opacity:0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

function circleshapechanger(){
    var xscale = 1;
    var yscale = 1;
    var xprev =0;
    var yprev =0;
    window.addEventListener("mousemove", function(dets){
       clearTimeout(timeout);

       xscale= gsap.utils.clamp(.8,1.2,dets.clientX -xprev);
       yscale= gsap.utils.clamp(.8,1.2, dets.clientY -yprev);

       xprev=dets.clientX;
       xprev=dets.clientY;
       
      circleMouseFollower(xscale, yscale);

      timeout = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;

      },100);
    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

circleshapechanger();
circleMouseFollower();
fisrtPageAnim();

document.querySelectorAll(".elem").forEach(function(elem) {
    elem.addEventListener("mousemove", function(event) {
        const rect = elem.getBoundingClientRect();
        const img = elem.querySelector("img");

        // Ensure the image is visible
        img.style.display = "block";

        // Calculate the center position of the image vertically
        const elemHeight = rect.height;
        const imgHeight = img.offsetHeight;
        const topMargin = (elemHeight - imgHeight) / 2;

        // Calculate the center of the element
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate the mouse position relative to the center
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Increase the tilt effect
        const rotateX = (deltaY / centerY) * 20;  // Increased multiplier for more tilt
        const rotateY = (deltaX / centerX) * -20; // Increased multiplier for more tilt

        // Animate the image's position, opacity, and rotation
        gsap.to(img, {
            opacity: 1,
            ease: "power1.out",
            duration: 0.5,
            top: `${topMargin}px`,   // Center vertically with equal margin
            left: `${mouseX}px`,     // Follow mouse horizontally
            rotationX: rotateX,      // Tilt along X-axis
            rotationY: rotateY,      // Tilt along Y-axis
            transformPerspective: 500, // Set perspective to give 3D effect
            transformOrigin: "center" // Ensure rotation around the center
        });
    });

    elem.addEventListener("mouseleave", function() {
        const img = elem.querySelector("img");

        // Optionally hide the image again on mouse leave
        gsap.to(img, {
            opacity: 0,
            ease: "power1.out",
            duration: 0.5,
            onComplete: () => {
                img.style.display = "none"; // Reset display after animation completes
            }
        });
    });
});

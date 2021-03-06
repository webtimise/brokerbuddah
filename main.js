let sections = gsap.utils.toArray("section"),
    currentSection = sections[0];

gsap.defaults({overwrite: 'auto', duration: 0.3});

// stretch out the body height according to however many sections there are. 
gsap.set("body", {height: (sections.length * 100) + "%"});

// create a ScrollTrigger for each section
sections.forEach((section, i) => {
  ScrollTrigger.create({
    // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
    start: () => (i - 0.5) * innerHeight,
    end: () => (i + 0.5) * innerHeight,
    // when a new section activates (from either direction), set the section accordinglyl.
    onToggle: self => self.isActive && setSection(section),

    onEnter: () => {
      gsap.from(".step-action", {y: 10, opacity: 1}),
//      gsap.from(".agent.center.slide", {x: -100, autoAlpha: 0, duration: 1})
      gsap.from(".insured.center.slide", {x: 100, opacity: 1, duration: 1})
      },
    onEnterBack: () => {
      gsap.from(".step-action", {y: -10, opacity: 1})
    },
    onLeave: () => {
//      gsap.to(".step-action", {y: 20, opacity: 1})
      gsap.to(".insured.center.slide", {x: -100, opacity: 0, duration: 1})
      },
    markers: true

  });
});

function setSection(newSection) {
  if (newSection !== currentSection) {
//    gsap.to(currentSection, {scale: 0.9, autoAlpha: 0});
    gsap.to(currentSection, {scale: 1, autoAlpha: 0});
    gsap.to(newSection, {scale: 1, autoAlpha: 1});
    currentSection = newSection;
  }
}

// handles the infinite part, wrapping around at either end....
/*
ScrollTrigger.create({
  start: 1,
  end: () => ScrollTrigger.maxScroll(window) - 1,
  onLeaveBack: self => self.scroll(ScrollTrigger.maxScroll(window) - 2),
  onLeave: self => self.scroll(2)
}).scroll(2);
*/

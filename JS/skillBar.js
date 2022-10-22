class SkillBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    fetch("/components/skill-bar-template.html")
      .then((response) => response.text())
      .then((text) => {
        let tmpl = $.parseHTML(text)[0];
        shadow.append(document.importNode(tmpl.content, true));
        updateContent(this, shadow);
      })
      .catch((err) => console.log(err));

    window.addEventListener("scroll", () => {
      let skillBar = shadow.getElementById("skill-bar");
      if (!skillBar || !isScrolledIntoView(skillBar)) return;
      if (skillBar.hasAttribute("meter-" + this.getAttribute("percentage")))
        return;

      skillBar.setAttribute(
        "class",
        "meter-" + this.getAttribute("percentage")
      );

      // let cssClass = skillBar.classList[0];
      // skillBar.classList.remove(cssClass);
      // skillBar.classList.add(cssClass);
      console.log("scrolling...");
    });
  }

  get percentage() {
    return this.hasAttribute("percentage");
  }

  set percentage(val) {
    this.setAttribute("percentage", val);
  }

  get text() {
    return this.hasAttribute("text");
  }

  set text(val) {
    this.setAttribute("text", val);
  }
}

customElements.define("skill-bar", SkillBar);

function updateContent(elem, shadow) {
  shadow.getElementById("skill-text").textContent = elem.getAttribute("text");
  // shadow
  //   .getElementById("skill-bar")
  //   .setAttribute("class", "meter-" + elem.getAttribute("percentage"));
}

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

// listen for scroll event
// $(window).scroll(function () {
//   // check if element is scrolled into view
//   if (isScrolledIntoView($('#skill-bar'))) {
//     // element is scrolled into view, add animation class
//     $('#skill-bar').clas
//     $('#skill-bar').addClass('animation');
//   }
// });

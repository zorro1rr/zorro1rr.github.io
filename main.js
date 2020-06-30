const content = document.querySelector("#content");
//grabing elements for animations/hover effects
const flexdesk = document.querySelector(".flexdesk");
const portfolio = document.querySelector("#portfolio");
const portfolio1 = document.querySelector("#portfolio1");
const homeDev = document.querySelector(".homeDiv");
const about = document.querySelector("h2");
const hr = document.querySelector("#hr");
const profile = document.querySelector("#profile");
const html = document.querySelector("#htmlDiv");
const css = document.querySelector("#cssDiv");
const js = document.querySelector("#jsDiv");
const react = document.querySelector("#reactDiv");
const portH2 = document.querySelector("#portH2");
const portHr = document.querySelector("#portHr");
const capstone = document.querySelector("#capstone");
const project1 = document.querySelector(".project1");
const project2 = document.querySelector(".project2");
const project3 = document.querySelector(".project3");
const project4 = document.querySelector(".project4");
const project5 = document.querySelector(".project5");
const project6 = document.querySelector(".project6");
const homeLink = document.querySelector("#homeLink");
const aboutLink = document.querySelector("#aboutLink");
const portLink = document.querySelector("#portLink");
const contactLink = document.querySelector("#contactLink");
const about2 = document.querySelector("#about");
const aboutH2 = document.querySelector("#aboutH2");
const cHr = document.querySelector("#cHr");
const submitDiv = document.querySelector("#submitDiv");
//listen for scrolls and check for position to trigger css animations.
window.addEventListener("scroll", function () {
  if (project5.getBoundingClientRect().bottom < 0) {
    submitDiv.classList.add("active");
  }
  if (project5.getBoundingClientRect().top < 0) {
    aboutH2.classList.add("active");
    cHr.classList.add("active");
  }
  if (project1.getBoundingClientRect().bottom < 0) {
    project5.classList.add("active");
    project6.classList.add("active");
  }
  if (capstone.getBoundingClientRect().bottom < 0) {
    project3.classList.add("active");
    project4.classList.add("active");
  }
  if (capstone.getBoundingClientRect().top < 0) {
    project2.classList.add("active");
    project1.classList.add("active");
  }

  if (js.getBoundingClientRect().bottom < 0) {
    capstone.classList.add("active");
  }
  if (js.getBoundingClientRect().top < 0) {
    portHr.classList.add("active");
    portH2.classList.add("active");
  }
  if (js.getBoundingClientRect().top < 0) {
    portHr.classList.add("active");
    portH2.classList.add("active");
  }

  if (homeDev.getBoundingClientRect().bottom < 0) {
    profile.classList.add("active");
    html.classList.add("active");
    css.classList.add("active");
    js.classList.add("active");
    react.classList.add("active");
  }
  if (homeDev.getBoundingClientRect().top < 0) {
    about.classList.add("active");
    hr.classList.add("active");
  }
  if (content.getBoundingClientRect().top < 0) {
    flexdesk.classList.add("active");
  } else {
    flexdesk.classList.remove("active");
  }
});
//check for scrolls for  nav bar highlights (made second event listener for readability)
window.addEventListener("scroll", function () {
  if (about2.getBoundingClientRect().top < 0) {
    aboutLink.classList.add("active");
    homeLink.classList.remove("active");
  } else {
    homeLink.classList.add("active");
    aboutLink.classList.remove("active");
  }
  if (portfolio1.getBoundingClientRect().top < 0) {
    aboutLink.classList.remove("active");
    portLink.classList.add("active");
  } else {
    portLink.classList.remove("active");
  }
  if (project5.getBoundingClientRect().bottom < 0) {
    portLink.classList.remove("active");
    contactLink.classList.add("active");
  } else {
    contactLink.classList.remove("active");
  }
});
//div to inject waiting and sent text to.
const thanks = document.querySelector("#thanks");
//iffe function for gmail xhr request
(function () {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;
    thanks.innerHTML = "<p>Sending...</p>";
    var fields = Object.keys(elements)
      // .filter(function (k) {
      //   if (elements[k].name === "honeypot") {
      //     honeypot = elements[k].value;
      //     return false;
      //   }
      //   return true;
      // })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    return { data: formData, honeypot: honeypot };
  }

  function handleFormSubmit(event) {
    // handles form submit
    event.preventDefault(); // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    // if (formData.honeypot) {
    //   return false;
    // }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        // var formElements = form.querySelector(".form-elements");
        // if (formElements) {
        //   formElements.style.display = "none"; // hide form
        // }
        // var thankYouMessage = form.querySelector(".thankyou_message");
        // if (thankYouMessage) {
        //   thankYouMessage.style.display = "block";
        // }

        thanks.innerHTML =
          "<p>Email Sent! I'll get back with you as soon as possible!</p>";
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();

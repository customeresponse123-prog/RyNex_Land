(function () {
  "use strict";

  function getApiBase() {
    var el = document.body;
    var url = el && el.getAttribute("data-api-url");
    if (url && url.trim()) return url.replace(/\/$/, "");
    return "http://localhost:5000";
  }

  function postLead(payload) {
    return fetch(getApiBase() + "/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  var heroForm = document.getElementById("hero-lead-form");
  if (heroForm) {
    heroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(heroForm);
      var state = fd.get("state") || "";
      postLead({
        name: fd.get("name"),
        email: fd.get("email"),
        county: fd.get("county"),
        state: state,
        phone: "",
        parcel_number: "",
        acres: "",
        asking_price: "",
        notes: state ? "State: " + state : ""
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          alert("Thanks! We'll be in touch with your offer soon.");
          heroForm.reset();
        })
        .catch(function () {
          alert("Something went wrong. Please try again.");
        });
    });
  }

  var sellerForm = document.getElementById("seller-form");
  if (sellerForm) {
    sellerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(sellerForm);
      postLead({
        name: fd.get("name"),
        email: fd.get("email"),
        county: fd.get("county"),
        state: fd.get("state"),
        parcel_number: fd.get("parcel_number") || "",
        acres: fd.get("acres") || "",
        asking_price: fd.get("asking_price") || "",
        notes: fd.get("notes") || "",
        phone: ""
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          alert("Property submitted successfully!");
          sellerForm.reset();
        })
        .catch(function () {
          alert("Error submitting property.");
        });
    });
  }

  var faqExtra = document.getElementById("faq-extra");
  var faqBtn = document.getElementById("faq-toggle");
  if (faqExtra && faqBtn) {
    faqBtn.addEventListener("click", function () {
      var open = faqExtra.hasAttribute("hidden");
      if (open) {
        faqExtra.removeAttribute("hidden");
        faqBtn.textContent = "Show fewer questions";
        faqBtn.setAttribute("aria-expanded", "true");
      } else {
        faqExtra.setAttribute("hidden", "");
        faqBtn.textContent = "Show more FAQs";
        faqBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

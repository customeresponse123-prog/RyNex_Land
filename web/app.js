(function () {
  "use strict";

  var menuBtn = document.getElementById("header-menu-btn");
  var siteNav = document.getElementById("site-nav");
  function setMenuOpen(open) {
    if (!menuBtn || !siteNav) return;
    siteNav.classList.toggle("is-open", open);
    menuBtn.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }
  if (menuBtn && siteNav) {
    menuBtn.addEventListener("click", function () {
      setMenuOpen(!siteNav.classList.contains("is-open"));
    });
    siteNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setMenuOpen(false);
    });
  }

  var WEB3FORMS_URL = "https://api.web3forms.com/submit";
  var SUPABASE_TABLE = "leads";

  function getApiBase() {
    var el = document.body;
    var url = el && el.getAttribute("data-api-url");
    if (url && url.trim()) return url.replace(/\/$/, "");
    return "http://localhost:5000";
  }

  function getWeb3AccessKey() {
    var el = document.body;
    var k = el && el.getAttribute("data-web3forms-access-key");
    return k && k.trim() ? k.trim() : "";
  }

  function getSupabaseUrl() {
    var el = document.body;
    var u = el && el.getAttribute("data-supabase-url");
    return u && u.trim() ? u.trim().replace(/\/$/, "") : "";
  }

  function getSupabaseAnonKey() {
    var el = document.body;
    var k = el && el.getAttribute("data-supabase-anon-key");
    return k && k.trim() ? k.trim() : "";
  }

  function isSupabaseConfigured() {
    return !!(getSupabaseUrl() && getSupabaseAnonKey());
  }

  function insertSupabaseLead(row) {
    var base = getSupabaseUrl();
    var key = getSupabaseAnonKey();
    return fetch(base + "/rest/v1/" + SUPABASE_TABLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: "Bearer " + key,
        Prefer: "return=minimal"
      },
      body: JSON.stringify(row)
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          var msg = (t && t.slice(0, 200)) || "Supabase HTTP " + res.status;
          throw new Error(msg);
        });
      }
    });
  }

  function postLead(payload) {
    return fetch(getApiBase() + "/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  function web3ResponseOk(data) {
    return !!(data && (data.success === true || data.success === "true"));
  }

  function web3ErrorMessage(data, res) {
    if (!data) return res && res.status ? "HTTP " + res.status : "Empty response";
    if (data.message) return String(data.message);
    if (data.body && data.body.message) return String(data.body.message);
    return "Submission failed";
  }

  function postWeb3Forms(body) {
    return fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().then(function (data) {
        return { res: res, data: data };
      });
    }).then(function (out) {
      if (!web3ResponseOk(out.data)) {
        throw new Error(web3ErrorMessage(out.data, out.res));
      }
    });
  }

  /**
   * Runs Web3Forms and/or Supabase and/or local Express based on body data-* config.
   */
  function submitLead(leadPayload, web3Body, supabaseRow) {
    var useWeb3 = !!getWeb3AccessKey();
    var useSb = isSupabaseConfigured();
    var tasks = [];

    if (useWeb3) {
      tasks.push(postWeb3Forms(web3Body));
    }
    if (useSb) {
      tasks.push(insertSupabaseLead(supabaseRow));
    }
    if (!useWeb3 && !useSb) {
      tasks.push(
        postLead(leadPayload).then(function (res) {
          if (!res.ok) throw new Error("bad status");
        })
      );
    }

    if (tasks.length === 0) {
      return Promise.reject(new Error("Configure Web3Forms, Supabase, or data-api-url for Express."));
    }

    return Promise.all(tasks);
  }

  var heroForm = document.getElementById("hero-lead-form");
  if (heroForm) {
    heroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(heroForm);
      var state = fd.get("state") || "";
      var county = fd.get("county") || "";
      var name = fd.get("name");
      var email = fd.get("email");
      var leadPayload = {
        name: name,
        email: email,
        county: county,
        state: state,
        phone: "",
        parcel_number: "",
        acres: "",
        asking_price: "",
        notes: state ? "State: " + state : ""
      };
      var message =
        "Form: Hero (Get Offer)\n" +
        "County: " +
        county +
        "\n" +
        "State: " +
        state;
      var web3Body = {
        access_key: getWeb3AccessKey(),
        name: name,
        from_name: "RyNex Land",
        email: email,
        subject: "RyNex Land — Get Offer (hero)",
        message: message
      };
      var supabaseRow = {
        form_type: "hero",
        name: name,
        email: email,
        county: county,
        state: state,
        notes: leadPayload.notes,
        parcel_number: "",
        acres: "",
        asking_price: "",
        phone: ""
      };
      submitLead(leadPayload, web3Body, supabaseRow)
        .then(function () {
          alert("Thanks! We'll be in touch with your offer soon.");
          heroForm.reset();
        })
        .catch(function (err) {
          alert(
            err && err.message
              ? "Form error: " + err.message
              : "Something went wrong. Please try again."
          );
        });
    });
  }

  var sellerForm = document.getElementById("seller-form");
  if (sellerForm) {
    sellerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(sellerForm);
      var name = fd.get("name");
      var email = fd.get("email");
      var county = fd.get("county") || "";
      var state = fd.get("state") || "";
      var notes = fd.get("notes") || "";
      var parcel = fd.get("parcel_number") || "";
      var acres = fd.get("acres") || "";
      var leadPayload = {
        name: name,
        email: email,
        county: county,
        state: state,
        parcel_number: parcel,
        acres: acres,
        asking_price: fd.get("asking_price") || "",
        notes: notes,
        phone: ""
      };
      var message =
        "Form: Submit Property\n" +
        "County: " +
        county +
        "\n" +
        "State: " +
        state +
        "\n" +
        "Notes: " +
        notes +
        "\n" +
        "Parcel: " +
        parcel +
        "\n" +
        "Acreage: " +
        acres;
      var web3Body = {
        access_key: getWeb3AccessKey(),
        name: name,
        from_name: "RyNex Land",
        email: email,
        subject: "RyNex Land — Property submission",
        message: message
      };
      var supabaseRow = {
        form_type: "seller",
        name: name,
        email: email,
        county: county,
        state: state,
        notes: notes,
        parcel_number: parcel,
        acres: acres,
        asking_price: leadPayload.asking_price,
        phone: ""
      };
      submitLead(leadPayload, web3Body, supabaseRow)
        .then(function () {
          alert("Property submitted successfully!");
          sellerForm.reset();
        })
        .catch(function (err) {
          alert(
            err && err.message
              ? "Form error: " + err.message
              : "Error submitting property."
          );
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

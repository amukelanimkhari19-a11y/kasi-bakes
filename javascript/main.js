/**
 * Kasi Bakes — main.js
 * Part 3: JavaScript Functionality
 *
 * Features:
 * 1. Mobile navigation toggle (hamburger menu)
 * 2. FAQ Accordion
 * 3. Product search and category filter
 * 4. Gallery lightbox
 * 5. Enquiry form validation and price/availability response
 * 6. Contact form validation and mailto email generation
 * 7. Interactive map tabs (Leaflet.js)
 * 8. Character counter for textarea
 */

/* ============================================================
   1. MOBILE NAVIGATION TOGGLE
   Toggles the nav open/closed on mobile when hamburger clicked
   ============================================================ */
(function initMobileNav() {
  "use strict";

  // Get references to the toggle button and nav menu
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  // Only run if both elements exist on the current page
  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", function () {
    // Toggle the 'open' class to show/hide the nav menu
    const isOpen = mainNav.classList.toggle("open");

    // Update aria-expanded for accessibility
    navToggle.setAttribute("aria-expanded", isOpen.toString());

    // Toggle the active class on the button for the hamburger animation
    navToggle.classList.toggle("active", isOpen);
  });

  // Close nav when a link is clicked (for single-page feel on mobile)
  const navLinks = mainNav.querySelectorAll("a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("active");
    });
  });

  // Close nav when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("active");
    }
  });
})();


/* ============================================================
   2. FAQ ACCORDION
   Opens and closes FAQ panels on index.html
   ============================================================ */
(function initAccordion() {
  "use strict";

  // Get all accordion trigger buttons
  const triggers = document.querySelectorAll(".accordion-trigger");

  // Only run if accordion elements exist
  if (triggers.length === 0) return;

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      // Get the target panel ID from aria-controls attribute
      const panelId = trigger.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const icon = trigger.querySelector(".accordion-icon");

      // Check if this item is currently open
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other open accordion items first
      document.querySelectorAll(".accordion-trigger").forEach(function (otherTrigger) {
        if (otherTrigger !== trigger) {
          const otherId = otherTrigger.getAttribute("aria-controls");
          const otherPanel = document.getElementById(otherId);
          const otherIcon = otherTrigger.querySelector(".accordion-icon");

          otherTrigger.setAttribute("aria-expanded", "false");
          otherTrigger.classList.remove("expanded");
          if (otherPanel) otherPanel.hidden = true;
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      // Toggle the clicked item
      if (isExpanded) {
        // Close it
        trigger.setAttribute("aria-expanded", "false");
        trigger.classList.remove("expanded");
        if (panel) panel.hidden = true;
        if (icon) icon.textContent = "+";
      } else {
        // Open it
        trigger.setAttribute("aria-expanded", "true");
        trigger.classList.add("expanded");
        if (panel) panel.hidden = false;
        if (icon) icon.textContent = "−";
      }
    });
  });
})();


/* ============================================================
   3. PRODUCT SEARCH AND CATEGORY FILTER
   Filters products on products.html by name search and category
   ============================================================ */
(function initProductFilter() {
  "use strict";

  const searchInput = document.getElementById("productSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");
  const clearSearchBtn = document.getElementById("clearSearch");

  // Only run if filter elements exist (i.e. on products.html)
  if (!searchInput || productCards.length === 0) return;

  // Track active filter category
  let activeCategory = "all";

  /**
   * Filters product cards based on search text and active category.
   * Shows/hides cards and updates the result count.
   */
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    productCards.forEach(function (card) {
      const cardCategory = card.getAttribute("data-category");
      const cardName = card.getAttribute("data-name") || "";

      // Check category match
      const categoryMatch = activeCategory === "all" || cardCategory === activeCategory;

      // Check search text match against product name/keywords
      const searchMatch = searchTerm === "" || cardName.includes(searchTerm);

      // Show card only if both conditions are met
      if (categoryMatch && searchMatch) {
        card.style.display = "";
        card.removeAttribute("aria-hidden");
        visibleCount++;
      } else {
        card.style.display = "none";
        card.setAttribute("aria-hidden", "true");
      }
    });

    // Show/hide the "no results" message
    if (noResults) {
      noResults.hidden = visibleCount > 0;
    }

    // Update the result count text
    if (resultCount) {
      if (searchTerm || activeCategory !== "all") {
        resultCount.textContent = visibleCount + " product" + (visibleCount !== 1 ? "s" : "") + " found.";
      } else {
        resultCount.textContent = "";
      }
    }
  }

  // Listen for typing in the search box
  searchInput.addEventListener("input", filterProducts);

  // Listen for category filter button clicks
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Update active category
      activeCategory = button.getAttribute("data-filter");

      // Update button active states
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      // Apply the filter
      filterProducts();
    });
  });

  // Clear search button inside "no results" message
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      searchInput.value = "";
      activeCategory = "all";
      filterButtons.forEach(function (btn) { btn.classList.remove("active"); });
      if (filterButtons[0]) filterButtons[0].classList.add("active");
      filterProducts();
      searchInput.focus();
    });
  }

  // Run initial filter to set result count
  filterProducts();
})();


/* ============================================================
   4. GALLERY LIGHTBOX
   Opens product images in a fullscreen overlay on products.html
   ============================================================ */
(function initLightbox() {
  "use strict";

  const overlay = document.getElementById("lightboxOverlay");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  // Only run if lightbox elements exist
  if (!overlay || !lightboxImg) return;

  // Collect all gallery images
  const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
  let currentIndex = 0;

  /**
   * Opens the lightbox and displays the image at the given index.
   * @param {number} index - Index of the image in galleryImages array
   */
  function openLightbox(index) {
    currentIndex = index;
    const img = galleryImages[currentIndex];

    // Set the lightbox image src and alt
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    // Set caption from data attributes
    if (lightboxTitle) lightboxTitle.textContent = img.getAttribute("data-title") || "";
    if (lightboxDesc) lightboxDesc.textContent = img.getAttribute("data-desc") || "";

    // Show the overlay
    overlay.hidden = false;
    overlay.classList.add("active");

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Move focus to the close button for accessibility
    if (closeBtn) closeBtn.focus();
  }

  /**
   * Closes the lightbox overlay.
   */
  function closeLightbox() {
    overlay.hidden = true;
    overlay.classList.remove("active");
    document.body.style.overflow = "";

    // Return focus to the trigger button that opened the lightbox
    const triggerBtn = galleryImages[currentIndex]
      .closest(".product-img-wrapper")
      .querySelector(".lightbox-trigger");
    if (triggerBtn) triggerBtn.focus();
  }

  /**
   * Navigates to the previous or next image in the gallery.
   * @param {number} direction - -1 for previous, 1 for next
   */
  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    openLightbox(currentIndex);
  }

  // Attach click events to lightbox trigger buttons
  document.querySelectorAll(".lightbox-trigger").forEach(function (trigger, index) {
    trigger.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  // Also open lightbox when clicking directly on a gallery image
  galleryImages.forEach(function (img, index) {
    img.addEventListener("click", function () {
      openLightbox(index);
    });
    img.style.cursor = "pointer";
  });

  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      navigateLightbox(-1);
    });
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      navigateLightbox(1);
    });
  }

  // Close when clicking outside the image (on the overlay background)
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  // Keyboard navigation inside the lightbox
  document.addEventListener("keydown", function (event) {
    if (overlay.hidden) return; // Only handle keys when lightbox is open

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      navigateLightbox(-1);
    } else if (event.key === "ArrowRight") {
      navigateLightbox(1);
    }
  });
})();


/* ============================================================
   5. ENQUIRY FORM VALIDATION AND PRICE/AVAILABILITY RESPONSE
   Validates the enquiry form and shows a calculated response
   ============================================================ */
(function initEnquiryForm() {
  "use strict";

  const form = document.getElementById("enquiryForm");
  const responsePanel = document.getElementById("enquiryResponse");
  const responseMessage = document.getElementById("responseMessage");
  const responseDetails = document.getElementById("responseDetails");
  const newEnquiryBtn = document.getElementById("newEnquiryBtn");

  // Only run if enquiry form exists (i.e. on enquiry.html)
  if (!form) return;

  // Pricing lookup table (price per unit in Rands)
  const pricing = {
    "bread": 22,
    "vetkoek": 8,
    "koeksisters": 12,
    "rusks": 45,
    "doughnuts": 10,
    "scones": 15,
    "custom-cake": 250,
    "bulk-mixed": 18
  };

  // Product display names
  const productNames = {
    "bread": "Bread (White / Brown / Seeded)",
    "vetkoek": "Vetkoek",
    "koeksisters": "Koeksisters",
    "rusks": "Buttermilk Rusks",
    "doughnuts": "Doughnuts",
    "scones": "Scones",
    "custom-cake": "Custom Cake",
    "bulk-mixed": "Bulk Mixed Order"
  };

  /**
   * Shows an error message for a form field.
   * @param {string} fieldId - The input element's id
   * @param {string} message - The error message to display
   */
  function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);

    if (errorEl) {
      errorEl.textContent = message;
    }
    if (inputEl) {
      inputEl.classList.add("invalid");
      inputEl.setAttribute("aria-invalid", "true");
    }
  }

  /**
   * Clears error state for a form field.
   * @param {string} fieldId - The input element's id
   */
  function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);

    if (errorEl) {
      errorEl.textContent = "";
    }
    if (inputEl) {
      inputEl.classList.remove("invalid");
      inputEl.setAttribute("aria-invalid", "false");
    }
  }

  /**
   * Validates a South African phone number (10 digits, starts with 0).
   * @param {string} phone - Phone number string to validate
   * @returns {boolean}
   */
  function isValidSAPhone(phone) {
    return /^0[0-9]{9}$/.test(phone.replace(/\s/g, ""));
  }

  /**
   * Validates a date is at least 48 hours from now.
   * @param {string} dateValue - Date string from input
   * @returns {boolean}
   */
  function isDateAtLeast48Hours(dateValue) {
    if (!dateValue) return false;
    const selectedDate = new Date(dateValue);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2); // 48 hours from now
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    return selectedDate >= minDate;
  }

  /**
   * Validates all fields in the enquiry form.
   * @returns {boolean} - True if all fields are valid
   */
  function validateEnquiryForm() {
    let isValid = true;

    // Full name: required, min 2 chars
    const fullName = document.getElementById("fullName");
    clearError("fullName");
    if (!fullName.value.trim() || fullName.value.trim().length < 2) {
      showError("fullName", "Please enter your full name (at least 2 characters).");
      isValid = false;
    }

    // Email: required, valid format
    const email = document.getElementById("email");
    clearError("email");
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError("email", "Please enter a valid email address (e.g. name@example.com).");
      isValid = false;
    }

    // Phone: required, valid SA number
    const phone = document.getElementById("phone");
    clearError("phone");
    if (!phone.value.trim()) {
      showError("phone", "Please enter your phone number.");
      isValid = false;
    } else if (!isValidSAPhone(phone.value.trim())) {
      showError("phone", "Please enter a valid 10-digit South African number (e.g. 0821234567).");
      isValid = false;
    }

    // Product type: required
    const productType = document.getElementById("productType");
    clearError("productType");
    if (!productType.value) {
      showError("productType", "Please select a product type.");
      isValid = false;
    }

    // Quantity: required, positive integer
    const quantity = document.getElementById("quantity");
    clearError("quantity");
    const qty = parseInt(quantity.value, 10);
    if (!quantity.value || isNaN(qty) || qty < 1) {
      showError("quantity", "Please enter a valid quantity (minimum 1).");
      isValid = false;
    } else if (qty > 1000) {
      showError("quantity", "Maximum order quantity is 1000. For larger orders, please call us directly.");
      isValid = false;
    }

    // Order method: required (radio)
    const orderMethods = document.querySelectorAll('input[name="orderMethod"]');
    const selectedMethod = Array.from(orderMethods).find(function (r) { return r.checked; });
    const orderMethodError = document.getElementById("orderMethod-error");
    if (!selectedMethod) {
      if (orderMethodError) orderMethodError.textContent = "Please select collection or delivery.";
      isValid = false;
    } else {
      if (orderMethodError) orderMethodError.textContent = "";
    }

    // Date: required, at least 48 hours from now
    const orderDate = document.getElementById("orderDate");
    clearError("orderDate");
    if (!orderDate.value) {
      showError("orderDate", "Please select your preferred date.");
      isValid = false;
    } else if (!isDateAtLeast48Hours(orderDate.value)) {
      showError("orderDate", "Please select a date at least 48 hours from today. We need time to prepare your order.");
      isValid = false;
    }

    // Terms checkbox: must be checked
    const agreeTerms = document.getElementById("agreeTerms");
    clearError("agreeTerms");
    if (!agreeTerms.checked) {
      showError("agreeTerms", "Please confirm that you have read and accept the terms.");
      isValid = false;
    }

    return isValid;
  }

  /**
   * Calculates the estimated price and generates the response message.
   * Applies bulk discounts for large orders.
   */
  function generateResponse() {
    const productType = document.getElementById("productType").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const orderMethod = document.querySelector('input[name="orderMethod"]:checked').value;
    const orderDate = document.getElementById("orderDate").value;
    const fullName = document.getElementById("fullName").value.trim();

    // Get base price per unit
    const unitPrice = pricing[productType] || 0;
    const productLabel = productNames[productType] || productType;

    // Calculate subtotal
    let subtotal = unitPrice * quantity;

    // Apply bulk discount
    let discountRate = 0;
    let discountLabel = "";
    if (quantity >= 200) {
      discountRate = 0.20;
      discountLabel = "20% bulk discount (200+ units)";
    } else if (quantity >= 100) {
      discountRate = 0.15;
      discountLabel = "15% bulk discount (100–199 units)";
    } else if (quantity >= 50) {
      discountRate = 0.10;
      discountLabel = "10% bulk discount (50–99 units)";
    }

    const discount = subtotal * discountRate;
    let total = subtotal - discount;

    // Add delivery fee if applicable
    let deliveryFee = 0;
    let deliveryNote = "";
    if (orderMethod === "delivery") {
      if (total < 500) {
        deliveryFee = 80;
        deliveryNote = "Delivery fee (orders under R500)";
      } else {
        deliveryNote = "Free delivery (order over R500)";
      }
      total += deliveryFee;
    }

    // Format the date nicely
    const dateObj = new Date(orderDate);
    const formattedDate = dateObj.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Build the response message
    if (responseMessage) {
      responseMessage.textContent =
        "Thank you, " + fullName + "! We have received your enquiry for " +
        quantity + " x " + productLabel + " on " + formattedDate + ". " +
        "A Kasi Bakes team member will confirm availability and finalise your order within 24 hours.";
    }

    // Build the detailed breakdown
    if (responseDetails) {
      let detailsHTML = "<table class='response-table'>";
      detailsHTML += "<tr><td>Product</td><td>" + productLabel + "</td></tr>";
      detailsHTML += "<tr><td>Quantity</td><td>" + quantity + " units</td></tr>";
      detailsHTML += "<tr><td>Unit Price</td><td>R" + unitPrice.toFixed(2) + "</td></tr>";
      detailsHTML += "<tr><td>Subtotal</td><td>R" + subtotal.toFixed(2) + "</td></tr>";

      if (discountRate > 0) {
        detailsHTML += "<tr class='discount-row'><td>" + discountLabel + "</td><td>− R" + discount.toFixed(2) + "</td></tr>";
      }

      if (orderMethod === "delivery") {
        if (deliveryFee > 0) {
          detailsHTML += "<tr><td>" + deliveryNote + "</td><td>R" + deliveryFee.toFixed(2) + "</td></tr>";
        } else {
          detailsHTML += "<tr class='discount-row'><td>" + deliveryNote + "</td><td>R0.00</td></tr>";
        }
      }

      detailsHTML += "<tr class='total-row'><td><strong>Estimated Total</strong></td><td><strong>R" + total.toFixed(2) + "</strong></td></tr>";
      detailsHTML += "</table>";
      detailsHTML += "<p class='response-note'>* Final pricing may vary. Payment is required before preparation begins.</p>";

      responseDetails.innerHTML = detailsHTML;
    }
  }

  // Form submit event
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default browser submission

    if (validateEnquiryForm()) {
      // Form is valid — generate response and show it
      generateResponse();
      form.hidden = true;
      if (responsePanel) responsePanel.hidden = false;

      // Scroll to response panel
      if (responsePanel) {
        responsePanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Form has errors — scroll to first error
      const firstError = form.querySelector(".invalid");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
    }
  });

  // "Submit Another Enquiry" button resets the form
  if (newEnquiryBtn) {
    newEnquiryBtn.addEventListener("click", function () {
      form.reset();
      form.hidden = false;
      if (responsePanel) responsePanel.hidden = true;

      // Clear all error states
      form.querySelectorAll(".invalid").forEach(function (el) {
        el.classList.remove("invalid");
        el.setAttribute("aria-invalid", "false");
      });
      form.querySelectorAll(".error-msg").forEach(function (el) {
        el.textContent = "";
      });

      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Real-time validation: clear error when user starts correcting a field
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.classList.contains("invalid")) {
        field.classList.remove("invalid");
        field.setAttribute("aria-invalid", "false");
        const errorEl = document.getElementById(field.id + "-error");
        if (errorEl) errorEl.textContent = "";
      }
    });
  });
})();


/* ============================================================
   6. CONTACT FORM VALIDATION AND MAILTO EMAIL
   Validates the contact form, then compiles a mailto: email link
   ============================================================ */
(function initContactForm() {
  "use strict";

  const form = document.getElementById("contactForm");
  const responsePanel = document.getElementById("contactResponse");
  const newMessageBtn = document.getElementById("newMessageBtn");
  const charCount = document.getElementById("charCount");
  const messageTextarea = document.getElementById("contactMessage");

  // Only run if contact form exists (i.e. on contact.html)
  if (!form) return;

  /**
   * Shows an error message for a contact form field.
   */
  function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) {
      inputEl.classList.add("invalid");
      inputEl.setAttribute("aria-invalid", "true");
    }
  }

  /**
   * Clears error for a contact form field.
   */
  function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = "";
    if (inputEl) {
      inputEl.classList.remove("invalid");
      inputEl.setAttribute("aria-invalid", "false");
    }
  }

  /**
   * Validates a South African phone number format.
   * @param {string} phone
   * @returns {boolean}
   */
  function isValidSAPhone(phone) {
    return /^0[0-9]{9}$/.test(phone.replace(/\s/g, ""));
  }

  /**
   * Validates all contact form fields.
   * @returns {boolean}
   */
  function validateContactForm() {
    let isValid = true;

    // Full name
    const name = document.getElementById("contactName");
    clearError("contactName");
    if (!name.value.trim() || name.value.trim().length < 2) {
      showError("contactName", "Please enter your full name (at least 2 characters).");
      isValid = false;
    }

    // Email
    const email = document.getElementById("contactEmail");
    clearError("contactEmail");
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError("contactEmail", "Please enter a valid email address.");
      isValid = false;
    }

    // Phone (optional, but if provided must be valid)
    const phone = document.getElementById("contactPhone");
    clearError("contactPhone");
    if (phone.value.trim() && !isValidSAPhone(phone.value.trim())) {
      showError("contactPhone", "Please enter a valid 10-digit South African phone number.");
      isValid = false;
    }

    // Message type
    const messageType = document.getElementById("messageType");
    clearError("messageType");
    if (!messageType.value) {
      showError("messageType", "Please select a message type.");
      isValid = false;
    }

    // Subject
    const subject = document.getElementById("contactSubject");
    clearError("contactSubject");
    if (!subject.value.trim() || subject.value.trim().length < 5) {
      showError("contactSubject", "Please enter a subject (at least 5 characters).");
      isValid = false;
    }

    // Message body
    const message = document.getElementById("contactMessage");
    clearError("contactMessage");
    if (!message.value.trim() || message.value.trim().length < 20) {
      showError("contactMessage", "Please enter a message of at least 20 characters.");
      isValid = false;
    }

    return isValid;
  }

  /**
   * Compiles form data into a mailto: link and opens the user's email client.
   */
  function sendEmail() {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const messageType = document.getElementById("messageType").value;
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const branch = document.getElementById("preferredBranch").value;

    // Build recipient based on preferred branch
    const recipient = (branch === "pimville")
      ? "pimville@kasibakes.co.za"
      : "info@kasibakes.co.za";

    // Build subject line
    const emailSubject = "[Kasi Bakes Website] " + messageType.charAt(0).toUpperCase() + messageType.slice(1) + ": " + subject;

    // Build the email body
    let emailBody = "Dear Kasi Bakes Team,\n\n";
    emailBody += "You have received a new message via the Kasi Bakes website contact form.\n\n";
    emailBody += "--- SENDER DETAILS ---\n";
    emailBody += "Name: " + name + "\n";
    emailBody += "Email: " + email + "\n";
    if (phone) emailBody += "Phone: " + phone + "\n";
    if (branch) emailBody += "Preferred Branch: " + (branch === "pimville" ? "Pimville" : "Mofolo (Main)") + "\n";
    emailBody += "\n--- MESSAGE ---\n";
    emailBody += "Type: " + messageType + "\n";
    emailBody += "Subject: " + subject + "\n\n";
    emailBody += message + "\n\n";
    emailBody += "---\nThis message was submitted via the Kasi Bakes website contact form.";

    // Encode for mailto: URL
    const mailtoLink = "mailto:" + encodeURIComponent(recipient) +
      "?subject=" + encodeURIComponent(emailSubject) +
      "&body=" + encodeURIComponent(emailBody);

    // Open email client
    window.location.href = mailtoLink;
  }

  // Form submit event
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateContactForm()) {
      sendEmail();

      // Show success response panel
      form.hidden = true;
      if (responsePanel) {
        responsePanel.hidden = false;
        responsePanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Scroll to first invalid field
      const firstError = form.querySelector(".invalid");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
    }
  });

  // "Send Another Message" button resets the form
  if (newMessageBtn) {
    newMessageBtn.addEventListener("click", function () {
      form.reset();
      form.hidden = false;
      if (responsePanel) responsePanel.hidden = true;
      if (charCount) charCount.textContent = "0 / 1000";

      form.querySelectorAll(".invalid").forEach(function (el) {
        el.classList.remove("invalid");
        el.setAttribute("aria-invalid", "false");
      });
      form.querySelectorAll(".error-msg").forEach(function (el) {
        el.textContent = "";
      });

      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Character counter for message textarea
  if (messageTextarea && charCount) {
    messageTextarea.addEventListener("input", function () {
      const count = messageTextarea.value.length;
      charCount.textContent = count + " / 1000";

      // Warn user when approaching limit
      if (count >= 900) {
        charCount.style.color = "#cc0000";
      } else {
        charCount.style.color = "";
      }
    });
  }

  // Real-time validation: clear errors when user edits a field
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.classList.contains("invalid")) {
        field.classList.remove("invalid");
        field.setAttribute("aria-invalid", "false");
        const errorEl = document.getElementById(field.id + "-error");
        if (errorEl) errorEl.textContent = "";
      }
    });
  });
})();


/* ============================================================
   7. INTERACTIVE MAPS (Leaflet.js)
   Initialises two maps on contact.html with location tabs
   ============================================================ */
(function initMaps() {
  "use strict";

  // Only run if Leaflet is loaded and map containers exist
  if (typeof L === "undefined") return;

  const mofoloContainer = document.getElementById("mofoloMap");
  const pimvilleContainer = document.getElementById("pimvilleMap");

  if (!mofoloContainer && !pimvilleContainer) return;

  // Kasi Bakes coordinates
  // Mofolo, Soweto (approximate)
  const mofoloCoords = [-26.2485, 27.8672];
  // Pimville, Soweto (approximate)
  const pimvilleCoords = [-26.2644, 27.8534];

  // Tile layer URL (OpenStreetMap — free and open source)
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  // Custom bakery marker icon
  const bakeryIcon = L.divIcon({
    className: "custom-map-marker",
    html: '<div class="marker-pin">🥐</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  // Initialise Mofolo map
  if (mofoloContainer) {
    const mofoloMap = L.map("mofoloMap", {
      center: mofoloCoords,
      zoom: 15,
      scrollWheelZoom: false // Prevent accidental scroll zoom
    });

    L.tileLayer(tileUrl, { attribution: attribution }).addTo(mofoloMap);

    // Add marker and popup for Mofolo branch
    L.marker(mofoloCoords, { icon: bakeryIcon })
      .addTo(mofoloMap)
      .bindPopup(
        "<strong>Kasi Bakes — Mofolo (Main)</strong><br>" +
        "12 Moshoeshoe Street<br>" +
        "Mofolo, Soweto, 1804<br>" +
        "Tel: <a href='tel:0111234567'>011 123 4567</a>"
      )
      .openPopup();
  }

  // Initialise Pimville map
  if (pimvilleContainer) {
    const pimvilleMap = L.map("pimvilleMap", {
      center: pimvilleCoords,
      zoom: 15,
      scrollWheelZoom: false
    });

    L.tileLayer(tileUrl, { attribution: attribution }).addTo(pimvilleMap);

    // Add marker and popup for Pimville branch
    L.marker(pimvilleCoords, { icon: bakeryIcon })
      .addTo(pimvilleMap)
      .bindPopup(
        "<strong>Kasi Bakes — Pimville Branch</strong><br>" +
        "45 Nkosi Street<br>" +
        "Pimville, Soweto, 1808<br>" +
        "Tel: <a href='tel:0117784321'>011 778 4321</a>"
      )
      .openPopup();
  }

  // Map TAB switching
  const mapTabs = document.querySelectorAll(".map-tab");
  const mapPanels = document.querySelectorAll(".map-panel");

  mapTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetId = tab.getAttribute("aria-controls");

      // Update tab active states
      mapTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Show the correct panel
      mapPanels.forEach(function (panel) {
        if (panel.id === targetId) {
          panel.hidden = false;
        } else {
          panel.hidden = true;
        }
      });

      // Invalidate the map size so Leaflet renders correctly
      // when switching from a hidden panel to a visible one
      if (targetId === "map-mofolo" && mofoloContainer && mofoloContainer._leaflet_id) {
        setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      }
      if (targetId === "map-pimville" && pimvilleContainer && pimvilleContainer._leaflet_id) {
        setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      }
    });
  });
})();

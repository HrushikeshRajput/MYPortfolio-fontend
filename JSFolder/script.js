//Header Scroll
let nav = document.querySelector(".navbar");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("header-scrolled");
  } else {
    nav.classList.remove("header-scrolled");
  }
};

//nav hide
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a) {
  a.addEventListener("click", function () {
    navCollapse.classList.remove("show");
  });
});

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Reset validation styles
  form.classList.remove("was-validated");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  let isValid = true;

  // Name validation
  if (!name.value.trim()) {
    name.classList.add("is-invalid");
    isValid = false;
  } else {
    name.classList.remove("is-invalid");
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone.value.trim())) {
    phone.classList.add("is-invalid");
    isValid = false;
  } else {
    phone.classList.remove("is-invalid");
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add("is-invalid");
    isValid = false;
  } else {
    email.classList.remove("is-invalid");
  }

  // Message validation
  if (!message.value.trim()) {
    message.classList.add("is-invalid");
    isValid = false;
  } else {
    message.classList.remove("is-invalid");
  }

  if (!isValid) {
    return;
  }

  // Submit data to server
  // const response = await fetch("http://localhost:5000/contact", {
  const response = await fetch("https://your-backend.onrender.com/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      message: message.value.trim(),
    }),
  });

  if (response.ok) {
    form.reset();
    successMsg.style.display = "block";
    successMsg.classList.remove("text-danger");
    successMsg.classList.add("text-success");
    successMsg.textContent = "✅ Your message has been sent successfully!";

    // Hide message after 5 seconds
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 5000);
  } else {
    successMsg.style.display = "block";
    successMsg.classList.remove("text-success");
    successMsg.classList.add("text-danger");
    successMsg.textContent = "❌ Something went wrong. Please try again.";

    // Hide message after 5 seconds
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 5000);
  }
});

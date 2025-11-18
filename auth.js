function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("forgotForm").classList.add("hidden");
}

function showSignup() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("forgotForm").classList.add("hidden");
}

function showForgot() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("forgotForm").classList.remove("hidden");
}

// ============ API CALLS (fetch to backend) ============
async function loginUser() {
  const employeeId = document.getElementById("employeeId").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id: employeeId, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Login Successful!");
    window.location.href = "/dashboard.html"; // redirect
  } else {
    alert(data.message || "Login failed");
  }
}

async function signupUser() {
  const employeeId = document.getElementById("signupEmployeeId").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id: employeeId, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Signup successful! Please login.");
    showLogin();
  } else {
    alert(data.message || "Signup failed");
  }
}

async function resetPassword() {
  const employeeId = document.getElementById("forgotEmployeeId").value;

  const res = await fetch("http://localhost:5000/api/auth/forgot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id: employeeId })
  });

  const data = await res.json();
  alert(data.message || "Password reset instructions sent!");
}

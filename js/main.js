// Example: handle login form
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login functionality will be added later with backend.');
      window.location.href = 'dashboard.html';
    });
  }

  const absenceForm = document.getElementById('absenceForm');
  if (absenceForm) {
    absenceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Absence submitted (dummy frontend only).');
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const timetableBody = document.getElementById("timetableBody");

  if (timetableBody) {
    fetch("../backend/fetch_timetable.php")
      .then(response => response.json())
      .then(data => {
        timetableBody.innerHTML = ""; // Clear previous rows
        data.forEach(row => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${row.day}</td>
            <td>${row.time_slot}</td>
            <td>${row.subject}</td>
            <td>${row.teacher}</td>
          `;
          timetableBody.appendChild(tr);
        });
      })
      .catch(error => {
        timetableBody.innerHTML = "<tr><td colspan='4'>Failed to load timetable.</td></tr>";
        console.error("Error fetching timetable:", error);
      });
  }
});

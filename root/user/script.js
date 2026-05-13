// ========================
// TAB SYSTEM (FIXED)
// ========================
const tabs = document.querySelectorAll(".tab-btn");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panes.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    panes[index].classList.add("active");
  });
});

// Default active tab
document.querySelectorAll(".tab-btn")[0]?.classList.add("active");
document.querySelectorAll(".tab-pane")[0]?.classList.add("active");


// ========================
// MODAL SYSTEM (FIXED)
// ========================
const modal = document.getElementById("member-modal");
const modalTitle = document.getElementById("member-modal-title");
const modalBody = document.getElementById("member-modal-body");
const modalAction = document.getElementById("member-modal-action");
const closeBtn = document.querySelector(".member-modal-close");

document.querySelectorAll(".open-member-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.add("show");

    modalTitle.textContent = btn.dataset.modalTitle || "Membership";
    modalBody.textContent = btn.dataset.modalBody || "";
    modalAction.textContent = btn.dataset.modalAction || "Continue";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Click outside card closes modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
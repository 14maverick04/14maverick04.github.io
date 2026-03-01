(function () {
  function initializeWebring() {
    const prevEl = document.getElementById("umaring_prev");
    const memberEl = document.getElementById("umaring_member");
    const nextEl = document.getElementById("umaring_next");

    if (!prevEl || !memberEl || !nextEl) {
      console.error("UMass Amherst webring links not found.");
      return;
    }

    fetch("https://umaring.github.io/jerin.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch UMass Ring data");
        }
        return response.json();
      })
      .then((ring) => {
        if (!ring || !ring.prev || !ring.member || !ring.next) {
          throw new Error("Invalid UMass Ring response format");
        }

        prevEl.href = ring.prev.url;
        prevEl.textContent = ring.prev.name;

        memberEl.href = "https://github.com/umaring/umaring";
        memberEl.textContent = "UMass Ring";

        nextEl.href = ring.next.url;
        nextEl.textContent = ring.next.name;
      })
      .catch((error) => {
        console.error("Error initializing UMass Amherst webring:", error);
        prevEl.textContent = "Previous";
        nextEl.textContent = "Next";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeWebring);
  } else {
    initializeWebring();
  }
})();

export function showMessage(container, message, type = "info") {
    container.textContent = message;
    container.className = type; // simple styling hook
    setTimeout(() => {
      container.textContent = "";
      container.className = "";
    }, 4000);
  }
  
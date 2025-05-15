function increase() {
  const sidebar = document.getElementById("sidebar");
  let currentSize = parseFloat(window.getComputedStyle(sidebar).fontSize); // es. "16px" → 16
  sidebar.style.fontSize = (currentSize + 2) + "px"; // aumenta di 2px
}

function decrease() {
  const sidebar = document.getElementById("sidebar");
  let currentSize = parseFloat(window.getComputedStyle(sidebar).fontSize);
  sidebar.style.fontSize = (currentSize - 2) + "px"; // diminuisce di 2px
}

/*document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // blocca eventuali comportamenti predefiniti

      replaceCustom(this.value);
      this.value = ""; // opzionale: pulisce il campo dopo Enter
    }
  });

  function replaceCustom(text) {
    const sidebar = document.getElementById("sidebar");
    let i = 0;
    sidebar.innerHTML = "";

    const typing = setInterval(() => {
      sidebar.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(typing);
    }, 30);
  }
});*/




import { data } from "./data.js";

const resetBtn = document.getElementById("resetBtn");

// Function to shuffle an array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the data array
shuffleArray(data);

// Generate the HTML for each item in the data array
function generateDisplayData(data) {
  return data
    .map((item, index) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      return `
      <div class="game_table" data-index="${index}">
        <span class="numbers">${value}</span>
      </div>
    `;
    })
    .join("");
}

// You can call this function with your 'data' array to generate the display data
const displayData = generateDisplayData(data);

// Insert the HTML into the DOM
document.getElementById("root").innerHTML = displayData;

// Variable to store the last clicked span element
let lastClickedSpan = null;

// Function to handle hiding unmatched spans
function hideUnmatched(span1, span2) {
  setTimeout(() => {
    span1.classList.add("numbers");
    span2.classList.add("numbers");
  }, 300);
}

// Event listener for clicks on game_table elements
function addClickListenerToGameTables() {
  document.querySelectorAll(".game_table").forEach((element) => {
    element.addEventListener("click", () => {
      const span = element.querySelector(".numbers");
      if (!span || element.classList.contains("match")) return;

      span.classList.remove("numbers");
      const currentValue = span.textContent.trim();

      if (lastClickedSpan !== null) {
        const lastClickedIndex =
          lastClickedSpan.parentElement.getAttribute("data-index");
        const currentIndex = element.getAttribute("data-index");
        if (
          currentValue === lastClickedSpan.textContent.trim() &&
          lastClickedIndex !== currentIndex
        ) {
          element.classList.add("match");
          lastClickedSpan.parentElement.classList.add("match");
        } else {
          hideUnmatched(span, lastClickedSpan);
        }
        lastClickedSpan = null;
      } else {
        lastClickedSpan = span;
      }
    });
  });
}

// You can call this function to add click event listeners to your game tables
addClickListenerToGameTables();

// Event listener for reset button
resetBtn.addEventListener("click", () => {
  shuffleArray(data);
  // Re-generate and insert HTML
  const newDisplayData = generateDisplayData(data);
  document.getElementById("root").innerHTML = newDisplayData;

  addClickListenerToGameTables();
});

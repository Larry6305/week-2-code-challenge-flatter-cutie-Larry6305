// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Elements from the DOM
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("vote-input");
  
    // Base URL for API
    const baseUrl = "http://localhost:3000";

    // Fetch character data and display character names
  fetch(`${baseUrl}/characters`)
  .then((response) => response.json())
  .then((characters) => {
    characters.forEach((character) => {
   // Create a span element for each character's name
   const span = document.createElement("span");
   span.textContent = character.name;
   span.classList.add("character-name");

    // Add an event listener to show detailed information when clicked
    span.addEventListener("click", () => showCharacterDetails(character));

     // Append to the character-bar
     characterBar.appendChild(span);
    });
  })
  .catch((error) => console.error("Error fetching characters:", error));

   // Function to show character details in the detailed-info div
   function showCharacterDetails(character) {
    // Clear the previous detailed info
    detailedInfo.innerHTML = "";

      // Create the details display
      const name = document.createElement("h2");
      name.textContent = character.name;
      const image = document.createElement("img");
      image.src = character.image;
      image.alt = character.name;
      image.width = 200;
      const votes = document.createElement("p");
      votes.textContent = `Votes: ${character.votes}`;

        // Append character details to detailed-info
    detailedInfo.appendChild(name);
    detailedInfo.appendChild(image);
    detailedInfo.appendChild(votes);
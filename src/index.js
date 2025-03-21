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

      // Store the character data in the form to use later
      votesForm.dataset.characterId = character.id;
      votesForm.dataset.characterVotes = character.votes;
    }

    // Handle form submission to update the votes
  votesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the current character ID and current votes
    const characterId = votesForm.dataset.characterId;
    let currentVotes = parseInt(votesForm.dataset.characterVotes, 10);
    const addedVotes = parseInt(voteInput.value, 10);

     // Ensure the votes input is a valid number
     if (isNaN(addedVotes) || addedVotes < 0) {
        alert("Please enter a valid number of votes.");
        return;
      }

       // Update the total votes
    currentVotes += addedVotes;

     // Update the votes display in detailed-info
     const votesDisplay = detailedInfo.querySelector("p");
     votesDisplay.textContent = `Votes: ${currentVotes}`;
 

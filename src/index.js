document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("vote-input");
    const resetVotesButton = document.getElementById("reset-votes");
    const characterForm = document.getElementById("character-form");
    const characterNameInput = document.getElementById("character-name");
    const characterImageInput = document.getElementById("character-image");
  
    const baseUrl = "http://localhost:3000";
  
    // Fetch initial character data
    fetch(`${baseUrl}/characters`)
      .then((response) => response.json())
      .then((characters) => {
        characters.forEach((character) => {
          createCharacterSpan(character);
        });
      })
      .catch((error) => console.error("Error fetching characters:", error));
  
    // Function to create a span for a character
    function createCharacterSpan(character) {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.classList.add("character-name");
  
      // Add click event to show character details
      span.addEventListener("click", () => showCharacterDetails(character));
  
      // Append to the character bar
      characterBar.appendChild(span);
    }
  
    // Function to show character details
    function showCharacterDetails(character) {
      detailedInfo.innerHTML = "";
  
      const name = document.createElement("h2");
      name.textContent = character.name;
      const image = document.createElement("img");
      image.src = character.image;
      image.alt = character.name;
      image.width = 200;
      const votes = document.createElement("p");
      votes.textContent = `Votes: ${character.votes}`;
  
      detailedInfo.appendChild(name);
      detailedInfo.appendChild(image);
      detailedInfo.appendChild(votes);
  
      // Store the current character ID and votes for later use
      votesForm.dataset.characterId = character.id;
      votesForm.dataset.characterVotes = character.votes;
    }
  
    // Handle the vote form submission to update votes
    votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const characterId = votesForm.dataset.characterId;
      let currentVotes = parseInt(votesForm.dataset.characterVotes, 10);
      const addedVotes = parseInt(voteInput.value, 10);
  
      if (isNaN(addedVotes) || addedVotes < 0) {
        alert("Please enter a valid number of votes.");
        return;
      }
  
      currentVotes += addedVotes;
  
      const votesDisplay = detailedInfo.querySelector("p");
      votesDisplay.textContent = `Votes: ${currentVotes}`;
  
      votesForm.dataset.characterVotes = currentVotes;
  
      voteInput.value = ""; // Clear the input after submission
    });
  
    // Reset votes to 0 when the Reset Votes button is clicked
    resetVotesButton.addEventListener("click", () => {
      const characterId = votesForm.dataset.characterId;
      const votesDisplay = detailedInfo.querySelector("p");
  
      // Reset votes in the UI
      votesDisplay.textContent = "Votes: 0";
  
      // Reset the votes in the form's dataset
      votesForm.dataset.characterVotes = 0;
    });
  
    // Add a new character when the form is submitted
    characterForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = characterNameInput.value;
      const image = characterImageInput.value;
  
      if (!name || !image) {
        alert("Please provide a name and image URL for the new character.");
        return;
      }
  
      const newCharacter = {
        name,
        image,
        votes: 0,
      };
  
      // Create the new character's span element and add it to the character bar
      createCharacterSpan(newCharacter);
  
      // Show the new character's details immediately
      showCharacterDetails(newCharacter);
  
      // Reset the form inputs
      characterForm.reset();
    });
  });
  
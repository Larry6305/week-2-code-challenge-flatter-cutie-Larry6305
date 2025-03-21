// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Elements from the DOM
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("vote-input");
  
    // Base URL for API
    const baseUrl = "http://localhost:3000";
  
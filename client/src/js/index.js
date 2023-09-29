import { Workbox } from 'workbox-window'; // Import Workbox library for service workers
import Editor from './editor'; // Import your Editor module
import './database'; // Import a database module (assuming it's for initialization)
import '../css/style.css'; // Import your CSS styles

const main = document.querySelector('#main'); // Get a reference to the main HTML element
main.innerHTML = ''; // Clear the contents of the main element

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner'); // Add CSS class for styling
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner); // Append the spinner to the main element
};

const editor = new Editor(); // Create an instance of your Editor class

// Check if the 'editor' object is undefined
if (typeof editor === 'undefined') {
  loadSpinner(); // If 'editor' is undefined, display a loading spinner
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Create an instance of Workbox service worker with the path to your service worker file
  const workboxSW = new Workbox('/src-sw.js');
  
  // Register the service worker
  workboxSW.register();
} else {
  // If service workers are not supported, log an error message
  console.error('Service workers are not supported in this browser.');
}

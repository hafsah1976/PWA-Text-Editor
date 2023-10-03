const butInstall = document.getElementById('buttonInstall');

// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt from appearing
  event.preventDefault();

  // Store the event for later use
  window.deferredPrompt = event;

  // Show the installation button
  butInstall.classList.remove('hidden');

  // Event handler for the click event on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      return;
    }

    try {
      // Show the browser's installation prompt
      await promptEvent.prompt();

      // Wait for the user to respond to the prompt
      const userChoice = await promptEvent.userChoice;

      // Check if the user accepted or denied the installation
      if (userChoice.outcome === 'accepted') {
        console.log('J.A.T.E installation accepted.');
      } else {
        console.log('J.A.T.E installation rejected.');
      }
    } catch (error) {
      console.error('Error prompting installation:', error);
      // You can provide user feedback here if needed
    } finally {
      // Reset the deferredPrompt to null after prompting
      window.deferredPrompt = null;
    }
  });
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // The PWA has been successfully installed
  console.log('You have successfully installed J.A.T.E. Enjoy using the Text Editor!', event);

  // Clear the prompt
  window.deferredPrompt = null;
});

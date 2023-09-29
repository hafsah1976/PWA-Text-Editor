const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt from appearing
  event.preventDefault();

  // Store the event for later use
  const deferredPrompt = event;

  // Update your UI to show a custom install button or message

  // as in the class activities, I could make `butInstall` visible 
    // Remove the hidden class from the button.
//    butInstall.classList.toggle('hidden', false);
  //});

  //or show a custom install message like 

  // Implement a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    // Show the browser's installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const userChoice = await deferredPrompt.userChoice;

    // Check if the user accepted or denied the installation
    if (userChoice.outcome === 'accepted') {
      console.log('J.A.T.E installation accepted.');
    } else {
      console.log('J.A.T.E installation rejected.');
    }

    // Reset the deferredPrompt to null after prompting
    deferredPrompt = null;
  });
});

// a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // The PWA has been successfully installed
  console.log('You have successfully installed J.A.T.E. Enjoy using the Text Editor!', event);
  window.deferredPrompt= null;//clear prompt
});

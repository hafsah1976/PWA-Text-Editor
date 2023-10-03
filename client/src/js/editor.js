// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';

// Import 'header'module
import { header } from './header';

// Define a class for the editor
export default class {
  constructor() {
    // Get the locally stored data in 'content' from localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Create a CodeMirror editor instance
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set its value based on data retrieved from indexedDB, localStorage, or 'header'
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      // Set the editor's value to data from indexedDB (or localStorage if not available), or 'header' as a fallback
      this.editor.setValue(data || localData || header);
    });

    // Listen for changes in the editor's content and store it in localStorage
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor to indexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}

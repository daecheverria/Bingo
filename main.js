for (const div of document.getElementsByTagName('div')) {
    div.addEventListener('click', (event) => {
      div.classList.toggle('a');
    });
  }
  
  
'use strict';

function displayResults(responseJSON) {
  console.log(responseJSON);
  $('.repo-results').empty();

  for (let i = 0; i < responseJSON.length; i++) {
    $('.repo-results').append(`
    <li>
      <a href="${responseJSON[i].html_url}">${responseJSON[i].name}</a>
    </li>
    <br>
      `)
  }
  $('.results').removeClass('hidden');
}

function getRepos(handle) {
  const url = `https://api.github.com/users/${handle}/repos`

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
      })
    .then(responseJSON => displayResults(responseJSON))
    .catch(err => {
      $('.errorResponse').text(`Something went wrong: ${err.message}`)
    })
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('input').val();
    getRepos(userHandle);
  });
}

$(watchForm);
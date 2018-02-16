$('#lookup-btn').on('click', function(event) {
  event.preventDefault();

  $(".definition-container").hide();

  let word = $('#word-input').val().trim();

  const wordObj = {
    word: word
  }

  $.ajax({
    url: "/api/lookup",
    method: "POST",
    data: wordObj
  }).done((response) => {
    console.log("response", response);

    $("#word").text(word);
    $("#pronounciation").text(response.results[0].lexicalEntries[0].pronunciations[0].audioFile);

    $(".definition-container").show();
  });
});

/*
function lookupWord(word) {
  let apiURL = 'https://api.collinsdictionary.com/api/v1/dictionaries';

  $.ajax({
    url: apiURL,
    method: 'GET'
  }).done(function(response){
    console.log(response);
  });
}
*/
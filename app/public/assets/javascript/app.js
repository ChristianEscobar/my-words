$('#lookup-btn').on('click', function(event) {
  event.preventDefault();

  clearPreviousResults();
  $(".definition-display").hide();

  let word = $('#word-input').val().trim();

  const wordObj = {
    word: word
  }

  $.ajax({
    url: "/api/lookup",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(wordObj)
  }).done((response) => {
    $("#word").text(word);
    
    const lexicalEntries = response.results[0].lexicalEntries;

    for(let i=0; i < lexicalEntries.length; i++) {
      const entries = lexicalEntries[i].entries;

      for(let j=0; j < entries.length; j++) {
        const senses = entries[j].senses;

        const ol_senses = $("<ol></ol>");
        for(let k=0; k < senses.length; k++) {
          senses[k].definitions.map((entry) => {
            const li = $("<li></li>");
            li.text(entry);

            ol_senses.append(li);
          });

          // sub-senses
          const subsenses = (senses[k].subsenses === undefined ? [] : senses[k].subsenses);

          const ol_subsenses = $("<ol></ol>");

          for(let l=0; l < subsenses.length; l++) {
            subsenses[l].definitions.map((entry) => {
              const li = $("<li></li>");
              li.text(entry);

              ol_subsenses.append(li);
            });
          }

          ol_senses.append(ol_subsenses);
        }

        $(".definition-display").append(ol_senses);
      }
    }

    $(".definition-display").show();

  }).fail((error) => {
    console.error(error);
  });

  function clearPreviousResults() {
    $("#word").empty();
    $(".definition").empty();
  }
});
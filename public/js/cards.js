  var vocab_words;
  var correct_answer = 0;
  var index = 0;
  var user_is_answering = true; 

  var route = "data?level=" + selected_level;
  var callback = function(returned_json) {
    vocab_words = returned_json["cards"];
    update_ui();
  };

  $.getJSON(route, callback);
  

  //define method that is called when user hits submit button (you will want to use vocab_words and index vars

  function submit_answer(){
    var pinyin = vocab_words[index]["Pinyin"];
    var pinyin_no_tones = vocab_words[index]["PinyinNoTones"];
    var pinyin_num = vocab_words[index]["PinyinNum"];
    var definition = vocab_words[index]["Definition"];
    // var correct_answer = 0;

    if ($(".cc-text-field").val() == pinyin_no_tones || $(".cc-text-field").val() == pinyin_num) {
    correct_answer++;
    $(".cc-input-result").css('opacity', '1.0');
    $(".cc-vocab-answer").css('opacity', '1.0');
    $(".cc-input-result").text("That's correct!").append("&nbsp;").css('color', 'green');
    $(".cc-vocab-answer").text(pinyin +  ': ' + '"' + definition + '"');
    $(".cc-text-field").prop( "disabled", true);
    $(".cc-submit-button").prop( "disabled", true);
  }
  else {
    $(".cc-input-result").css('opacity', '1.0');
    $(".cc-vocab-answer").css('opacity', '1.0');
    $(".cc-input-result").text("Sorry, that's not correct.").append("&nbsp;").css('color', 'red');
    $(".cc-vocab-answer").text(pinyin +  ': ' + '"' + definition + '"');
    $(".cc-text-field").prop( "disabled", true);
    $(".cc-submit-button").prop( "disabled", true);
  }
  user_is_answering = false;
}
    // if ($(".cc-text-field").val() == pinyin_no_tones || $(".cc-text-field").val() == pinyin_num) {
    //   console.log("correct!")
    // }
    // else {
    //   console.log("incorrect")
    // }
    // index++;
    // update_ui();
  // };

  function next_word(){
    index++;
    update_ui();
    $(".cc-text-field").focus();
    user_is_answering = true;
  }

  function update_ui(){
    vocab_list_length = vocab_words.length;
  if (vocab_words == null) {
    return
  }
  if (index < vocab_list_length) {
  var word = vocab_words[index]["Hanzi"];
  $(".cc-vocab-word").text(word);
  $(".cc-text-field").val("");
  $(".cc-input-result").css('opacity', '0.0');
  $(".cc-vocab-answer").css('opacity', '0.0');
  $(".cc-text-field").prop( "disabled", false);
  $(".cc-submit-button").prop( "disabled", false);
  $(".cc-card-progress").text("Vocab Word #"+ (index + 1).toString() + "/" + vocab_list_length.toString());
  }
  
  else if (index == vocab_list_length){
    $(".cc-input-result").css('opacity', '0.0');
    $(".cc-vocab-answer").css('opacity', '1.0');
    $(".cc-vocab-word").text("You're done!");
    $(".cc-next-button").prop( "disabled", true);
    $(".cc-vocab-answer").text("You got " + correct_answer + "/" + vocab_list_length + " correct! That's " + ((correct_answer/vocab_list_length)*100) + "%!");
  }
  };

$(document).ready(function() {
    $(".cc-text-field").focus();
});

document.body.onkeyup = function(e){
    if(e.keyCode == 13){
        if (user_is_answering) { 
            submit_answer()
        } 
        else {
            next_word()
        }
    }
}

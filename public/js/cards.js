  var vocab_words;
  var answered_vocab_words = [];
  var correct_answer = 0;
  var total_number_of_words = 0;
  var user_is_answering = true; 

  var route = "data?level=" + selected_level;
  var callback = function(returned_json) {
    vocab_words = returned_json["cards"];
    total_number_of_words = vocab_words.length;
    update_ui();
  };

  $.getJSON(route, callback);
  
//shuffle function from: https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



  //define method that is called when user hits submit button (you will want to use vocab_words and index vars

  function submit_answer(){
    var pinyin = vocab_words[0]["Pinyin"];
    var pinyin_no_tones = vocab_words[0]["PinyinNoTones"];
    var pinyin_num = vocab_words[0]["PinyinNum"];
    var definition = vocab_words[0]["Definition"];
    // var correct_answer = 0;

    if ($(".cc-text-field").val() == pinyin_no_tones || $(".cc-text-field").val() == pinyin_num) {
    correct_answer++;
    $(".cc-input-result").css('opacity', '1.0');
    $(".cc-vocab-answer").css('opacity', '1.0');
    $(".cc-input-result").text("That's correct!").append("&nbsp;").css('color', 'green');
    $(".cc-vocab-answer").text(pinyin +  ': ' + '"' + definition.trimRight() + '"');
    $(".cc-text-field").prop( "disabled", true);
    $(".cc-submit-button").prop( "disabled", true);
  }
  else {
    $(".cc-input-result").css('opacity', '1.0');
    $(".cc-vocab-answer").css('opacity', '1.0');
    $(".cc-input-result").text("Sorry, that's not correct.").append("&nbsp;").css('color', 'red');
    $(".cc-vocab-answer").text(pinyin +  ': ' + '"' + definition.trimRight() + '"');
    $(".cc-text-field").prop( "disabled", true);
    $(".cc-submit-button").prop( "disabled", true);
  }
  user_is_answering = false;
}

  function next_word(){
    if (vocab_words.length == 0) {
        return;
    } 
    answered_vocab_words.push(vocab_words.shift());
    update_ui();
    $(".cc-text-field").focus();
    user_is_answering = true;
  }

  function update_ui(){

  if (vocab_words == null) {
    return
  }
  if (vocab_words.length > 0) {
  var word = vocab_words[0]["Hanzi"];
  $(".cc-vocab-word").text(word);
  $(".cc-text-field").val("");
  $(".cc-input-result").css('opacity', '0.0');
  $(".cc-vocab-answer").css('opacity', '0.0');
  $(".cc-text-field").prop( "disabled", false);
  $(".cc-submit-button").prop( "disabled", false);
  $(".cc-card-progress").text("Vocab Word #"+ (answered_vocab_words.length + 1).toString() + "/" + total_number_of_words.toString());
  }
  
  else if (vocab_words.length == 0){
    $(".cc-input-result").css('opacity', '0.0');
    $(".cc-vocab-answer").css('opacity', '1.0');
    $(".cc-vocab-word").text("You're done!");
    $(".cc-next-button").prop( "disabled", true);
    $(".cc-vocab-answer").text("You got " + correct_answer + "/" + total_number_of_words + " correct! That's " + ((correct_answer/total_number_of_words)*100).toFixed(2) + "%!");
  }
  };

  function shuffle_words() {
    shuffle(vocab_words);
    update_ui();
  }

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
    if(e.keyCode == 39){ 
        next_word()     
    }
}

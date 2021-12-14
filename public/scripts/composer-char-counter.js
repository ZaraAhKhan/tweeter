// $(document).ready(function() {
//   $(function() {
//     wordcounter();
//   });

//   const wordcounter = function() {
//     const $inputfield = $('#tweet-text');
//     $inputfield.on('input', function() {
//       const $counter = 140 - $('textarea', this).val().length;
//       $('.counter', this).text($counter);
//     });
//   };
// });

$(document).ready(function() {
  
  let counter = $('.content').find('.counter');
  $('#tweet-text').on('input',function() {
    counter[0].value = (140 - (this.value.length));
    if (counter[0].value < 0) {
      $('output').addClass('my-class');
    } else {
      $('output').removeClass('my-class');
    }
  });
      
});
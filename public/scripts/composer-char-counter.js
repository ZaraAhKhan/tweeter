$(document).ready(function() {
  const abc = 123;
  console.log(abc);
  let counter = $('.content').find('.counter');
  console.log(counter[0]);
  $('#tweet-text').on('keydown',function() {
    console.log(counter - (this.value.length));
  });
});

$(document).ready(function() {
    $('.gradient').each(function() {
      var $gradient = $(this);
      var percent = parseFloat($gradient.data('percent')); // Convert data-percent to float
      var integerPercent = Math.round(percent); // Round off the percent value
      var currentPercent = 0;
      var animationSpeed = 10; // Adjust animation speed
      var increment = 1; // Set increment value
  
      var $counter = $gradient.parent().find('.counter');
      var $indicator = $gradient.parent().find('.indicator'); // Select the indicator element
  
      function updateGradient() {
        var mask = 'conic-gradient(from 0deg, black ' + currentPercent + '%, transparent ' + currentPercent + '%)';
        $gradient.css('mask-image', mask);
        if (Number.isInteger(percent)) {
          $counter.text(percent + '%'); // Display integer percent without decimal points
        } else {
          $counter.text(percent.toFixed(2) + '%'); // Display decimal points
        }
        var angle = (currentPercent / 100) * 360;
        var x = Math.cos((angle - 90) * Math.PI / 180) * 47.75 + 50;
        var y = Math.sin((angle - 90) * Math.PI / 180) * 47.75 + 50;
        $indicator.css({ 'left': x + '%', 'top': y + '%' });
      }
  
      function animateProgressBar() {
        if (currentPercent < integerPercent) {
          currentPercent += increment; // Increment by 1
          updateGradient();
          if (integerPercent > 0) {
            $gradient.css('opacity', '1');
          }
          setTimeout(animateProgressBar, animationSpeed);
        } else if (integerPercent <= 0) {
          $indicator.hide();
          // Set the opacity to 0 when data-percent is 0 or less (handled by CSS)
        }
      }
  
      if (integerPercent > 0) {
        $indicator.show();
      }
  
      animateProgressBar();
    });
  });
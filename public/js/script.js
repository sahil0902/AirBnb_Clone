(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  // JavaScript for Preloading Images
  document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll('.carousel-item img');
    images.forEach(function (img) {
      var image = new Image();
      image.src = img.src;
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll('.carousel-item img');
    images.forEach(function (img) {
      var image = new Image();
      image.src = img.src;
    });
  });

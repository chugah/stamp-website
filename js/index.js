$(document).ready(function() {
  // Start Form validation
  const $inputRequired =   $('input[required="required"]');
  const $inputSubmit = $('input[type="submit"]');
  const $fullName = $('#full_name');
  const $email = $('#email');
  const $password = $('#password');

  $inputRequired.focusin(function(){
    verifyComplete();
  });

  $fullName.focusout(function() {
    verifyComplete();

    if ($(this).val() === '') {
      $(this).attr('placeholder', 'Name is required');
      $(this).addClass('error');
      disableSubmit();
    } else {
      $(this).removeClass('error');
      verifyComplete();
    }
  });

  $email.focusout(function() {
    let emailValid = isValidEmailAddress($(this).val());

    if ($(this).val() === '') {
      $(this).attr('placeholder', 'Email is required');
      $(this).addClass('error');
      disableSubmit();
    }
    else if (emailValid === false) {
      if ($('.error.email').length == 0) {
        $(this).after('<span class="error email">Please provide a valid email address</span>');
      }
      $(this).addClass('error');
      disableSubmit();
    }
    else if (emailValid === true) {
      $(this).removeClass('error');
      $('.error.email').remove();
      verifyComplete();
    }

  });

  $password.focusout(function() {
    let passwordValid = isValidPassword($(this).val());

    if ($(this).val() === '') {
      $(this).addClass('error');
      $(this).attr('placeholder', 'Password is required');
      disableSubmit();
    }
    else if (passwordValid === false) {
      if ($('.error.password').length == 0) {
        $(this).after('<span class="error password">8+ characters, at least 1 uppercase & 1 lowercase letter, 1 number & 1 special character</span>');
      }
      $(this).addClass('error');
      disableSubmit();
    }
    else if (passwordValid === true) {
      $(this).removeClass('error');
      $('.error.password').remove();
      verifyComplete();
    }

  });

  // FUNCTIONS

  // Verify that all fields in the form have been completed
  function verifyComplete() {
    let isFormComplete = true;

    const emptyFields = $inputRequired.filter(function() {
      return $(this).val() === "";
    }).length;

    if (emptyFields === 0) {
      isFormComplete = false;
      enableSubmit();
    } else {
      isFormComplete = true;
      disableSubmit();
    }

    return isFormComplete;

  };

  // Disable submit button
  function disableSubmit() {
    $inputSubmit.prop('disabled', true).val('Please complete all fields');
  }

  // Enable submit button
  function enableSubmit() {
    $inputSubmit.prop('disabled', false).val('Submit');
  }

  // Regex email validation
  // Regex source:  https://gist.github.com/beshur/3834282
  function isValidEmailAddress(emailAddress) {
    const pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  };

  // Regex password validation
  // Regex source:  https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  function isValidPassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  };
  // End Form validation

  // Start reveal menu via hamburger
  const $bkgLayer = $('.background-layer');
  const $nav = $('nav');
  const $navList = $('.nav-list');
  const $openMenu = $('.open-menu');
  const $closeMenu = $('.close-menu');
  const $motivation = $('#motivation');
  const $pwdIcon1 = $('#password1');
  const $pwdIcon2 = $('#password2');

  $openMenu.on('click', function(event) {
      event.preventDefault();
      $bkgLayer.addClass('alt-background-layer');
      $nav.addClass('menu');
      $openMenu.hide();
      $closeMenu.add($navList).fadeIn(400, 'linear');
      $motivation.css('display', 'none');
      $pwdIcon1.css('display', 'none');
      $pwdIcon2.css('display', 'none');
  });

  $closeMenu.on('click', function(event) {
      event.preventDefault();
      $bkgLayer.removeClass('alt-background-layer');
      $nav.removeClass('menu');
      $openMenu.show();
      $motivation.css('display', 'block');
      $pwdIcon1.css('display', 'block');
      $pwdIcon2.css('display', 'block');

      restoreMenuState();
  });

  function restoreMenuState() {
      $openMenu.add($navList).add($closeMenu).removeAttr('style');
      $nav.removeAttr('class');
  }
  // End reveral menu via hamburger

  // Start Show or Hide Password
  const $showPassword = $('.show-password');
  const $hidePassword = $('.hide-password');
  const $passwordField = $('.password-field');

  $showPassword.mouseenter(function(){
      $passwordField.attr('type','text');
      $showPassword.css('display','none');
      $hidePassword.css('display','inline');
  });
    $hidePassword.mouseleave(function(){
        $passwordField.attr('type','password');
        $showPassword.css('display','inline');
        $hidePassword.css('display','none');
  });
  // End Show or Hide Password
});

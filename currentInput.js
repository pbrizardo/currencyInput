(function() {

  'use strict';

  angular.module('myModule')
    .directive('currencyInput', CurrencyInputDirective)

  /** @ngInject */
  function CurrencyInputDirective($filter) {
    return {
      restrict: 'A',
      require: '^ngModel',
      link: function(scope, el, attr, modelCtrl) {

        var _isFocused = false;

        // on blur - apply formatting
        el.on('blur', function(e,t) {
          // Replace this with any UI blocker plugin that causes your input to become blurred
          if(!$('body').hasClass('block-ui-active')) {
            _isFocused = false;
            applyFormatting();
          }
        });

        // on focus - apply model value to input
        el.on('focus', function() {
          _isFocused = true;
          el.val(modelCtrl.$modelValue);
        });

        // destructor - unbind events
        el.on('destroy', function() {
          el.off('blur');
          el.off('focus');
        });

        function applyFormatting() {
          if (isFormattable()) {
            var formattedValue = '$'+$filter('number')(modelCtrl.$modelValue);
            el.val(formattedValue);
          }
        }

        function isFormattable() {
          return !isNaN(modelCtrl.$modelValue) && !_isFocused;
        }

        // watch for initial value to format it
        var loader = scope.$watch(function() { return modelCtrl.$modelValue; }, function(newVal) {
          applyFormatting();
        });

      }
    };
  }


})();

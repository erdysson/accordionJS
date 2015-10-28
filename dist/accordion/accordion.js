/**
 * Created by erdi.taner.gokalp on 27/10/15.
 */
(function() {
  "use strict";
  function Accordion(selector, config) {
    var accordionContainer = document.querySelector(selector);
    var closeOthers = typeof config.closeOthers == "boolean" ? config.closeOthers : false;
    var currentOpenAccordionMenu = null;
    var cachedContent = {};

    function initialize() {
      var accordions = Array.prototype.slice.call(accordionContainer.querySelectorAll(".accordion"), 0);
      accordions.forEach(function(accordion){
        var trigger = accordion.querySelector("[accordion]");
        var accordionMenu = accordion.querySelector(".accordion-menu");

        var providerName = trigger.getAttribute("content-provider");
        if (providerName) {
          trigger.addEventListener("click", _eventHandler(accordionMenu, __asyncLoaderFn(accordionMenu, providerName)));
        } else {
          trigger.addEventListener("click", _eventHandler(accordionMenu, __closeOthersFn(accordionMenu)));
        }
      });
    }

    function _loadCustomProvider(accordionMenu, providerName) {
      var deferred = Q.defer();
      if (cachedContent[providerName]) {
        deferred.resolve();
      } else {
        config.customData[providerName].provider()
          .then(function(resolved) {
            if (config.customData[providerName].cache === true) {
              cachedContent[providerName] = true;
            } else {
              _removeCustomDOM(accordionMenu);
            }
            _createCustomDOM(accordionMenu, resolved);
            deferred.resolve();
          })
          .catch(function(error) {
            deferred.reject(error);
          });
      }
      return deferred.promise;
    }

    function _createCustomDOM(menu, data) {
      data.forEach(function(dataInstance) {
        var li = document.createElement("li");
        li.innerHTML = dataInstance;
        li.classList.add("accordion-item");
        menu.appendChild(li);
      });
    }

    function _removeCustomDOM(accordionMenu) {
      while (accordionMenu.firstChild) {
        accordionMenu.removeChild(accordionMenu.firstChild);
      }
      return true;
    }

    function __closeOthersFn(accordionMenu) {
      return function() {
        if (closeOthers && currentOpenAccordionMenu !== null) {
          _hide(currentOpenAccordionMenu);
        }
        _show(accordionMenu);
      };
    }

    function __asyncLoaderFn(accordionMenu, providerName) {
      return function() {
        _loadCustomProvider(accordionMenu, providerName)
          .then(__closeOthersFn(accordionMenu))
          .catch(function(error) {
            console.log("error in async handler", error);
          });
      };
    }

    function _eventHandler(accordionMenu, callback) {
      return function(e) {
        var isShown = Array.prototype.slice.call(accordionMenu.classList,0).indexOf("show") > -1;
        if (!isShown) {
          callback();
        } else {
          _hide(accordionMenu);
        }
        e.preventDefault();
      };
    }

    function _show(accordionMenu) {
      accordionMenu.classList.remove("hide");
      accordionMenu.classList.add("show");
      currentOpenAccordionMenu = accordionMenu;
      return true;
    }

    function _hide(accordionMenu) {
      accordionMenu.classList.remove("show");
      accordionMenu.classList.add("hide");
      currentOpenAccordionMenu = null;
      return true;
    }

    return {
      $initialize: initialize
    };
  }
  // open to public
  window.Accordion = Accordion;
})();

//# sourceMappingURL=accordion.js.map

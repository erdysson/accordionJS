/**
 * Created by erdi.taner.gokalp on 27/10/15.
 */

function contentProvider1() {
  console.log("async called");
  var deferred = Q.defer();
  setTimeout(function() {
    console.log("async ended");
    var resolved = ["async item1", "async item2", "async item3"];
    deferred.resolve(resolved);
  }, 3000);
  return deferred.promise;
}

var accordion = Accordion(".accordion-group",
  {
    closeOthers: true,
    customData: {
      contentProvider1: {
        provider: contentProvider1,
        cache: true
      }
    }
  });
accordion.$initialize();
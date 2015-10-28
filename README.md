# accordion - dropdown
Simple, Extensible accordion / dropdown plug-in useful as nav-bar, list and sidebar.
Use the plug-in with set of rules which is appropriate for your project.

Create a list combination like :

    <ul class="accordion-group">
            <li class="accordion">
              <button accordion>Accordion 1</button>
              <ul class="accordion-menu">
                <li class="accordion-item">item 1</li>
                <li class="accordion-item">item 2</li>
                <li class="accordion-item">item 3</li>
                <li class="accordion-item">item 4</li>
              </ul>
            </li>
            <li class="accordion">
              <button accordion>Accordion 2</button>
              <ul class="accordion-menu">
                <li class="accordion-item">item 1</li>
                <li class="accordion-item">item 2</li>
                <li class="accordion-item">item 3</li>
                <li class="accordion-item">item 4</li>
              </ul>
            </li>
            <li class="accordion">
              <button accordion>Accordion 3</button>
              <ul class="accordion-menu">
                <li class="accordion-item">item 1</li>
                <li class="accordion-item">item 2</li>
                <li class="accordion-item">item 3</li>
                <li class="accordion-item">item 4</li>
              </ul>
            </li>
            <li class="accordion">
              <button accordion content-provider="contentProvider1">Async Accordion 4</button>
              <ul class="accordion-menu">
              </ul>
            </li>
          </ul>
    
  and your script file to use the plug-in :
    
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
              },
              contentProvider2: {
                provider: contentProvider2,
                cache: false
              }
            }
      });
    accordion.$initialize();
    

  for quick usage, download the poject, in the directory;
  run npm i, 
  then run gulp, 
  and finally go to your browser and type http://localhost:8080/demo/index.html

  Please report bugs, request for new useful features.

  Quick demo on CodePen: http://codepen.io/erdysson/pen/XmqBWB

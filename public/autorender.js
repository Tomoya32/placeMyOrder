define(["@loader", "module", "can/view/stache/system"], function(loader, module, systemStache){

  var renderer;

  var isNode = typeof process === "object" &&
    {}.toString.call(process) === "[object process]";

  if(!isNode) {
    setup();
  }

  function setup(){
    var main = loader.main;
    loader.import(main).then(function(r){
      renderer = r;

      render();
      liveReload(loader, main);
    });
  }

  function isScript(el){
    return el.tagName && el.tagName.toLowerCase() === "script";
  }

  function cleanBody(){
    var toRemove = [];
    can.each(can.$("body")[0].childNodes, function(el){
      if(!isScript(el)) {
        toRemove.push(can.$(el));
      }
    });
    can.each(toRemove, function(el){
      can.remove(el);
    });
  }

  function render(){
    cleanBody();
    var state = can.route.data;
    var frag = renderer(state);

    can.appendChild(can.$("body")[0], frag);
  }

  function liveReload(loader, main){
    if(!loader.has("live-reload")) {
      return;
    }

    loader.import("live-reload", { name: module.id }).then(function(reload){
      reload(render);

      reload(main, function(r){
        renderer = r;
      });
    });
  }

  return {
    translate: systemStache.translate
  };
});

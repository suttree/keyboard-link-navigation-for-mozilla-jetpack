/* Keyboard link navigation - making each link navigable from the keyboard */
/* Duncan Gough - http://suttree.com */
var buffer = Array();

function textLinks(doc){
  var counter = 0;
  $(doc).find('a').each(function(){
    counter++;
    var linkText = $(this).html();
    $(this).attr('link_position', counter);
    $(this).html( linkText + "<sup><small>[" + counter + "]</small></sup>" );
  });
  setupKeyListener(doc);
}

function checkForValidLinks(doc,buffer){
  var id = String.fromCharCode(buffer[0], buffer[1], buffer[2], buffer[3], buffer[4]); /* ye hacke */
  id = id.replace(/[^0-9]/g, '');
  var link = $(doc).find('a[link_position*=' + id + ']');
  doc.location = link.attr('href');
}

function setupKeyListener(doc){
  $(doc).keypress(function(e){
    if (e.which == 13) {
      checkForValidLinks(doc,buffer);
      buffer = Array();
    } else if (e.which != 58) {
      buffer.push(e.which);
    }
  });
}

jetpack.statusBar.append({
  html: "txt-lnx:<input type='checkbox'>",
  width: 100,
  onReady: function(widget){
    $("input", widget).click(function(){
      if( this.checked ){
        jetpack.tabs.onReady( textLinks );
        textLinks(jetpack.tabs.focused.contentDocument);
      }
      else jetpack.tabs.onReady.unbind( textLinks );
    });
  }
});
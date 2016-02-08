function scroll(){
  //holds pixels from top of the page
  var offset = window.pageYOffset;

  //hold a reference to cover photo DOM element
  var cover = document.getElementById('cover-photo');

  //set the top margin of the cover image to the offset, divided by 1.5px here - main content moves, the image moves slower
  cover.style.marginTop = (offset / 1.5) + "px";

  //tells the window to call 'scroll()' when a scroll event occurs
  window.onscroll = scroll;
}

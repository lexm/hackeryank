var scrapePath = function() {
  var pathArray = [];
  $(".bcrumb span").each(function() {
    pathArray.push(this.textContent);
  });
  return pathArray;
};

console.log(scrapePath());

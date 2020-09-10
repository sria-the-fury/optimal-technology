var divs = ["post","eod","tech_list_admin", "add_project", "about","project_list_area","show_post_area","money","add-admin","show_post_tech", "eod_area", "req_area", "about_tech", "tech_list_tech", "project_list_tech","update_pass","update_pass_tech","set_name","set_name_tech"];
var visibleDivId = null;
function divVisibility(divId) {
  if(visibleDivId === divId) {
    visibleDivId = null;
} else {
    visibleDivId = divId;
}
hideNonVisibleDivs();
}
function hideNonVisibleDivs() {
  var i, divId, div;
  for(i = 0; i < divs.length; i++) {
    divId = divs[i];
    div = document.getElementById(divId);
    if(visibleDivId === divId) {
      div.style.display = "block";
  } else {
      div.style.display = "none";
  }
}
}


function ready() {
  // If is part of some team
  in_team = true
  if (in_team) {
    document.getElementById('create_join_section').style.display = "none";
    document.getElementById('team_members_list_section').style.display = "block";
  } else {
    document.getElementById('team_members_list_section').style.display = "none";
    document.getElementById('create_join_section').style.display = "block";
  }

  hideAll();
}

function hideAll() {
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  openTab('id_section_profile', document.getElementById('default_header_id'))
}


function openTab(sectionName, element) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  tabheaders = document.getElementsByClassName("tab_headers");
  console.log(tabheaders)
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabheaders[i].classList.remove('is-active');
  }
  document.getElementById(sectionName).style.display = "block";
  element.classList.add('is-active');
}
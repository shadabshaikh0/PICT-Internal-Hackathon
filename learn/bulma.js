
function hideAll() { 
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    openTab('id_section_profile',document.getElementById('default_header_id') )
}


function openTab(sectionName, element) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tabheaders = document.getElementsByClassName("tab_headers");
    console.log(tabheaders)
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabheaders[i].classList.remove('is-active') ;
    }
    document.getElementById(sectionName).style.display = "block";
    element.classList.add('is-active') ; 
}
  
  
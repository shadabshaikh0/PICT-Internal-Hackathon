function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function signout() {
  console.log('Clck')
  delete_cookie('jwt_token');
  window.location = '/';
}

function display_dashboard(payload) {
  console.log(payload);

  let userdata = payload.userdata;
  // let teamdata = payload.teamdata;

  // userdata = {
  //   gravatar: 'https://bulma.io/images/placeholders/128x128.png',
  //   name: 'Shadab Majid Shaikh',
  //   _id: 'C39824782738',
  //   email: 'shadabshaik@gamil.com',
  //   mobile: '8974573495',
  //   dept: 'Computer',
  //   year: 'BE'
  // }


  if (userdata.gravatar_url == 'http://www.gravatar.com/avatar/2533554fff89b7aef3f8aff5eef02a0e') {
    userdata.gravatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwjmWcbAVI_chtFQiSWVBZCGbFgg3r9F4j_SGIgPHnQtTasagzWA&s'
  }
  document.getElementById('user_gravatar').src = userdata.gravatar_url;
  document.getElementById('user_name').innerText = userdata.name;
  document.getElementById('user_regid').innerText = userdata._id;
  document.getElementById('user_email').innerText = userdata.email;
  document.getElementById('user_deptyear').innerText = userdata.dept + ', ' + userdata.year;
  document.getElementById('user_mobile').innerText = userdata.mobile;

  teamdata = {
    teamname: "Simplifiers",
    teamid: "1",
    membername1: "Shadab Shaikh",
    membername2: "Surya Jha",
    membername3: "Sairaj Sawant",
    membername4: "Shubham Rekkawar",
    membername5: "Priyanka Khot",
    membername6: "Pallavi Paliwal",
  }

  document.getElementById('teamname').innerText = teamdata.teamname;
  document.getElementById('teamid').innerText = teamdata.teamid;
  document.getElementById('membername1').innerText = teamdata.membername1;
  document.getElementById('membername2').innerText = teamdata.membername2;
  document.getElementById('membername3').innerText = teamdata.membername3;
  document.getElementById('membername4').innerText = teamdata.membername4;
  document.getElementById('membername5').innerText = teamdata.membername5;
  document.getElementById('membername6').innerText = teamdata.membername6;


}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function loaddata() {
  reg_id = getCookie('uuid');
  console.log(reg_id);

  data = {
    id: reg_id
  };
  fetch('http://localhost:8000/fetch/user_dashboard', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(function (res) {
      console.log(res);
      display_dashboard(res)

    });
}

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
  loaddata();
  tabLoad() ; 
}

function getGetParam(param){
  var url_string = window.location.href
  var url = new URL(url_string);
  return url.searchParams.get(param);
}

function tabLoad(){
  let tab_name = getGetParam('tab') ;
  openTab('id_section_' + tab_name, document.getElementById(tab_name + '_tab')) ; 
}

function hideAll() {
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
}


function openTab(sectionName, element) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  tabheaders = document.getElementsByClassName("tab_headers");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabheaders[i].classList.remove('is-active');
  }
  document.getElementById(sectionName).style.display = "block";
  element.classList.add('is-active');
  let tab_name = sectionName.split('id_section_')[1] ; 
  history.pushState({}, null, window.location.href.split('?')[0] + '?tab=' + tab_name);
}
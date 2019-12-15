
function joinTeam() {
  let team_code = document.getElementById("team_code_input").value;
  let reg_id = getCookie('uuid');
  data = {
    reg_id: reg_id,
    team_code: team_code
  };
  fetch('http://localhost:8000/team/jointeam', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(function (res) {
      console.log(res);
    });
}


function createTeam_and_generateCode() {
  let team_name = document.getElementById("team_name_input").value;

  let reg_id = getCookie('uuid');
  data = {
    team_leaderid: reg_id,
    team_name: team_name
  };
  fetch('http://localhost:8000/team/createteam', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(function (res) {
      console.log(res);
      window.location = '/account/profile'
    });
}

function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function signout() {
  delete_cookie('jwt_token');
  window.location = '/';
}

function display_dashboard(payload) {
  console.log(payload);

  let userdata = payload.userdata;
  // let teamdata = payload.teamdata;


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
      console.log(res.userdata.is_inteam);
      in_team = res.userdata.is_inteam;
      if (in_team) {
        document.getElementById('create_join_section').style.display = "none";
        document.getElementById('team_members_list_section').style.display = "block";
      } else {
        document.getElementById('team_members_list_section').style.display = "none";
        document.getElementById('create_join_section').style.display = "block";
      }
      hideAll();    
      display_dashboard(res)
    });
}

function ready() {
  loaddata();
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
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabheaders[i].classList.remove('is-active');
  }
  document.getElementById(sectionName).style.display = "block";
  element.classList.add('is-active');
}
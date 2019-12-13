function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function signout(){
  console.log('Clck')
  delete_cookie('jwt_token') ; 
  window.location = '/' ; 
  // comment
}

function display_dashboard( payload  ){
    // let userdata = payload.userdata;
    // let teamdata = payload.teamdata;

    userdata = {
      gravatar : 'https://bulma.io/images/placeholders/128x128.png',
      name : 'Shadab Majid Shaikh',
      _id : 'C39824782738',
      email : 'shadabshaik@gamil.com',
      mobile : '8974573495',
      dept : 'Computer',
      year : 'BE'
    }


    document.getElementById('user_gravatar').src = userdata.gravatar ; 
    document.getElementById('user_name').innerText = userdata.name ; 
    document.getElementById('user_regid').innerText = userdata._id ; 
    document.getElementById('user_email').innerText = userdata.email ; 
    document.getElementById('user_deptyear').innerText = userdata.dept + ', ' + userdata.year ; 
    document.getElementById('user_mobile').innerText = userdata.mobile ; 

    teamdata = {
      teamname    : "Simplifiers",
      teamid      : "1",
      membername1 : "Shadab Shaikh",
      membername2 : "Surya Jha",
      membername3 : "Sairaj Sawant",
      membername4 : "Shubham Rekkawar",
      membername5 : "Priyanka Khot",
      membername6 : "Pallavi Paliwal",
    }

    document.getElementById('teamname').innerText    = teamdata.teamname ; 
    document.getElementById('teamid').innerText      = teamdata.teamid ; 
    document.getElementById('membername1').innerText = teamdata.membername1 ; 
    document.getElementById('membername2').innerText = teamdata.membername2 ; 
    document.getElementById('membername3').innerText = teamdata.membername3 ; 
    document.getElementById('membername4').innerText = teamdata.membername4 ; 
    document.getElementById('membername5').innerText = teamdata.membername5 ; 
    document.getElementById('membername6').innerText = teamdata.membername6 ; 


  }

function loaddata() {
  data = { id: 'C2K17207238' };
  fetch('http://localhost:8000/api/foo', {
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
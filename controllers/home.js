/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('index', {
    title: 'Home'
  });
};

exports.login = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.signup = (req, res) => {
  res.render('signup', {
    title: 'Signup'
  });
};

exports.profile = (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard'
  });
};
exports.forgot = (req,res) =>{
  res.render('forgot', {
    title: 'ForgotPassword'
  });
}
exports.changePassword = (req,res) =>{
  res.render('changePassword', {
    title: 'Chnage Password'
  });
}

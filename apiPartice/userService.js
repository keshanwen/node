class userService {

  login(username,password) {
    console.log('entered UserService login method');
    console.log('info from UserService.login: ' + username + ', ' + password);

    return true    
  }
}

module.exports = new userService()
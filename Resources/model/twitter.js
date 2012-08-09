var twitter = require('lib/twitter').Twitter({
  consumerKey: 'NBUxCSqfGY37H7iXyK7Hg',
  consumerSecret: 'CCj1VoNLGq9oiIIYLjM5gBOFDAAmeubx2yhq6eWgV8',
  accessTokenKey: Ti.App.Properties.getString('twitterAccessTokenKey', ''),
  accessTokenSecret: Ti.App.Properties.getString('twitterAccessTokenSecret', '')
});
var twitterAuthorize = function(event){
  twitter.addEventListener('login', function(e){
    if (e.success) {
      Ti.App.Properties.setString('twitterAccessTokenKey', e.accessTokenKey);
      Ti.App.Properties.setString('twitterAccessTokenSecret', e.accessTokenSecret);

      twitter.request('1/account/verify_credentials.json', {}, {}, 'GET', function(e){
	if (e.success) {
	  var json = JSON.parse(e.result.text);


	  if (event) {
	    twitterRow.removeEventListener('click', twitterAuthorize);
	  }
	} else {

	}
      });
    } else {

    }
  });

  twitter.authorize();
};

var exports = {
  auth:twitterAuthorize
};
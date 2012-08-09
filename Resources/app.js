Titanium.UI.setBackgroundColor('#000');
var tw = require('model/twitter');
var Cloud = require('ti.cloud');
var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow({
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
var label1 = Ti.UI.createLabel({
  top:30,
  left:5,
  width:200,
  height:300,
  text:'投稿結果'
});

var button1 = Ti.UI.createButton({
  top:5,
  left:5,
  height:20,
  width:50,
  title:"start"
});

button1.addEventListener('click',function(){
  tw.auth();

  var twToken = Ti.App.Properties.getString('twitterAccessTokenKey');
  Cloud.SocialIntegrations.externalAccountLogin({
    id:'h5y1m141@gmail.com',
    type: 'twitter',
    token: twToken
  }, function (e) {
    if (e.success) {
      Cloud.Posts.create({
        content: 'twitteアカウントを利用しての投稿',
        title: '果たしてうまくいくか？'
      }, function (e) {

        if (e.success) {
          var post = e.posts[0];
          console.log('success'+post.id);
          label1.setText(post.id + '\n' +
                            'title: ' + post.title + '\n' +
                            'content: ' + post.content + '\n' +
                            'updated_at: ' + post.updated_at);
        } else {
          label1.setText = ('Error:\\n' +
                            ((e.error && e.message) || JSON.stringify(e)));
        }

      });

    } else {
      console.log('Error:\\n' +
                  ((e.error && e.message) || JSON.stringify(e)));
    }
  });
});
win1.add(label1);
win1.add(button1);






var win2 = Titanium.UI.createWindow({
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 2',
    window:win2
});
var label2 = Ti.UI.createLabel({
  top:5,
  left:5,
  width:200,
  height:300,
  text:'投稿結果'
});


Ti.Facebook.appid = '403860869676079';
Ti.Facebook.permissions = ['publish_stream']; // Permissions your app needs
Ti.Facebook.addEventListener('login', function(e) {
  if (e.success) {
    console.log('Logged In');
    Cloud.SocialIntegrations.externalAccountLogin({
      type: 'facebook',
      token: Ti.Facebook.accessToken
    }, function (e) {
      if (e.success) {
        Cloud.Posts.create({
          content: 'Facebookアカウントを利用しての投稿',
          title: 'Facebookから投稿。果たしてうまくいくか？'
        }, function (e) {

          if (e.success) {
            var post = e.posts[0];
            label2.setText('Success:\n' +
                'id: ' + post.id + '\n' +
                'title: ' + post.title + '\n' +
                'content: ' + post.content + '\n' +
                'updated_at: ' + post.updated_at);

          } else {
            label2.setText =( 'Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
            console.log('Error:\\n' +
                        ((e.error && e.message) || JSON.stringify(e)));
          }
        });

      } else {
        console.log('Error:\\n' +
                    ((e.error && e.message) || JSON.stringify(e)));
      }
    });
  }
});

Ti.Facebook.addEventListener('logout', function(e) {
  console.log('Logged out');
});
win2.add(Ti.Facebook.createLoginButton({
  top : 5,
  left:5,
  style : Ti.Facebook.BUTTON_STYLE_WIDE
}));
win2.add(label2);


var win3 = Titanium.UI.createWindow({
    title:'Tab 3',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 3',
    window:win3
});
var label3 = Ti.UI.createLabel({
  top:5,
  left:5,
  width:200,
  height:300,
  text:'投稿結果'
});

// Cloud.Places.query({
//   page: 1,
//   per_page: 20,
//   where: {
//     lnglat: {
//         '$nearSphere': [35.70,139],
//         '$maxDistance': 0.00126
//     }
//   }
// }, function (e) {
var savedPlaceId = '5020486bb68553743d054b57';
Cloud.Places.show({
        place_id: savedPlaceId
}, function (e) {
  if (e.success) {
    console.log('Success:\n' +
          'Count: ' + e.places.length);
    for (var i = 0; i < e.places.length; i++) {
      var place = e.places[i];
      label3.setText('id: ' + place.id + '\n' +
                     'name: ' + place.name + '\n' +
                     'latitude: ' + place.latitude + '\n' +
                     'longitude: ' + place.longitude + '\n' +
                     'updated_at: ' + place.updated_at
                     );
    }
  } else {
    console.log('Error:\n' +
          ((e.error && e.message) || JSON.stringify(e)));
  }
});
win3.add(label3);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.open();
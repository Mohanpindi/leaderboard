PlayersList = new Mongo.Collection('Player');


if(Meteor.isClient){
  Template.leaderboard.helpers({
  'Player': function(){
  return PlayersList.find({}, {sort : {score: -1}});
},
  'selectedClass': function(){
    var playerid= this._id;
    var selectedPlayer= Session.get('selectedPlayer');
    if(playerid==selectedPlayer){
      return "selected";
    }},
    'selectedPlayerShow' :function(){

      var SelectedPalyerShow= Session.get('selectedPlayer');
      console.log("debug"+ SelectedPalyerShow);

      return PlayersList.findOne(SelectedPalyerShow);

    }



  });
 Template.leaderboard.events({
    'click .Player' : function(){
      console.log("player click");
      var playerid= this._id;
      Session.set('selectedPlayer',playerid);
      var selectedplayer = Session.get('selectedPlayer');
    },

    'click .increament': function(){
      var selectedPlayer= Session.get('selectedPlayer');
      console.log("debug " + selectedPlayer);
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decreament': function(){
      var selectedPlayer= Session.get('selectedPlayer');
      console.log(selectedPlayer);
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },

  });
Template.LeaderBoardAddPlayerForm.events({
  'submit #form1' :function(e){
  e.preventDefault();
  var getplayername= e.target.Playername.value;
PlayersList.insert({
  name:getplayername,
  score:0
});

  },
  'click .delete': function(){
    var DeletePalyer= Session.get('selectedPlayer');
    console.log("debug");
    PlayersList.remove(DeletePalyer);
  }

});



Template.register.events({
'submit form'  : function(e){
  var Name= e.target.username.value;
  var Email=e.target.registerEmail.value;
  var password= e.target.registerPassword.value;
  Accounts.createUser({
    name:Name,
    email:Email,
    password:password
  });

  }
});
//UserAccounts= new Mongo.Collection('user');
//UserAccounts= new Mongo.Collection('User');
}

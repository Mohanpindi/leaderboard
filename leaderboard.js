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
      return "selected"
    }

    //comment
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
    }
  });
}

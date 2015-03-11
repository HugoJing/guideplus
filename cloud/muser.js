/**
 * Created by Hugo on 15-3-9.
 */

var User = AV.Object.extend('_User');

function findUser(queryFn) {
	var q = new AV.Query(User);
 	queryFn.call(this, q);
 	return q.first();
}

function findRawUserById (id) {
 	return findUser(function (q) {
 		q.equalTo('objectId', id);
 	});
}

function findUserById(id) {
  return findRawUserById(id).then(function (c) {
    if (c) {
      c = transfromUser(c);
    }
    return AV.Promise.as(c);
  });
}

function updateCurUser(map) {
  var user=AV.User.current();
  if (map.username) {
    user.set('username', map.username);
  }
  return user.save();
}

function transfromUser(curUser) {
  return {
    username:curUser.get('username'),
    id:curUser.id,
    MPN:curUser.get('mobilePhoneNumber'),
    token:curUser.get('sessionToken')
  };
}

function findUserByName(name){
  return findUser(function(q){
    q.equalTo('username',name)
  });
}

function findUserByMPN(MPN){
  return findUser(function(q){
    q.equalTo('mobilePhoneNumber',MPN)
  });
}

exports.findUserById = findUserById;
exports.findRawUserById=findRawUserById;
exports.transfromUser=transfromUser;
exports.updateCurUser=updateCurUser;
exports.findUserByName=findUserByName;
exports.findUserByMPN=findUserByMPN;
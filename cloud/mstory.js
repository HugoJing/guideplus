/**
 * Created by Hugo on 14-12-19.
 */

var Story = AV.Object.extend('Story');

<<<<<<< HEAD


=======
>>>>>>> 3cc88c1d07df9f1b49c22737df288ec8dd1e81d2
function findStory(queryFn) {
  var q = new AV.Query(Story);
  queryFn.call(this, q);
  return q.first();
}

function findRawStoryById(id) {
  return findStory(function (q) {
    q.equalTo('objectId', id);
  });
}

function transfromStory(curStory) {
  return {
    title:curStory.get('title'),
    id:curStory.id,
    content:curStory.get('content')
  };
}

function findStoryById(id) {
  return findRawStoryById(id).then(function (c) {
    if (c) {
      c = transfromStory(c);
    }
    return AV.Promise.as(c);
  });
}

exports.findStoryById = findStoryById;
exports.findRawStoryById=findRawStoryById;
exports.transfromStory=transfromStory;
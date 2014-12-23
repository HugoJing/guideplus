/**
 * Created by Hugo on 14-12-19.
 */

var Story = AV.Object.extend('Story');



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

function addCurStory(map) {
    var story=AV.Object(story).add();
    if (map.title) {
      story.set('title', map.title);
    }
    if (map.content) {
      story.set('content', map.content);
    }
    return story.save();
}

exports.findStoryById = findStoryById;
exports.findRawStoryById=findRawStoryById;
exports.transfromStory=transfromStory;
exports.addCurStory=addCurStory;
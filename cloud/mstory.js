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
    content:curStory.get('content'),
    type:curStory.get('type'),
    readLink:curStory.get('readLink'),
    from:curStory.get('from'),
    image:curStory.get('image')
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

// function createStory(map) {
//     var story = new Story;
//     story.set('title', map.title);
//     story.set('content', map.content);
//     story.set('readLink', map.readLink);
//     return story.save(null, {
//         success: function(story) {
//             var story.id
//             console.log('New object created with objectId: ' + story.id);
//             renderInfo(res, '成功！辛苦了，你又录入了一篇帖子' + story.id );
//         },
//         error: function(story, error) {
//             console.log('Failed to create new object, with error code: ' + error.description);
//         }
//     });
// }

exports.findStoryById = findStoryById;
exports.findRawStoryById = findRawStoryById;
exports.transfromStory = transfromStory;
// exports.createStory = createStory;

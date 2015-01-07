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

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 调用：
// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");

function transfromStory(curStory) {
  return {
    title:curStory.get('title'),
    id:curStory.id,
    content:curStory.get('content'),
    type:curStory.get('type'),
    readLink:curStory.get('readLink'),
    from:curStory.get('from'),
    url:curStory.get('url'),
    createdAt:curStory.createdAt.Format("yyyy/MM/dd"),
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

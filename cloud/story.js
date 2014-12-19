var Story = AV.Object.extend('Story');

function findStoryById() {
  var p=new AV.Promise();
  var q = new AV.Query(Story);
  q.equalTo('name', 'Ticket');
  q.first().then(function (c) {
    if(c){
      p.resolve(c);
    }else{
      var cc=new Counter();
      cc.set('name','Ticket');
      cc.set('n',0);
      cc.save(function(cc){
        q.resolve(cc);
      },mutil.rejectFn(p));
    }
  },mutil.rejectFn(p));
  return p;
}

exports.findTicketN = findTicketN;
exports.incTicketN = incTicketN;
exports.incTicketNReturnOrigin=incTicketNReturnOrigin;
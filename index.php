<?php
<script src="https://cn.avoscloud.com/scripts/lib/av-0.4.3.min.js"></script>

AV.initialize("jpi0gdoek99s47rgf6kif9uczcdz9mmzj3bfoo27bwmgw1hk", "u52y8nbcvu6a7qcag549yg5is1tep1lvqtvbk28zv46ki655");
// 初始化 param1：应用 id、param2：应用 key

<script type="text/javascript">
var TestObject = AV.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}, {
  success: function(object) {
  alert("AVOS Cloud works!");
  }
});
</script>

?>
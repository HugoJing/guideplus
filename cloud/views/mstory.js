<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

	<title><%= story.title %></title>
	<!-- Class：$class -->

	<!-- Adaptive Device Screen Size -->
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="/post/css/guideplus_post_v1.0.css" type="text/css" />
	
</head>

<body>
<div id="site">
	
    <div id="read_head">
           
        <img src="/post/logos/< logoUrl >" alt="< logoText >" class="read-logo" />
                        
    </div>
	
	<div id="page">
		<h1><%= story.title %></h1>
		
			<p style="text-align: center;"><img alt="" src="< firstPictureUrl >" style="width: 440px" /></p><br />

			<!-- 每个段落(文本/图片)包裹在 <p></p><br /> 中 -->
			<%- story.content %>
		
	<div class="read-link"><a href="< originalUrl >">查看原文 >></a></div>

	</div>

</div>

<a id="message_a" href="http://guideplus.me/">
	<div id="message">
		<div class="message-inner">
			<div class="message-logo"></div>
			<div class="message-text">
				<p class="message-text-title"> Guide+ </p>
				<p class="message-text-inner">只有 1% 的聪明人在使用它</p>
			</div>
			<div class="message-button">立即下载</div>
		</div>
	</div>
</a>

<div id="bottom">
	<div class="bottom-logo"><img src="http://zine-static.qiniudn.com/article/ui-image/logo.png" alt="logo" /></div>
	<div class="bottom-title"><p class="bottom-text"> Guide+ 只有 1% 的聪明人在使用它</p></div>
	<div class="bottom-about"><a href="http://guideplus.me/" class="about-link">了解更多</a></div>
</div>

</body>

	<script type="text/javascript" src="/post/js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="/post/js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="/post/js/retina.min.js"></script>
	<!-- <script type="text/javascript" src="http://guideplus.qiniudn.com/static/post/js/readScript-web.js"></script> -->
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-57230290-1', 'auto');
	  ga('require', 'displayfeatures');
	  ga('send', 'pageview');
    </script>

</html>

The Nature of Code Video Series
===============================

This site organizes a series of video lessons for my [Nature of Code](http://natureofcode.com) book. The site is: http://video.natureofcode.com.


Annotations
-----------

We are experimenting with a system to display annotations to the video.  The annotations are timecoded and appear for a block of time in the video. The raw source of an annotation looks like:


```
<div data-start="0:01" data-end="00:20">
	  This is  an annotation.  It might <a href="http://www.google.com">have a link in it</a>.
</div>
```	

The annotation also can include source code by linking to a file on github.  For example:

```
<div data-start="0:01" data-end="00:20">
	<a href="https://api.github.com/repos/shiffman/LearningProcessing/contents/chp03_flow/example_3_2_mouseX_mouseY/example_3_2_mouseX_mouseY.pde" data-displaycode="true">See the code</a> for this example.
</div>
```

We are thinking about a tool to allow users to submit annotations.  For now, if you'd like to contribute you'll have to do so via a pull request.  For example if you'd like to annotate [Video 0.5: Processing Examples](http://icm.shiffman.net/0.5/), you can [edit this page](https://github.com/shiffman/icm.shiffman.net/blob/gh-pages/_posts/2013-07-22-0.5.html).  Here are [all of the pages](https://github.com/shiffman/icm.shiffman.net/tree/gh-pages/_posts).

---
layout: page
title: 关于我
permalink: /about/
weight: 3
---

# **About Me**

Hello 我是 **{{ site.author.name }}** :wave:,<br>
 欢迎来到我的博客！我将总结部分我遇到过的困难，并在此写出方法文档；如果对你有帮助，请持续关注我博客！

<div class="row">
{% include about/skills.html title="主要技术" source=site.data.programming-skills %}
{% include about/skills.html title="其他技术" source=site.data.other-skills %}
</div>

<div class="row">
{% include about/timeline.html %}
</div>
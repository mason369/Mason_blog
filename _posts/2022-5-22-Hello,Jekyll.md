---
title: 星空摄影深空图像的预处理与降噪
tags: [星空摄影, 图像处理, 降噪方法]
style: fill
color: primary
description: 测试描述
---

天文摄影中，很重要的一个词就是信噪比，即信号与噪声的比值。在日常摄影中，相机接收到的光信号是远大于噪声的，我们可以将噪声忽略，但是在天文摄影中，我们拍摄的目标是宇宙中非常暗弱的天体，其光信号可能并不比噪声强多少，此时我们就需要在处理深空图像前，先对其进行预处理，而预处理中很重要的一步就是图像校准。

<h3><i><font>一、噪声</font></i></h3>
在讲图像校准之前，我们需要先了解噪声的来源。天文摄影中的噪声可以这样分类：
<img src="https://pic2.zhimg.com/80/v2-e8b9eca91ff9b3c9c59e88ebaabc79c1_1440w.jpg">
首先解释一下固定噪声和随机噪声。固定噪声即在拍摄的每张图像上的分布基本一致的噪声，随机噪声则是在每张图像上都随机分布的噪声。由于这两种噪声的特性，我们在校准过程中即可减去固定噪声，而随机噪声则需要对图像进行叠加来削弱。  

## 接下来介绍一下各种噪声的来源和特点：
  
* <b>零曝光噪声：</b>相机在无光子进入，且曝光时间为0（非常短）时，相机所拍摄的图像并不是全黑（即无任何信号）的，而是呈现出一种特殊的偏置图案，这就是零曝光噪声。下面两张图中，左图为FLIProline16803相机的偏置图案，右图为QHYminicam5相机的偏置图案（均经过拉伸）
<img src="https://pic2.zhimg.com/80/v2-d540bd16e5f22070303b17a010e913a0_1440w.jpg">
* <b>热噪声：</b>这种噪声比较特殊，是由电子的无规则热运动生成的热电荷引起的，热电荷的生成速率被称之为暗电流。它随着曝光时间的增长而增加，增加速率与温度有关，温度越高，增加越快，且不同像素的暗电流增加速率也不同。
<img src="https://pic2.zhimg.com/80/v2-1b35afc690e66baf76582e67b01d2f55_1440w.jpg">
* <b>光噪声：</b>由于拍摄的深空天体一般都比较暗弱，传感器接收到的光子数较少，由于光子的量子特性，此时光子的涨落就会很明显。也就是说，对于一个像素，假设它接收到的光子的均值是100（光源亮度稳定），但是在不同的帧中，其接收到的光子则是100附近的值，其分布服从泊松分布。

~~~java
public java extends c{

}
~~~

---
粉丝值

---

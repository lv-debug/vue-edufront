<template>
  <div>

    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>
<script>
import videoApi from '@/api/video'

export default {
    layout: 'video',//应用video布局

    //异步调用请求，进入页面不会立即去请求，而是当操作请求的时候才会调用,只会调用一次；1,8表示第一页，共8条
    //params : 表示this.$route.params.vid 等于 params.vid,由于页面时_vid，所以此处用_vid.
    //error : 异步请求出现错误
    asyncData({ params, error }) {
       return videoApi.getAlyiVideoPlayAuth(params.vid)
       //此处相当于 this.data =  response.data.data
        // data () {
        //   return {
        //     data: []
        //   }
        // },
        .then(response => {
            return { 
                playAuth: response.data.data.playAuth,
                vid: params.vid
            }
        })
    },
    mounted() { //页面渲染之后,数据已经有了  created，数据还没有
        new Aliplayer({
            id: 'J_prismPlayer',
            vid: this.vid, // 视频id
            playauth: this.playAuth, // 播放凭证
            encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            width: '100%',
            height: '500px',
            // 以下可选设置
            cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
            qualitySort: 'asc', // 清晰度排序

            mediaType: 'video', // 返回音频还是视频
            autoplay: false, // 自动播放
            isLive: false, // 直播
            rePlay: false, // 循环播放
            preload: true,
            controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
            useH5Prism: true, // 播放器类型：html5
        }, function(player) {
            console.log('播放器创建成功')
        })
    }

}
</script>

<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="data.total > 0">
            <ul class="of">
              <li v-for="dataInfo in data.items" :key="dataInfo.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/' + dataInfo.id" :title="dataInfo.name" target="_blank">
                      <img :src="dataInfo.avatar" alt>
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/' + dataInfo.id" :title="dataInfo.name" target="_blank" class="fsize18 c-666">{{dataInfo.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{dataInfo.career}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{dataInfo.intro}}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)">首页</a>

          <a
            v-for="page in Number(data.pages)"
            :key="page"
            :class="{current: data.current == page, undisable: data.current == page}"
            :title="'第'+page+'页'"
            href="#"
            @click.prevent="gotoPage(page)">{{ page }}</a>

          <a
            :class="{undisable: !data.hasNext}"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)">末页</a>

          <div class="clear"/>
        </div>
      </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>

import teacherApi from '@/api/teacher'

export default {


  //异步调用请求，进入页面不会立即去请求，而是当操作请求的时候才会调用,只会调用一次；1,8表示第一页，共8条
  //params : 表示this.$route.params.id 等于 params.id
  //error : 异步请求出现错误
  asyncData({ params , error }) {

    return teacherApi.getTeacherList(1,8).then(response =>{
        //此处相当于 this.data =  response.data.data
        // data () {
        //   return {
        //     data: []
        //   }
        // },
        return {data : response.data.data}
    })
  },

  methods:{
    //分页切换的方法
    //参数是页码数
    gotoPage(page) {
      teacherApi.getTeacherList(page,8)
        .then(response => {
          this.data = response.data.data
        })
    }
  }

};
</script>
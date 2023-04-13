<template>
  <div>
    <Editor :id="myedit" v-model="content" :init="init" :disabled="disabled"></Editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，
import Editor from '@tinymce/tinymce-vue' //编辑器引入
import 'tinymce/themes/silver/theme' //编辑器主题
import 'tinymce/icons/default' //引入编辑器图标icon
import 'tinymce/models/dom'
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/image' //插入编辑图片
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/wordcount' // 字数统计
import 'tinymce/plugins/table'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'
import {ref, watch} from "vue";

export default {
  components: {
    Editor
  },
  name: "blogEditor",
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
          ' preview  autolink fullscreen image link media table charmap advlist lists wordcount',
    },
    toolbar: {
      type: [String, Array],
      default:
          'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                  styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                  table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs',
    },
    height: {
      type: Number,
      default: 500,
    },
  },
  emits: {'update:modelValue': null},
  setup(props, context) {
    const init = {
      language_url: 'tinymce/langs/zh-Hans.js', //引入语言包文件
      language: 'zh_CN', //语言类型
      skin_url: 'tinymce/skins/ui/oxide', //皮肤：浅色
      plugins: props.plugins, //插件配置
      // toolbar: props.toolbar, //工具栏配置，设为false则隐藏
      toolbar_mode: 'sliding',
      menubar: 'file edit insert view format table tools', //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
      menu: {
        edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
        insert: {title: '插入', items: 'link image  |  hr'},
        view: {title: '查看', items: 'visualaid'},
      },
      fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
      font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

      height: props.height, //注：引入autoresize插件时，此属性失效
      placeholder: '在这里输入文字',
      branding: false, //tiny技术支持信息是否显示
      resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
      statusbar: false, //最下方的元素路径和字数统计那一栏是否显示
      elementpath: false, //元素路径是否显示
      content_style: 'img {max-width:100%;}', //直接自定义可编辑区域的css样式
      images_upload_handler: (blobInfo, success, failure) => {
        const img = 'data:image/jpeg;base64,' + blobInfo.base64();
        success(img);
      },
    };
    tinymce.init; // 初始化
    const revert_data = content => {
      console.log(content)
      context.emit('update:modelValue', content);
    };
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    function onClick(e) {
      this.$emit('onClick', e, tinymce);
    }

    // 可以添加一些自己的自定义事件，如清空内容
    function clear() {
      this.contentValue = '';
    }

    const setEditMode = type => {
      tinymce.editors['myedit'].setMode(type); //开启只读模式
    };
    const content = ref();
    watch(
        () => props.modelValue,
        (initInfo, prevInitInfo) => {
          content.value = props.modelValue;
        },
    );
    watch(
        () => content.value,
        (initInfo, prevInitInfo) => {
          revert_data(content);
        },
    );
    return {
      content,
      init,
      revert_data,
      onClick,
      clear,
      setEditMode,
    };
  }
}
</script>

<style scoped>

</style>
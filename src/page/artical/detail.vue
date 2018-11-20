<template>
    <div style="width: 100%;box-sizing: border-box;">
      <div style="width: 100%;border-bottom: 1px solid #f0f0f0;">
        <img style="width: 80px;height: 50px;margin: 10px;overflow: hidden;cursor: pointer;"
             v-on:click="onClickIcon"
             src="../../assets/Onety.png"/>
      </div>
      <div class="artical-body">
        <ArticalHeader :artical-data="articalData"></ArticalHeader>
        <div v-if="html"
             class="content-body">
          <span v-if="html"
                v-html="html"></span>
        </div>
        <div v-else
             style="margin-top: 40px;"
             v-loading="loading"
             element-loading-text="客官稍等..."></div>
        </div>
      </div>

</template>

<script>
  import ArticalHeader from '../../components/ArticalHeader'
  import {request, URLDefines} from '../../api/api'
  export default {
    name: "detail",
    data: function () {
      return {
        articalData: {},
        loading: true,
      }
    },
    computed: {
      html () {
        return this.articalData.htmlText
      }
    },
    components: {ArticalHeader},
    methods: {
      onClickIcon () {
        this.$router.push('/home')
      },
      getData () {
        this.loading = true
        if (!this.$route.params.articalId) {
          this.loading = false
          return
        }
        request({
          path: URLDefines.articalDetail,
          data: {
            id: this.$route.params.articalId
          },
          callBack: ({error, inData}) => {
            this.loading = false
            if (error) {
              this.$message.error(error.message)
              return
            }
            this.articalData = inData
          }
        })
      },
    },

    watch: {
      '$route'(to, from) {
        this.articalData = {}
        this.getData()
      },
    },
    mounted: function () {
      this.getData()
    },
  }
</script>
<!--<style type="text/css">h1{color: blue;}</style>-->
<style scoped>
  .artical-body {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 800px;
    margin: 20px auto 40px auto;
  }
  .content-body {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 40px 0 0 0;
  }

  >>> .hll { background-color: #ffffcc }
  >>> .c { color: #408080; font-style: italic } /* Comment */
  >>> .err { border: 1px solid #FF0000 } /* Error */
  >>> .k { color: #008000; font-weight: bold } /* Keyword */
  >>> .o { color: #666666 } /* Operator */
  >>> .ch { color: #408080; font-style: italic } /* Comment.Hashbang */
  >>> .cm { color: #408080; font-style: italic } /* Comment.Multiline */
  >>> .cp { color: #BC7A00 } /* Comment.Preproc */
  >>> .cpf { color: #408080; font-style: italic } /* Comment.PreprocFile */
  >>> .c1 { color: #408080; font-style: italic } /* Comment.Single */
  >>> .cs { color: #408080; font-style: italic } /* Comment.Special */
  >>> .gd { color: #A00000 } /* Generic.Deleted */
  >>> .ge { font-style: italic } /* Generic.Emph */
  >>> .gr { color: #FF0000 } /* Generic.Error */
  >>> .gh { color: #000080; font-weight: bold } /* Generic.Heading */
  >>> .gi { color: #00A000 } /* Generic.Inserted */
  >>> .go { color: #888888 } /* Generic.Output */
  >>> .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
  >>> .gs { font-weight: bold } /* Generic.Strong */
  >>> .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
  >>> .gt { color: #0044DD } /* Generic.Traceback */
  >>> .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
  >>> .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
  >>> .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
  >>> .kp { color: #008000 } /* Keyword.Pseudo */
  >>> .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
  >>> .kt { color: #B00040 } /* Keyword.Type */
  >>> .m { color: #666666 } /* Literal.Number */
  >>> .s { color: #BA2121 } /* Literal.String */
  >>> .na { color: #7D9029 } /* Name.Attribute */
  >>> .nb { color: #008000 } /* Name.Builtin */
  >>> .nc { color: #0000FF; font-weight: bold } /* Name.Class */
  >>> .no { color: #880000 } /* Name.Constant */
  >>> .nd { color: #AA22FF } /* Name.Decorator */
  >>> .ni { color: #999999; font-weight: bold } /* Name.Entity */
  >>> .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
  >>> .nf { color: #0000FF } /* Name.Function */
  >>> .nl { color: #A0A000 } /* Name.Label */
  >>> .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
  >>> .nt { color: #008000; font-weight: bold } /* Name.Tag */
  >>> .nv { color: #19177C } /* Name.Variable */
  >>> .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
  >>> .w { color: #bbbbbb } /* Text.Whitespace */
  >>> .mb { color: #666666 } /* Literal.Number.Bin */
  >>> .mf { color: #666666 } /* Literal.Number.Float */
  >>> .mh { color: #666666 } /* Literal.Number.Hex */
  >>> .mi { color: #666666 } /* Literal.Number.Integer */
  >>> .mo { color: #666666 } /* Literal.Number.Oct */
  >>> .sa { color: #BA2121 } /* Literal.String.Affix */
  >>> .sb { color: #BA2121 } /* Literal.String.Backtick */
  >>> .sc { color: #BA2121 } /* Literal.String.Char */
  >>> .dl { color: #BA2121 } /* Literal.String.Delimiter */
  >>> .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
  >>> .s2 { color: #BA2121 } /* Literal.String.Double */
  >>> .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
  >>> .sh { color: #BA2121 } /* Literal.String.Heredoc */
  >>> .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
  >>> .sx { color: #008000 } /* Literal.String.Other */
  >>> .sr { color: #BB6688 } /* Literal.String.Regex */
  >>> .s1 { color: #BA2121 } /* Literal.String.Single */
  >>> .ss { color: #19177C } /* Literal.String.Symbol */
  >>> .bp { color: #008000 } /* Name.Builtin.Pseudo */
  >>> .fm { color: #0000FF } /* Name.Function.Magic */
  >>> .vc { color: #19177C } /* Name.Variable.Class */
  >>> .vg { color: #19177C } /* Name.Variable.Global */
  >>> .vi { color: #19177C } /* Name.Variable.Instance */
  >>> .vm { color: #19177C } /* Name.Variable.Magic */
  >>> .il { color: #666666 } /* Literal.Number.Integer.Long */

  >>> body {
    font-family: Helvetica, arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: white;
    padding: 30px; }

  >>> body > *:first-child {
    margin-top: 0 !important; }
  >>> body > *:last-child {
    margin-bottom: 0 !important; }

  >>> a { color: #4183C4; }
  >>> a.absent { color: #cc0000; }
  >>> a.anchor {
    display: block;
    padding-left: 30px;
    margin-left: -30px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0; }

  >>> h1 { margin: 20px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased;cursor: text;position: relative; }
  >>> h2 { margin: 20px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased;cursor: text;position: relative; }
  >>> h3 { margin: 20px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased;cursor: text;position: relative; }
  >>> h4 { margin: 20px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased;cursor: text;position: relative; }
  >>> h5 { margin: 20px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased;cursor: text;position: relative; }
  >>> h6 { margin: 20px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased;cursor: text;position: relative; }

  /*h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor {*/
    /*background: url("../../images/modules/styleguide/para.png") no-repeat 10px center;*/
    /*text-decoration: none; }*/

  >>> h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor {
    background: no-repeat 10px center;
    text-decoration: none; }

  >>> h1 tt { font-size: inherit; }
  >>> h1 code { font-size: inherit; }

  >>> h2 tt { font-size: inherit; }
  >>> h2 code { font-size: inherit; }

  >>> h3 tt { font-size: inherit; }
  >>> h3 code { font-size: inherit; }

  >>> h4 tt { font-size: inherit; }
  >>> h4 code { font-size: inherit; }

  >>> h5 tt { font-size: inherit; }
  >>> h5 code { font-size: inherit; }

  >>> h6 tt { font-size: inherit; }
  >>> h6 code { font-size: inherit; }

  >>> h1 {
    font-size: 28px;
    color: black; }

  >>> h2 {
    font-size: 24px;
    border-bottom: 1px solid #cccccc;
    color: black; }

  >>> h3 {
    font-size: 18px; }

  >>> h4 {
    font-size: 16px; }

  >>> h5 {
    font-size: 14px; }

  >>> h6 {
    color: #777777;
    font-size: 14px; }

  >>> p { margin: 15px 0; }
  >>> ul { margin: 15px 0; }
  >>> ol { margin: 15px 0; }
  >>> blockquote { margin: 15px 0; }
  >>> dl { margin: 15px 0; }
  >>> li { margin: 15px 0; }
  >>> table { margin: 15px 0; }
  >>> pre { margin: 15px 0; }

  /*hr {*/
    /*background: transparent url("../../images/modules/pulls/dirty-shade.png") repeat-x 0 0;*/
    /*border: 0 none;*/
    /*color: #cccccc;*/
    /*height: 4px;*/
    /*padding: 0; }*/

  >>> hr {
    background: transparent repeat-x 0 0;
    border: 0 none;
    color: #cccccc;
    height: 4px;
    padding: 0; }

  >>> body > h2:first-child {
    margin-top: 0;
    padding-top: 0; }
  >>> body > h1:first-child {
    margin-top: 0;
    padding-top: 0; }
  >>> body > h1:first-child + h2 {
    margin-top: 0;
    padding-top: 0; }
  >>> body > h3:first-child, body > h4:first-child, body > h5:first-child, body > h6:first-child {
    margin-top: 0;
    padding-top: 0; }

  >>> a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {
    margin-top: 0;
    padding-top: 0; }

  >>> h1 p { margin-top: 0; }
  >>> h2 p { margin-top: 0; }
  >>> h3 p { margin-top: 0; }
  >>> h4 p { margin-top: 0; }
  >>> h5 p { margin-top: 0; }
  >>> h6 p { margin-top: 0; }

  >>> li p.first {
    display: inline-block; }

  >>> ul { padding-left: 30px; }
  >>> ol { padding-left: 30px; }

  >>> ul :first-child { margin-top: 0; }
  >>> ol :first-child { margin-top: 0; }

  >>> ul :last-child { margin-top: 0; }
  >>> ol :last-child { margin-top: 0; }

  >>> dl { padding: 0; }
  >>> dl dt {
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    padding: 0;
    margin: 15px 0 5px; }
  >>> dl dt:first-child {
    padding: 0; }
  >>> dl dt > :first-child {
    margin-top: 0; }
  >>> dl dt > :last-child {
    margin-bottom: 0; }
  >>> dl dd {
    margin: 0 0 15px;
    padding: 0 15px; }
  >>> dl dd > :first-child {
    margin-top: 0; }
  >>> dl dd > :last-child {
    margin-bottom: 0; }

  >>> blockquote {
    border-left: 4px solid #dddddd;
    padding: 0 15px;
    color: #777777; }
  >>> blockquote > :first-child {
    margin-top: 0; }
  >>> blockquote > :last-child {
    margin-bottom: 0; }

  >>> table {
    padding: 0; }
  >>> table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0; }
  >>> table tr:nth-child(2n) {
    background-color: #f8f8f8; }
  >>> table tr th {
    font-weight: bold;
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px; }
  >>> table tr td {
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px; }
  >>> table tr th :first-child, table tr td :first-child {
    margin-top: 0; }
  >>> table tr th :last-child, table tr td :last-child {
    margin-bottom: 0; }

  >>> img {
    max-width: 100%; }

  >>> span.frame {
    display: block;
    overflow: hidden; }
  >>> span.frame > span {
    border: 1px solid #dddddd;
    display: block;
    float: left;
    overflow: hidden;
    margin: 13px 0 0;
    padding: 7px;
    width: auto; }
  >>> span.frame span img {
    display: block;
    float: left; }
  >>> span.frame span span {
    clear: both;
    color: #333333;
    display: block;
    padding: 5px 0 0; }
  >>> span.align-center {
    display: block;
    overflow: hidden;
    clear: both; }
  >>> span.align-center > span {
    display: block;
    overflow: hidden;
    margin: 13px auto 0;
    text-align: center; }
  >>> span.align-center span img {
    margin: 0 auto;
    text-align: center; }
  >>> span.align-right {
    display: block;
    overflow: hidden;
    clear: both; }
  >>> span.align-right > span {
    display: block;
    overflow: hidden;
    margin: 13px 0 0;
    text-align: right; }
  >>> span.align-right span img {
    margin: 0;
    text-align: right; }
  >>> span.float-left {
    display: block;
    margin-right: 13px;
    overflow: hidden;
    float: left; }
  >>> span.float-left span {
    margin: 13px 0 0; }
  >>> span.float-right {
    display: block;
    margin-left: 13px;
    overflow: hidden;
    float: right; }
  >>> span.float-right > span {
    display: block;
    overflow: hidden;
    margin: 13px auto 0;
    text-align: right; }

  >>> code {
    margin: 0 2px;
    padding: 0 5px;
    white-space: nowrap;
    border: 1px solid #eaeaea;
    background-color: #f8f8f8;
    border-radius: 3px; }

  >>> tt {
    margin: 0 2px;
    padding: 0 5px;
    white-space: nowrap;
    border: 1px solid #eaeaea;
    background-color: #f8f8f8;
    border-radius: 3px; }

  >>> pre code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent; }

  >>> .highlight pre {
    background-color: #f8f8f8;
    border: 1px solid #cccccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px; }

  >>> pre {
    color: lawngreen;
    background-color: black;
    border: 1px solid #cccccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px; }
  >>> pre code, pre tt {
    background-color: transparent;
    border: none; }

</style>

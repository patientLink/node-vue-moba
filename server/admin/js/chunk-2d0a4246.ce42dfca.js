(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a4246"],{"04d0":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"about"},[r("h1",[e._v(e._s(e.id?"编辑":"新建")+"文章")]),r("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[r("el-form-item",{attrs:{label:"所属分类"}},[r("el-select",{attrs:{multiple:""},model:{value:e.model.categories,callback:function(t){e.$set(e.model,"categories",t)},expression:"model.categories"}},e._l(e.categories,(function(e){return r("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),r("el-form-item",{attrs:{label:"标题"}},[r("el-input",{model:{value:e.model.title,callback:function(t){e.$set(e.model,"title",t)},expression:"model.title"}})],1),r("el-form-item",{attrs:{label:"详情"}},[r("VueEditor",{attrs:{useCustomImageHandler:""},on:{"image-added":e.handleImageAdded},model:{value:e.model.body,callback:function(t){e.$set(e.model,"body",t)},expression:"model.body"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("保存")])],1)],1)],1)},n=[],s=(r("96cf"),r("1da1")),o=r("5873"),i={props:{id:{}},data:function(){return{model:{},categories:[]}},components:{VueEditor:o["a"]},methods:{save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=6;break}return t.next=3,e.$http.put("rest/articles/".concat(e.id),e.model);case 3:r=t.sent,t.next=9;break;case 6:return t.next=8,e.$http.post("rest/articles",e.model);case 8:r=t.sent;case 9:console.log(r),e.$router.push("/articles/list"),e.$message({type:"success",message:"保存成功"});case 12:case"end":return t.stop()}}),t)})))()},fetch:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/articles/".concat(e.id));case 2:r=t.sent,console.log(r.data),e.model=r.data;case 5:case"end":return t.stop()}}),t)})))()},fetchCategories:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/categories");case 2:r=t.sent,e.categories=r.data;case 4:case"end":return t.stop()}}),t)})))()},handleImageAdded:function(e,t,r,a){var n=this;return Object(s["a"])(regeneratorRuntime.mark((function s(){var o,i;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return o=new FormData,o.append("file",e),s.next=4,n.$http.post("upload",o);case 4:i=s.sent,t.insertEmbed(r,"image",i.data.url),a();case 7:case"end":return s.stop()}}),s)})))()}},created:function(){this.fetchCategories(),this.id&&this.fetch()}},c=i,l=r("2877"),u=Object(l["a"])(c,a,n,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0a4246.ce42dfca.js.map
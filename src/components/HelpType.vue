<template>
    <div>
              <div style="background-color:#fff">
                <!--帮扶和关注类型的增减-->
                帮扶类型
                <el-tag :key="tag.name" v-for="tag in dynamicHelpTags" closable :disable-transitions="false" @close="handleCloseHelp(tag)">
                  {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisibleOne" v-model="inputValueOne" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirmOne"
                  @blur="handleInputConfirmOne">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInputOne">+ 新帮扶类型</el-button>
              </div>

              <!--里面包含了修改信息的关注类型-->
              <div style="background-color:#fff;margin:auto">
                关注类型
                <div style="display:inline-block;margin-left:20px;" v-for="(tag,index) in dynamicAttentionTags" :key="index" v-on:dblclick="showInputMod(tag)">
                  <el-tag closable class="input-new-tag" v-if="tag.visible" :disable-transitions="false" @close="handleCloseAttention(tag)">
                    {{tag.name}}
                  </el-tag>
                  <el-input class="input-new-tag" v-if="!tag.visible" v-model="inputValueMod" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirmTwo"
                    @blur="handleInputConfirmMod(tag)">
                  </el-input>
                </div>

                <el-input class="input-new-tag" v-if="inputVisibleTwo" v-model="inputValueTwo" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirmTwo"
                  @blur="handleInputConfirmTwo(tag)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInputTwo">+ 新关注类型</el-button>
              </div>
            </div>
</template>

<script>
export default {
    data(){
        return {
            inputValueTwo: '',
            //帮扶标签
        dynamicHelpTags: ['标签一', '标签二', '标签三'],
        inputVisibleOne: false,
        //关注列表（添加修改
        dynamicAttentionTags: [
            {name:'标签三',visible:true,index:0},
            {name:'标签二',visible:true,index:1},
            {name:'标签一',visible:true,index:2},
        ],
        inputVisibleTwo: false,
        }
    },
    methods:{
        //下面两个函数主要是处理修改关注类型
        showInputMod: function (tag) {
            this.dynamicAttentionTags[tag.index].visible = false;
            this.inputValueMod = tag.name;
        },
        handleInputConfirmMod: function (iden) {
            console.log(iden.index);
            let inputValueMod = {
                name:'',visible:true,index:iden.index
            };
            inputValueMod.name = this.inputValueMod;
            
            this.dynamicAttentionTags[iden.index] = inputValueMod;

            this.inputValueMod = '';
        },
        handleInputConfirmOne: function () {
            let inputValueOne = this.inputValueOne;
            if (inputValueOne) {
                this.dynamicHelpTags.push(inputValueOne);
            }
            //11、添加帮扶类型
            this.postData('http://180.76.249.233:8080/newhelp/api/helpType', inputValueOne, "POST")
            .then(data => {
                console.log(data.data);
                this.data.helpTagTable = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.inputVisibleOne = false;
            this.inputValueOne = '';
        },
        handleInputConfirmTwo: function () {
            let inputValueTwo = {
                name:'',visible:true,index:0
            }
            for(var i in this.dynamicAttentionTags){
                inputValueTwo.index = i+1;
            }
            inputValueTwo.name = this.inputValueTwo;
            if (inputValueTwo) {
                this.dynamicAttentionTags.push(inputValueTwo);
            }
            console.log(this.dynamicAttentionTags);
            //14、添加关注类型
            this.postData('http://180.76.249.233:8080/newhelp/api/attentionType', inputValueTwo, "POST")
            .then(data => {
                console.log(data.data);
                this.data.helpTagTable = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.inputVisibleTwo = false;
            this.inputValueTwo = '';
        },
        handleCloseHelp: function (tag) {//删除帮扶类型
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            console.log(tag);

            //12、删除帮扶类型
            var url = "newhelp/api/historyArchive/" + tag.name;
            this.postData(url, {}, "GET")
                .then(data => {
                    console.log(data.data)
                }) // JSON from `response.json()` call
                .catch(error => console.error(error));
        },
        postData(url, data, method) {//使用fetch进行发送数据
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
},
        showInputOne: function () {
            this.inputVisibleOne = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        showInputTwo: function () {
            this.inputVisibleTwo = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleCloseAttention: function (tag) {//删除关注类型
            //16、删除关注类型
            var url = "newhelp/api/attentionType/" + tag.name;
            this.postData(url, {}, "GET")
            .then(data => {
                console.log(data.data)
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.dynamicAttentionTags.splice(this.dynamicAttentionTags.indexOf(tag), 1);
        },
    }
}
</script>


<style scoped>
.input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: middle;
    }
</style>

<template>
    <div id="main">
    <div>
      <!--学生块-->
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-container>
          <!--主体部分-->

          <el-main>
            <!--建档历史-->

            <div v-if="sign===2" class="signTwo">
              <!--新建建档-->
              <el-button style="float:right;margin:20px;" type="text" @click="createTableVisible = true">导入</el-button>
              <div class="newType">
              
              <el-row class="demo-autocomplete">
                <el-input class="inline-input" placeholder="姓名" v-model="input10" clearable>
                </el-input>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-input class="inline-input" placeholder="学号" v-model="input9" clearable>
                </el-input>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-input class="inline-input" placeholder="记录时间" v-model="input8" clearable>
                </el-input>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-input class="inline-input" placeholder="地点" v-model="input7" clearable>
                </el-input>
              </el-row>
              
              <el-row class="demo-autocomplete">
                <el-input class="inline-input" placeholder="记录者" clearable>
                </el-input>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-input class="inline-input" placeholder="记录者" clearable>
                </el-input>
              </el-row>
              
                <el-input class="inline-textarea" type="textarea" :rows="3" placeholder="请输入">
                </el-input>
              
              
              
                <el-input class="inline-textarea" type="textarea" :rows="3" placeholder="请输入">
                </el-input>
            </div>
            </div>

            <div v-else-if="sign===3">
              <!--建档历史列表-->
              <el-table :data="record_table">
                <el-table-column v-for="record in record_table_attitude" :prop="record.prop" :label="record.label">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="190">
                  <div slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="更改记录人" placement="top-end">
                      <el-button @click="change_recorder(scope.row)" size="small" icon="el-icon-document
                    "></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="修改记录" placement="top-start">
                      <el-button @click="change_record_inf(scope.row)" icon="el-icon-edit
                    " size="small"></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                      <el-button @click="delRecordDialog = true " icon="el-icon-delete
                    " size="small"></el-button>
                    </el-tooltip>
                  </div>
                </el-table-column>
              </el-table>
            </div>
            <div v-else-if="sign===4">
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
                <div style="display:inline-block;margin-left:20px;" v-for="tag in dynamicAttentionTags" v-on:dblclick="showInputMod(tag)">
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
            
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
          sign: 4,
          changeRecorderDialog: false,//更改记录人的框
          changeRecordDialog: false,//更改记录
          delRecordDialog: false,
          createTableVisible:false,
          //帮扶列表
          helpTagTable: [
              {
                  helpTypeId: "",
                  helpTypeName: ""
              }],
          students:[],
          guideStudent:'',
          inputValueOne: '',
          inputVisibleMod: false,
          inputValueMod: '',
          //
          stateName:'',
          //新增记录的属性
          newRecordAttribute:[
              {placeholder:''},

          ],
          input7:'',
          input8:'',
          input9:'',
          input10:'',
          //更改记录人中的时间
          pickerOptions1: {
              shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                      picker.$emit('pick', new Date());
                  }
              }, {
                  text: '昨天',
                  onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                  }
              }, {
                  text: '一周前',
                  onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                  }
              }]
          },
          recordForm: {
              name: '',
              changeTime: '',
              recorderNow: '',
              changeReason: ''
          },
          allType:[
              "一般困难","非常困难","特别困难"
          ],
          diffType:'',
          newformInline: {
              studentId: "",
              recordName: "",
              recordTime: "",
              location: "",
              witness: "",
              recorder: "",
              participant: "",
              way: "",
              content: "",
              comment: "",
          },
          //历史帮扶学生详细信息
          beforeStuInfDetail:
              [//总历史困难学生详细数据
                  {
                      studentId: "",
                      sex: "",
                      name: "",
                      major: "",
                      grade: "",
                      studentClass: "",
                      ethnicGroup: "",
                      duty: "",
                      dormitory: "",
                      birthOrigin: "",
                      familyAddress: "",
                      contactWay: "",
                      familyTelNumber: "",
                      fatherTelNumber: "",
                      motherTelNumber: "",
                      familyCondition: "",
                      studyCondition: "",
                      healthCondition: "",
                      lifeCondition: "",
                      otherCondition: "",
                      bulidingBasis: "",
                      bulidingRecorder: "",
                      bulidingTime: "",
                      destoryingBasis: "",
                      destoryingRecorder: "",
                      destoryingTime: "",
                      bulidingPerson: "",
                      bulidingPersonDuty: "",
                      helpType: "",
                      attentionType: "",
                      lastRecordTime: "",
                      historyRecorderChanges:
                          [
                              {
                                  changeTime: "",
                                  recorderNow: "",
                                  changeReason: ""
                              },

                          ]
                  },
              ]
          }
    },
    methods: {
        ReplaceSensitivityChar(str) {//防止XSS
    var s = str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\'/g, "&#39;")
        .replace(/\"/g, "&quot;");
    return s;
},
        postData(url, data, method) {//使用fetch进行发送数据
    // Default options are marked with *
    return fetch(url, {
        // body: JSON.stringify(data), // must match 'Content-Type' header
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
        
       
       
        


        
        //下面是自动补全input框的具体实现函数
        querySearch(queryString, cb) {
            var students = this.students;
            var results = queryString ? students.filter(this.createFilter(queryString)) : students;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          createFilter(queryString) {
            return (student) => {
              return (student.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          loadAll() {
            return [
              { "studentId": "2016220302001", "name": "chen" },
              { "studentId": "2016223302001", "name": "chenhao" },
              { "studentId": "2016220301001", "name": "chen1" },
              { "studentId": "2016220302501", "name": "chen2" }
            ];
          },
          handleSelect(item) {
            console.log(item);
          }
    }
}
</script>

<style scoped>

 .el-form-item {
      width: 50%;
      position: relative;
      left: 25%;
    }

    body>.el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }

    .el-form-item {
      display: flex;
      justify-content: flex-start;
    }

    .chooseTap {
      width: 50%;
      position: relative;
      /*border: black solid 1px;*/
      left: 25%;
      flex-direction: column;
    }

    .discuss {
      width: 80%;
      position: relative;
      margin: 3%;
      /*border: black solid 1px;*/
      background: #D3DCE6;
    }

    .discuss .dialogue {
      height: 500px;
      width: 94%;
      background: #fff;
      float: left;
    }

    .el-tag+.el-tag {
      margin-left: 10px;
    }

    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: middle;
    }

    .demo-autocomplete {
      display: inline-block;
    }

    .inline-input {
      width: 80%;
      padding: 20px;
    }
    .inline-textarea {
      width: 40%;
      padding: 20px;
    }
    .signTwo {
      background-color: #fff;
    }

    .my-autocomplete {
      line-height: normal;
      padding: 7px;


    }

    .my-autocomplete .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .my-autocomplete .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .my-autocomplete .highlighted .addr {
      color: #ddd;
    }
    .el-row{/*
      height: 100px;
      /*border: solid 1px black;*/
      /*margin-bottom: 10px;*/
    }
    .newType{
      height: 500px;
      /*border: solid 1px black;*/
    }
    /*span{
      font-size: 30px;
      width:50%;
      display:flex;margin-top:10px;left:20%;position:relative;
    }*/

  </style>
<template>
    <div>
        <div v-if="sign === 1 ">
        <!--查询块-->
              <el-popover placement="bottom" style="position:relative" width="auto" trigger="click">
                <div class="search-group">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="学院">
                      <el-select v-model="formInline.college">
                        <el-option label="信息与软件工程学院" value="信息与软件工程学院"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                      <el-select v-model="formInline.grade">
                        <el-option label="2018" value="2018"></el-option>
                        <el-option label="2017" value="2017"></el-option>
                        <el-option label="2016" value="2016"></el-option>
                        <el-option label="2015" value="2015"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                      <el-input v-model="formInline.class" placeholder="如:20162203"></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                      <el-select v-model="formInline.major">
                        <el-option v-for="major in allMajor" :label='major' :value="major" :key="major"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="面貌">
                      <el-select v-model="formInline.identity">
                        <el-option v-for="(identity,index) in allIdentities" :label='identity' :value="identity" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                      <el-input v-model="formInline.studenID" placeholder="如:2016220301001"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯">
                      <el-select v-model="formInline.province">
                        <el-option v-for="province in allProvinces" :label='province' :value="province" :key="province"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="民族">
                      <el-select v-model="formInline.nation">
                        <el-option v-for="nation in allNations" :label='nation' :value="nation" :key="nation"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-select v-model="formInline.sex">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" item-width="100%" @click="findHistoryTable()">查询</el-button>
                    </el-form-item>
                  </el-form>
                </div>

                <div slot="reference" class="search-btn" type="primary">查询</div>
              </el-popover>
              <!--查看总体的记录-->
              <el-table :data="beforStuInfTable">
                <el-table-column v-for="data in archivedStudentTable" :prop="data.prop" :label="data.label">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="160">
                  <div slot-scope="scope">
                    <el-button @click="OpClick(scope.row)" type="text" size="small">操作</el-button>
                    <el-button @click="ChClick(scope.row)" type="text" size="small">更改記錄人</el-button>
                  </div>
                </el-table-column>
              </el-table>
        </div>
              
              <div class="innerOp" v-else-if="sign === 2">
                <i class="el-icon-back" @click="sign = 1"></i>
                姓名：{{mockStuName}}
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="联系简易记录表" name="first">
                    联系简易记录表
                  </el-tab-pane>
                  <el-tab-pane label="面谈记录表" name="second">
                    面谈记录表
                  </el-tab-pane>
                  <el-tab-pane label="家长联系记录表" name="third">家长联系记录表</el-tab-pane>
                  <el-tab-pane label="研讨及总结记录" name="fourth">研讨及总结记录</el-tab-pane>
                  <el-tab-pane label="学生档案" name="fifth">学生档案</el-tab-pane>
                  
                </el-tabs>
                <el-table :data="recordTable" v-if="table_sign === 1">
                      <el-table-column v-for="data in record_table" :prop="data.prop" :label="data.label">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="160">
                        <el-button @click="ChClick(scope.row)" type="text" size="small">更改記錄人</el-button>
                      </el-table-column>
                </el-table>
                <!--此处新增-->
                <el-col :span="18" v-if="table_sign === 2">

                  <div class="sub-title" >
                    <lable>studentId:</lable><el-input  v-model="stuDetailInf.studentId"/>
                    <lable>sex:</lable><el-input  v-model="stuDetailInf.sex"/>
                    <lable>name:</lable><el-input  v-model="stuDetailInf.name"/>
                    <lable>major:</lable><el-input  v-model="stuDetailInf.major"/>
                    <lable>grade:</lable><el-input  v-model="stuDetailInf.grade"/>
                    <lable>studentClass:</lable><el-input  v-model="stuDetailInf.studentClass"/>
                    <lable>politicalStatus:</lable><el-input  v-model="stuDetailInf.politicalStatus"/>
                    <lable>ethnicGroup:</lable><el-input  v-model="stuDetailInf.ethnicGroup"/>
                    <lable>duty:</lable><el-input  v-model="stuDetailInf.duty"/>
                    <lable>dormitory:</lable><el-input  v-model="stuDetailInf.dormitory"/>
                    <lable>birthOrigin:</lable><el-input  v-model="stuDetailInf.birthOrigin"/>
                    <lable>familyAddress:</lable><el-input  v-model="stuDetailInf.familyAddress"/>
                    <lable>contactWay:</lable><el-input  v-model="stuDetailInf.contactWay"/>
                    <lable>familyTelNumber:</lable><el-input  v-model="stuDetailInf.familyTelNumber"/>
                    <lable>fatherTelNumber:</lable><el-input  v-model="stuDetailInf.fatherTelNumber"/>
                    <lable>motherTelNumber:</lable><el-input  v-model="stuDetailInf.motherTelNumber"/>
                    <lable>familyCondition:</lable><el-input  v-model="stuDetailInf.familyCondition"/>
                    <lable>studyCondition:</lable><el-input  v-model="stuDetailInf.studyCondition"/>
                    <lable>healthCondition:</lable><el-input  v-model="stuDetailInf.healthCondition"/>
                    <lable>lifeCondition:</lable><el-input  v-model="stuDetailInf.lifeCondition"/>
                    <lable>otherCondition:</lable><el-input  v-model="stuDetailInf.otherCondition"/>
                    <lable>bulidingBasis:</lable><el-input  v-model="stuDetailInf.bulidingBasis"/>
                    <lable>bulidingRecorder:</lable><el-input  v-model="stuDetailInf.bulidingRecorder"/>
                    <lable>bulidingTime:</lable><el-input  v-model="stuDetailInf.bulidingTime"/>
                    <lable>bulidingPerson:</lable><el-input  v-model="stuDetailInf.bulidingPerson"/>
                    <lable>bulidingPersonDuty:</lable><el-input  v-model="stuDetailInf.bulidingPersonDuty"/>
                    <lable>helpType:</lable><el-input  v-model="stuDetailInf.helpType"/>
                    <lable>attentionType:</lable><el-input  v-model="stuDetailInf.attentionType"/>
                  </div>
                  <div>
                    <el-input
                      width="100%"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea">
                    </el-input>
                  </div>
                  <el-button type="success" @click="modifyStuInf" icon="el-icon-check" circle></el-button>
                  <el-button type="danger" @click="" icon="el-icon-delete" circle></el-button>
                </el-col>
              </div>
    </div>

           
</template>

<script>
export default {
  data() {
    return {
      ip:'http://180.76.249.233:8080',
      sign:1,
      //进入之后的列表显示问题
      table_sign:2,
      activeName: 'fifth',
      mockStuName:"",
      mockStuId:"",
      textarea:"",
      //进入之后的
      recordTable:[],
      formInline: {
        college: "",
        grade: "",
        major: "",
        class: "",
        identity: '',
        name: "",
        studentID: "",
        province: "",
        nation: "",
        sex: ""
      },
      record_table: [
        /*{
          recordId: "2016",
          recordName: "陈",
          recordTime: "2018-01-01",
          location: "",
          witness: "",
          recorder: "",
          participant: "",
          way: "",
          content: "",
          comment: "",
        },*/
            { label: '记录号', prop: "recordId", show: true },
            { label: '记录名', prop: "recordName",show:true},
            { label: '记录时间', prop: "recordTime", show: true },
            { label: '地点', prop: "location", show: true },
            { label: '观察者', prop: "witness", show: true },
            { label: '记录者', prop: "recorder", show: true },
            { label: '参与者', prop: "participant", show: true },
            { label: '方式', prop: "way", show: true },
            { label: '内容', prop: "content", show: true },
            { label: '评论', prop: "comment", show: true }
      ],
      allMajor: [
        "信息工程", "软件技术", "嵌入式系统", "网络安全工程", "大型主机", "信息与获取", "数字动漫", "留学生", "工业产品计算机", "数字信息处理", "互联网+", "互联网安全", "国际班", "英文授课留学生"
      ],
      allIdentities: [
        "中共党员", "共青团员", "预备党员", "积极分子", "群众"
      ],
      allProvinces: ["四川省", "河北省", "山西省", "吉林省", "辽宁省", "黑龙江省", "陕西省", "甘肃省", "青海省", "山东省",
        "福建省", "浙江省", "河南省", "湖北省", "湖南省", "江西省", "江苏省", "安徽省", "广东省", "海南省", "贵州省", "云南省",
        "北京", "上海", "重庆", "天津", "内蒙古", "新疆", "宁夏", "广西", "西藏", "台湾", "香港", "澳门"
      ],
      allNations: ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族",
        "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族",
        "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族",
        "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族",
        "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
      ],
      //建档学生列表
      archivedStudentTable:[
            { label: '学号', prop: "studentId", show: true },
            { label: '性别', prop: "sex",show:true},
            { label: '姓名', prop: "name", show: true },
            { label: '专业', prop: "major", show: true },
            { label: '年级', prop: "grade", show: true },
            { label: '政治面貌', prop: "politicalStatus", show: true },
            { label: '班级', prop: "studentClass", show: true },
            { label: '民族', prop: "ethnicGroup", show: true },
            { label: '联系方式', prop: "contactWay", show: true },
            { label: '家庭电话', prop: "familyTelNumber", show: true },
            { label: '创建时间', prop: "bulidingTime", show: true },
            { label: '帮扶方式', prop: "helpType", show: true },
            { label: '关注类型', prop: "attentionType", show: true },
            { label: '上次记录时间', prop: "lastRecordTime", show: true },
            { label: '高亮', prop: "highlight", show: true },
      ],

      //建档学生详细信息
      stuDetailInf:{
        /*
        {
          "studentId":,
          "sex":,
          "name":,
          "major":,
          "grade":,
          "studentClass":,
          "politicalStatus":,
          "ethnicGroup":,
          "duty":,
          "dormitory":,
          "birthOrigin":,
          "familyAddress":,
          "contactWay":,
          "familyTelNumber":,
          "fatherTelNumber":,
          "motherTelNumber":,
          "familyCondition":,
          "studyCondition":,
          "healthCondition":,
          "lifeCondition":,
          "otherCondition":,
          "bulidingBasis":,
          "bulidingRecorder":,
          "bulidingTime":,
          "bulidingPerson":,
          "bulidingPersonDuty":,
          "helpType":,
          "attentionType":,
          "recorderChanges": [
              {
                  "changeTime":,
                  "recorderNow":,
                  "changeReason": 
              }
          ]
      },
        */ 
      },




      //记录更改
      /** [
              {
                  "changeTime":,
                  "recorderNow":,
                  "changeReason": 
              }
          ] */
      recordChanges:[],
      //帮扶学生列表
      beforStuInfTable: [
        /*{
        historyArchiveId: "",
        studentId: "2016",
        sex: "男",
        name: "陈",
        major: "",
        grade: "大三",
        studentClass: "0302",
        ethnicGroup: "",
        contactWay: "电话",
        familyTelNumber: "123456",
        bulidingTime: "2018-01-01",
        helpType: "经济困难",
        attentionType: "一般关注",
        lastRecordTime: "2017-12-01"
      }*/
      ],
      //困难学生横轴属性
      straitened_stu_table: [
        { prop: "name", label: "姓名" },
        { prop: "studentId", label: "学号" }, { prop: "grade", label: "年级" }, { prop: "studentClass", label: "班级" },
        { prop: "sex", label: "性别" }, { prop: "nation", label: "民族" }, { prop: "contactWay", label: "联系方式" },
        { prop: "familyTelNumber", label: "家庭电话" }, { prop: "bulidingBasis", label: "建档类型" }, { prop: "bulidingTime", label: "建档日期" }, { prop: "attentionType", label: "关注状态" }, { prop: "destoryingTime", label: "除档时间" }
      ],
    }
  },
  created:function() {
    var that = this;
    const h = this.$createElement; 
    var token = sessionStorage.getItem("token");
    $.ajax({
        //{recordName}/{studentId}
        url: this.ip+"/newhelp/api/archiveStudents/"+sessionStorage.getItem('userName'),
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
          },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {},
        success: function (res) {
          if (res.success) {
            console.log(res.data);
            that.beforStuInfTable = res.data;
            console.log(that.beforStuInfTable);
          } else {
            that.$notify({
              title: '标题名称',
              message: h('i', { style: 'color: teal'}, '数据获取错误')
            });
          }
        },
        error: function () {
          that.$notify({
              title: '标题名称',
              message: h('i', { style: 'color: teal'}, '数据获取错误')
            })
        },
    })
  },
  methods: {
    
    /*//8、搜索历史帮扶学生列表
    findHistoryTable: function () {
      this.postData(this.ip+'/newhelp/api/historyArchives/', this.beforStuInfTable, "GET")
        .then(data => {
          console.log(data.data);
          this.data.beforStuInfTable = data.data;
        }) // JSON from `response.json()` call
        .catch(error => console.error(error));
    },*/
    handleClick(tab, event) {
      var token = sessionStorage.getItem("token");
      var that = this;
      if(tab.index == 0){
        that.table_sign = 1;
        $.ajax({
            url: this.ip+"/newhelp/api/records/联系简易记录表/"+this.mockStuId,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
              if (res.success) {
                console.log(res);
                that.recordTable = res.data;
              } else {
                that.$notify({
                  title: '联系简易记录表',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                });
              }
            },
            error: function () {
              that.$notify({
                  title: '联系简易记录表',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                })
            },
        })
      }
      else if(tab.index == 1){
        that.table_sign = 1;
        $.ajax({
            url: this.ip+"/newhelp/api/records/面谈记录表/"+this.mockStuId,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
              if (res.success) {
                console.log(res);
                that.recordTable = res.data;
              } else {
                that.$notify({
                  title: '面谈记录表',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                });
              }
            },
            error: function () {
              that.$notify({
                  title: '面谈记录表',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                })
            },
        })
      }else if(tab.index == 2){
        that.table_sign = 1;
        $.ajax({
            url: this.ip+"/newhelp/api/records/家长联系记录表/"+this.mockStuId,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
              if (res.success) {
                that.recordTable = res.data;
                console.log(res.data);
              } else {
                that.$notify({
                  title: '家长联系记录表',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                });
              }
            },
            error: function () {
              that.$notify({
                  title: '家长联系记录表',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                })
            },
        })
      }else if(tab.index == 3){
        that.table_sign = 1;
        $.ajax({
            url: this.ip+"/newhelp/api/records/研讨及总结记录/"+this.mockStuId,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
              if (res.success) {
                console.log(res);
               that.recordTable = res.data;
              } else {
                that.$notify({
                  title: '研讨及总结记录',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                });
              }
            },
            error: function () {
              that.$notify({
                  title: '研讨及总结记录',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                })
            },
        })
      }else if(tab.index == 4){
        that.table_sign = 2;
         $.ajax({
            //{studentId}
            url: this.ip+'/newhelp/api/archiveStudent/'+this.mockStuId,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: that.toBeSentKeywords,
            success: function (res) {
              if (res.success) {
                that.stuDetailInf = res.data;
                that.recordChanges = that.stuDetailInf.recorderChanges;
              } else {
                that.$notify({
                  title: '标题名称',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                });
              }
            },
            error: function () {
              that.$notify({
                  title: '标题名称',
                  message: h('i', { style: 'color: teal'}, '数据获取错误')
                })
            },
        })
      }
        console.log(tab, event);
    },
    OpClick:function(row){
      var token = sessionStorage.getItem("token");
      console.log(row);
      this.mockStuName = row.name;
      this.mockStuId = row.studentId;
      this.sign = 2;
      var that = this;
      //获取这个学生的基本信息
      $.ajax({
        //{studentId}
        url: this.ip+'/newhelp/api/archiveStudent/'+this.mockStuId,
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: that.toBeSentKeywords,
        success: function (res) {
          if (res.success) {
            that.stuDetailInf = res.data;
            that.recordChanges = that.stuDetailInf.recorderChanges;
          } else {
            that.$notify({
              title: '标题名称',
              message: h('i', { style: 'color: teal'}, '数据获取错误')
            });
          }
        },
        error: function () {
          that.$notify({
              title: '标题名称',
              message: h('i', { style: 'color: teal'}, '数据获取错误')
            })
        },
    })
    },
    ChClick:function(row){
      var that = this;
      const h = this.$createElement;
      this.$prompt('请输入联系人', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          ///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
          inputPattern: /[a-y]?/,
          inputErrorMessage: '联系人格式不正确'
        }).then(
          ({ value }) => {
              this.$message({
                type: 'success',
                message: '更改完联系人是: ' + value
              });
              that.changePeople = value;
              that.$prompt('请输入原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                ///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
                inputPattern: /[a-y]?/,
                inputErrorMessage: '原因格式不正确'
              }).then(({ value }) => {
                this.$message({
                  type: 'success',
                  message: '你的原因是: ' + value
                });
                var token = sessionStorage.getItem("token");
                console.log(token);
                $.ajax({
                    //{newTeacherId}
                    url: that.ip+"/newhelp/api/change/"+ that.changePeople,
                    type: "POST",
                    beforeSend: function (request) {
                      request.setRequestHeader("Authorization", token);
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({studentId: that.mockStuId,
                          changeReason: value}),
                    success: function (res) {
                      if (res.success) {
                        console.log('成功');
                        that.record_table = res.data.data;
                      } else {
                        console.log(res);
                        that.$notify({
                          title: '标题名称',
                          message: h('i', { style: 'color: teal'}, '变更失败')
                        });
                      }
                    },
                    error: function () {
                      console.log('失败');
                    },
                })
                
              })/*.catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入1'
                });       
              })*/;
              
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入2'
          });       
        });
    }
  },
  
}
</script>


<style scoped>
.search-btn {
  background-color: white;
  font-size: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
}
.el-form-item {
  width: 50%;
  position: relative;
  left: 25%;
  display: flex;
  justify-content: flex-start;
}
.innerOp{
  margin: 20px;
}
.sub-title{
  display: flex;
  margin: 5px;
  padding: 10px;
}
.sub-title el-input{
  width: 100px;
  justify-content: space-between;
}
</style>

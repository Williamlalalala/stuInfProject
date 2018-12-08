<template>
     <div>
              <!--建档历史列表-->
              <el-table :data="history_records">
                <el-table-column v-for="(record,index) in history_table_attitude" :key="index" :prop="record.prop" :label="record.label">
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
      <!--提示删除-->
        <!--<el-dialog title="提示" :visible.sync="delRecordDialog" width="30%" :before-close="handleClose">
          <span>确定删除吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delRecordDialog = false">取 消</el-button>
            <el-button type="primary" @click="delRecordDialog = false">确 定</el-button>
          </span>
        </el-dialog>-->
        <!--修改记录-->
        <!--<el-dialog title="修改记录" :visible.sync="changeRecordDialog">
          <el-form :model="recordInfForm">
            <el-form-item label="更新记录ID" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.recordId" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.recordTime" :placeholder="tempRecordInf.recordTime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="更新地点" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.location" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="目击人" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.witness" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="记录人" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.recorder" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="参与者" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.participant" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="方式" :label-width="formLabelWidth">
              <el-input v-model="recordInfForm.way" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="recordInfForm.content">
              </el-input>
            </el-form-item>
            <el-form-item label="评论" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="recordInfForm.comment">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changeRecordDialog = false">取 消</el-button>
            <el-button type="primary" @click="changeRecordDialog = false">确 定</el-button>
          </div>
        </el-dialog>-->
        <!--修改记录人-->
        <!--<el-dialog title="更改记录人" :visible.sync="changeRecorderDialog">
          <el-form :model="recordForm">
            <el-form-item label="更新后的学号" :label-width="formLabelWidth">
              <el-input v-model="recordForm.name" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="recordForm.changeTime" type="datetime" placeholder="选择日期" align="right" :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="更新后记录人" :label-width="formLabelWidth">
              <el-input v-model="recordForm.recorderNow" :placeholder="tempRecordInf.recordName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="更新原因" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="recordForm.changeReason">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changeRecorderDialog = false">取 消</el-button>
            <el-button type="primary" @click="changeRecorderDialog = false">确 定</el-button>
          </div>
        </el-dialog>-->
        
      </div>
      
</template>

<script>
export default {
  data() {
    return {
      ip:'http://180.76.249.233:8080',
      formLabelWidth: "100px",
      changeRecorderDialog: false,//更改记录人的框
      changeRecordDialog: false,//更改记录
      delRecordDialog: false,
      createTableVisible: false,
      //记录列表
      history_records:[],
      
      //记录历史属性
      history_table_attitude: [
        { prop: "historyArchiveId", label: "historyArchiveId" },
        { prop: "studentId", label: "studentId" },
        { prop: "sex", label: "sex" },
        { prop: "name", label: "name" },
        { prop: "major", label: "major" },
        { prop: "grade", label: "grade" },
        { prop: "studentClass", label: "studentClass" },
        { prop: "ethnicGroup", label: "ethnicGroup" },
        { prop: "contactWay", label: "contactWay" },
        { prop: "familyTelNumber", label: "familyTelNumber" },
        { prop: "bulidingTime", label: "bulidingTime" },
        { prop: "helpType", label: "helpType" },
        { prop: "attentionType", label: "attentionType" },
        { prop: "destoryingTime", label: "destoryingTime" }
      ] 
    }
  },
  methods: {
     handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
      change_recorder: function (row) {
        this.changeRecorderDialog = true;
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
        //this.tempRecordInf = row;
      },
      change_record_inf: function (row) {
        this.changeRecordDialog = true;
        console.log(row);
        console.log(this.changeRecorderDialog);
      },
  },
  created() {
    let token = sessionStorage.getItem('token');
    let teacherId = sessionStorage.getItem('userName');
    var that = this;
    //7、查看历史帮扶学生列表
    $.ajax({
      url: this.ip + "/newhelp/api/historyArchives/" + teacherId,
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", token);
      },contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        if (data.success) {
          that.history_records = data.data;
          console.log(data.data);
        }
        else {
          alert(data.message);
        }
      },
      error: function (data) {
        console.log("无法获取历史信息");
      },
    });
    console.log(that.history_records);
  },
  mounted() {
  },
}
</script>

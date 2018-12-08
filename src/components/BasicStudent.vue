<template>
  <div>
    <div class="defaultInfoTable">
      <!--定义设置数据框-->
      <div id="cover" style="display: none">
                <div id="place">
                  <div><i class="el-icon-circle-close" id="close" @click="hideSettings"></i></div>
                  <p>{{titleOfSettings}}</p>
                  <h3>{{longTitleOfSettings}}</h3>
                  <el-button type="text" @click="changeSelection" style="float: right;margin-top: -50px;margin-right: 20px;">切换</el-button>
                  <input id="settingsId" type="hidden"/>
                  <el-checkbox-group class="chooseStu" v-model="chooseStuInfo" style="height: 400px">
                      <el-checkbox label="学号" disabled></el-checkbox>
                      <el-checkbox label="姓名" disabled></el-checkbox>
                      <el-checkbox v-for="(stuInfo,index) in stuInfoSet" :key="index"  :label="stuInfo.label"></el-checkbox>
                    </el-checkbox-group>
                  <el-checkbox-group style="display: none" class="chooseStuToImExport" v-model="chooseStuInfoToImExport">
                      <el-checkbox label="学号" disabled></el-checkbox>
                      <el-checkbox label="姓名" disabled></el-checkbox>
                      <el-checkbox v-for="(stuInfo,index) in stuInfoSet" :key="index" :label="stuInfo.label"></el-checkbox>
                    </el-checkbox-group>
      
        <button id="confirm" @click="changeSettings">确认</button>
        <button id="confirmImExport" @click="changeSettings">确认</button>
        </div>
        </div>
              <div class="top-btn">
                  <el-row>
                      <el-button plain @click="downloadTemplate()">模板下载</el-button>
                      <el-button plain @click="uploadExcel()">导入信息</el-button>
                      <el-dropdown>
                        <el-button plain>
                          导出信息<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="exportAllInfo()">导出所有信息</el-dropdown-item>
                          <el-dropdown-item @click.native="exportSearchedData()">导出查询学生</el-dropdown-item>
                          <el-dropdown-item @click.native="exportSelectedData()">导出选中学生</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                        <el-tooltip content="批量上传照片">
                          <el-button icon="el-icon-upload" type="success" @click="photoDialogVisible=true" plain></el-button>
                        </el-tooltip>
                        <el-dialog
                          title="批量上传照片"
                          :visible.sync="photoDialogVisible"
                          width="90%">
                          <div class="hello" >
                            <div class="upload">
                                <div class="upload_warp_left" @click="fileClick" >
                                    <button class="btn btn-success">选择图片</button>
                                </div>
                                <div class="upload_warp_text">
                                    选中{{imgList.length}}张图片，共{{bytesToSize(this.size)}}
                                </div>
                                <div class="upload_warp" style="border: 1px solid white;">
                                    <div class="upload_warp_img" v-show="imgList.length!=0" >
                                        <div class="upload_warp_img_div" v-for="(item,index) of imgList" :key="index" >
                                            <div class="upload_warp_img_div_top" >
                                                <div class="upload_warp_img_div_text" >
                                                    {{item.file.name}}
                                                </div>
                                                <img src="../assets/images/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                                            </div>
                                            <img :src="item.file.src">
                                        </div>
                                    </div>
                                </div>
                                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
                            </div>
                        </div>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="photoDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitPhotos">上 传</el-button>
                          </span>
                        </el-dialog>
                      <el-button type="primary" @click="showSettings">设置</el-button>
                      <el-popover placement="bottom" width="600px" v-model="searchBoxVisible">
                        <div>
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
                              <el-input v-model="formInline.studentClass" placeholder="如:2016220301"></el-input>
                            </el-form-item>
                            <el-form-item label="专业">
                              <el-select v-model="formInline.major">
                                <el-option v-for="(major,index) in allMajor" :label='major' :key="index" :value="major"></el-option>
                              </el-select>
                            </el-form-item>
                                  <el-form-item label="面貌">
                                    <el-select v-model="formInline.politicalStatus">
                                      <el-option v-for="politicalStatus in allIdentities" :label='politicalStatus' :value="politicalStatus"></el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item label="姓名">
                                      <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="学号">
                                      <el-input v-model="formInline.studentId" placeholder="如:2016220301001"></el-input>
                                    </el-form-item>
                                    <el-form-item label="籍贯">
                                      <el-select v-model="formInline.birthOrigin">
                                        <el-option v-for="birthOrigin in allProvinces" :label='birthOrigin' :value="birthOrigin"></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item label="民族">
                                      <el-select v-model="formInline.ethnicGroup">
                                        <el-option v-for="ethnicGroup in allNations" :label='ethnicGroup' :value="ethnicGroup"></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item label="性别">
                                      <el-select v-model="formInline.sex">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                      </el-select>
                                    </el-form-item>
                                  <el-form-item>
                                    <el-button type="primary" @click="searchStu">查询</el-button>
                                  </el-form-item>
                                </el-form>
                          </div>
                          <el-button @click.native="showSearchBox" slot="reference" class="search-btn" type="primary">查询</el-button>
                      </el-popover>
                      <el-button @click="toggleAdvancedSearch" class="search-btn">高级查询</el-button>
                    </el-row>
                    <input  type ="file" id="fileExcel" @change="uploadVerify" style="opacity:1;display:none;float:right;font-size:12px;margin-top:8px" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                    <form class="" action="http://180.76.249.233:8080/newhelp/api/download/baseStudentTemplate" method="get" style="display:none">
                      <input type="submit" id="downloadFile"/>
                    </form>
              </div>
              <el-dialog title="请输入密码" :visible.sync="pwdDialogVisible">
                <el-input v-model="password" type="password" auto-complete="off"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="pwdDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitExcel">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog title="请输入密码" :visible.sync="pwd1DialogVisible" append-to-body>
                <el-input v-model="password" type="password" auto-complete="off"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="pwd1DialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmDropSchool">确 定</el-button>
                </div>
              </el-dialog>
              <div class="info-table">
                  <el-table :data="testData" max-height="500" @selection-change="handleSelectionChange">
                      <!-- <el-table-column type="expand">
                          <template slot-scope="props">
                            <el-form v-show="props.row.signal!=='高级查询'" label-position="left" inline class="demo-table-expand">
                              <el-form-item v-for="data in basic_stu_table" :label="data.label">
                                <span>{{ props.row[data.prop] }}</span>
                              </el-form-item>
                            </el-form>
                          </template>
                        </el-table-column> -->
                        <el-table-column v-for="data in setting_stu_table" :label="data.label" :key="data.prop" v-if="data.show" :prop="data.prop">
                          <template scope="scope">
                            <el-input v-show="scope.row.signal=='高级查询'" size="small" v-model="scope.row[data.prop]" :placeholder="data.label"></el-input>
                            <span v-show="scope.row.signal!=='高级查询'">{{scope.row[data.prop]}}</span>
                          </template>
                        </el-table-column>
                      <el-table-column fixed="right" label="操作" width="100">
                        <div slot-scope="scope">
                          <el-button v-show="scope.row.signal=='高级查询'" @click="doAdvancedSearch()" type="text" size="small">查询</el-button>
                          <el-button v-show="scope.row.signal!=='高级查询'" @click="browseInfo(scope.$index)" type="text" size="small">查看</el-button>
                        </div>
                      </el-table-column>
                      <el-table-column type="selection" width="55"></el-table-column>
                    </el-table>
              </div>
              <!-- 导出选中数据时需要用到的表单 -->
              <form action="" method="post" target="nm_iframe" style="display:none" id="formRecord">
                <input type="text" id="form_settings" name="settings"/>
                <input type="text" id="form_Id" name="json" />
                <input type="text" id="weektoken" name="token">
                <input v-if="isSearch" type="text" id="keywords" name="keywords"> 
                <input type="submit" id="form_submit" name="nm_submit" value="提交" />
            </form>
            <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>
              <div class="pagination">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNumber">
              </el-pagination>
            </div>
            </div>
            <!-- 查看详细信息 -->
            <div class="detailedInfo" style="display:none">
                <el-breadcrumb separator="/" style="margin-bottom: 20px">
                  <el-breadcrumb-item ><a @click="backToTable">学生信息</a></el-breadcrumb-item>
                  <el-breadcrumb-item>{{choosedStudent}}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-tabs v-model="activeInfoName" type="border-card">
                  <el-tab-pane label="所有信息" name="allInfo">
                    <el-row :gutter="20">
                      <el-col :span="19">
                          <el-card class="box-card">
                              <div class="info">
                                <label style="font-size: 12px;float: left;margin: 15px;width: 200px;">
                                  <b>学院：</b><span style="width:126px;height:20px" >信息与软件工程学院</span>
                                </label>
                                <label v-for="infoProperty in allInfoProperties" style="font-size: 12px;float: left;margin:15px;width: 200px;">
                                  <b>{{infoProperty.label}}：</b>
                                  <el-input v-if="editStuInfo==true" size="mini" v-model="allInfoSet[infoProperty.code]"></el-input>
                                  <span v-if="editStuInfo==false" style="width:126px;height:20px" :id="infoProperty.code">{{allInfoSet[infoProperty.code]}}</span>
                                </label>
                               </div>
                          </el-card>
                      </el-col>
                      <el-col :span="5" style="text-align:center">
                        <img class="studentPhoto" :src="allInfoSet.photoUrl" alt="照片">
                        <input type="file" accept="image/jpeg,image/png,image/jpg" id="uploadPhoto" style="display: none">
                        <el-button style="margin-top: 20px;" @click="uploadPhoto" size="mini" plain>上传照片</el-button>
                        <el-row style="margin-top: 20px;">
                          <el-button v-if="editStuInfo==true" type="primary" plain @click="saveStuInfo" size="mini">保存</el-button>
                          <el-button v-if="editStuInfo==false" type="primary" size="mini" plain @click="editStu">编辑</el-button>
                          <el-button v-if="editStuInfo==true" plain @click="cancelSaveStuInfo" size="mini">取消</el-button>
                          <el-button type="danger" @click="dropSchool" size="mini" plain>退学</el-button>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="个人信息" name="personalInfo">
                    <el-row :gutter="20">
                      <el-col :span="19">
                          <el-card class="box-card">
                              <div class="info">
                                <label style="font-size: 12px;float: left;margin: 15px;width:200px">
                                  <b>学院：</b><span style="width:126px;height:20px" >信息与软件工程学院</span>
                                </label>
                                <label v-for="infoProperty in personalInfoProperties" style="font-size: 12px;float: left;margin:15px;width:200px">
                                  <b>{{infoProperty.label}}：</b><span style="width:126px;height:20px" :id="infoProperty.code">{{allInfoSet[infoProperty.code]}}</span>
                                </label>
                              </div>
                          </el-card>
                      </el-col>
                      <el-col :span="5" style="text-align:center">
                        <img class="studentPhoto" :src="allInfoSet.photoUrl" alt="照片">
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="家庭信息" name="familyInfo">
                    <el-row :gutter="20">
                      <el-col :span="19">
                          <el-card class="box-card">
                              <div class="info">
                                  <label style="font-size: 12px;float: left;margin: 15px;width:200px">
                                      <b>学院：</b><span style="width:126px;height:20px" >信息与软件工程学院</span>
                                    </label>
                                    <label v-for="infoProperty in familyInfoProperties" style="font-size: 12px;float: left;margin:15px;width:200px">
                                      <b>{{infoProperty.label}}：</b><span style="width:126px;height:20px" :id="infoProperty.code">{{allInfoSet[infoProperty.code]}}</span>
                                    </label>
                              </div>
                          </el-card>
                      </el-col>
                      <el-col :span="5" style="text-align:center">
                        <img class="studentPhoto" :src="allInfoSet.photoUrl" alt="照片">
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
            </div>
          </div>
</template>

<script>
export default {
  data(){
    return {
      imgList: [],
      size: 0,
      photoDialogVisible:false,
      index:1,
      editStuInfo:false,
      advancedSearchBox:false,
      isSearch:1,
      ifChecked:[],
      choosedStudents:[],
      toBeSentKeywords:JSON.stringify({}),
      choosedStudent:'',
      // basic_stu_table: [
      //   { prop: "studentId", label: "学号" },{ prop: "name", label: "姓名" },
      //   { prop: "sex", label: "年级" }, { prop: "studentClass", label: "班级" },
      //   { prop: "gender", label: "性别" }, { prop: "post", label: "职务" }, 
      //   {prop:"dormitory",label:"宿舍"},{ prop: "contact_way", label: "联系方式" },
      //   {prop:"idCardNumber",label:"身份证号"},{prop:"qqNumber",label:"QQ"}
      // ],
      setting_stu_table:[
        {label:'学号',prop:"studentId",show:true},{label:'姓名',prop:'name',show:true},
        {label:'年级',prop:'grade',show:true},{label:'班级',prop:'studentClass',show:true},
        {label:'性别',prop:'sex',show:true},{label:'职务',prop:'duty',show:true},
        {label:'宿舍',prop:'dormitory',show:true},{label:'联系方式',prop:'contactWay',show:false},
        {label:'身份证号',prop:'idCardNumber',show:false},{label:'QQ',prop:'qqNumber',show:false},
        {label:'Email',prop:'email',show:false},{label:'出生年月',prop:'birthday',show:false},
        {label:'身高',prop:'height',show:false},{label:'专业',prop:'major',show:false},
        {label:'政治面貌',prop:'politicalStatus',show:false},{label:'民族',prop:'ethnicGroup',show:false},
        {label:'籍贯',prop:'birthOrigin',show:false},{label:'高考成绩/满分',prop:'collegeEntranceExamScore',show:false},
        {label:'高考英语成绩/满分',prop:'collegeEntranceExamEnglishScore',show:false},{label:'英语入学考试成绩',prop:'entranceExamEnglishScore',show:false},
        {label:'家乡所在火车站',prop:'hometownRailwayStation',show:false},{label:'省份',prop:'province',show:false},
        {label:'所在城市',prop:'city',show:false},{label:'家庭详细地址',prop:'familyAddress',show:false},
        {label:'家庭电话',prop:'familyTelNumber',show:false},{label:'邮政编码',prop:'postcode',show:false},
        {label:'特长',prop:'specialty',show:false},{label:'高中曾任职务',prop:'dutyInHighSchool',show:false},
        {label:'高中曾获奖励',prop:'awardInHighSchool',show:false},{label:'科技竞赛获奖',prop:'isHadTechnologyCompetitionAward',show:false},
        {label:'父亲姓名',prop:'fatherName',show:false},{label:'父亲工作单位',prop:'fatherWorkUnit',show:false},
        {label:'父亲工作单位地址',prop:'fatherWorkUnitAddress',show:false},{label:'父亲职务',prop:'fatherDuty',show:false},
        {label:'父亲邮编',prop:'fatherPostcode',show:false},{label:'父亲电话',prop:'fatherTelNumber',show:false},
        {label:'母亲姓名',prop:'motherName',show:false},{label:'母亲工作单位',prop:'motherWorkUnit',show:false},
        {label:'母亲工作单位地址',prop:'motherWorkUnitAddress',show:false},{label:'母亲职务',prop:'motherDuty',show:false},
        {label:'母亲邮编',prop:'motherPostcode',show:false},{label:'母亲电话',prop:'motherTelNumber',show:false},
        {label:'学业状态',prop:'studyCondition',show:false}
      ],
      allInfoProperties:[
        {label:'学号',code:"studentId"},{label:'姓名',code:'name'},{label:'年级',code:'grade'},
        {label:'班级',code:'studentClass'},
        {label:'性别',code:'sex'},{label:'职务',code:'duty'},{label:'宿舍',code:'dormitory'},{label:'联系方式',code:'contactWay'},
        {label:'身份证号',code:'idCardNumber'},{label:'QQ',code:'qqNumber'},{label:'Email',code:'email'},{label:'出生年月',code:'birthday'},
        {label:'身高',code:'height'},{label:'专业',code:'major'},{label:'政治面貌',code:'politicalStatus'},
        {label:'民族',code:'ethnicGroup'},
        {label:'籍贯',code:'birthOrigin'},{label:'高考成绩/满分',code:'collegeEntranceExamScore'},
        {label:'高考英语成绩/满分',code:'collegeEntranceExamEnglishScore'},{label:'英语入学考试成绩',code:'entranceExamEnglishScore'},
        {label:'家乡所在火车站',code:'hometownRailwayStation'},{label:'省份',code:'province'},{label:'所在城市',code:'city'},{label:'家庭详细地址',code:'familyAddress'},
        {label:'家庭电话',code:'familyTelNumber'},{label:'邮政编码',code:'postcode'},{label:'特长',code:'specialty'},{label:'高中曾任职务',code:'dutyInHighSchool'},
        {label:'高中曾获奖励',code:'awardInHighSchool'},{label:'科技竞赛获奖',code:'isHadTechnologyCompetitionAward'},{label:'父亲姓名',code:'fatherName'},{label:'父亲工作单位',code:'fatherWorkUnit'},
        {label:'父亲工作单位地址',code:'fatherWorkUnitAddress'},{label:'父亲职务',ccode:'fatherDuty'},{label:'父亲邮编',code:'fatherPostcode'},{label:'父亲电话',code:'fatherTelNumber'},
        {label:'母亲姓名',code:'motherName'},{label:'母亲工作单位',code:'motherWorkUnit'},{label:'母亲工作单位地址',code:'motherWorkUnitAddress'},{label:'母亲职务',code:'motherDuty'},
        {label:'母亲邮编',code:'motherPostcode'},{label:'母亲电话',code:'motherTelNumber'},
        {label:'学业状态',code:'studyCondition'}
      ],
      personalInfoProperties:[
        {label:'学号',code:"studentId"},{label:'姓名',code:'name'},{label:'年级',code:'grade'},{label:'班级',code:'studentClass'},
        {label:'性别',code:'sex'},{label:'职务',code:'duty'},{label:'宿舍',code:'dormitory'},
        {label:'联系方式',code:'contactWay'},
        {label:'身份证号',code:'idCardNumber'},{label:'QQ',code:'qqNumber'},
        {label:'Email',code:'email'},{label:'出生年月',code:'birthday'},
        {label:'身高',code:'height'},{label:'专业',code:'major'},{label:'政治面貌',code:'politicalStatus'},{label:'民族',code:'ethnicGroup'},
        {label:'籍贯',code:'birthOrigin'},{label:'高考成绩/满分',code:'collegeEntranceExamScore'},{label:'高考英语成绩/满分',code:'collegeEntranceExamEnglishScore'},
        {label:'英语入学考试成绩',code:'entranceExamEnglishScore'},
        {label:'家乡所在火车站',code:'hometownRailwayStation'},{label:'省份',code:'province'},
        {label:'所在城市',code:'city'},
        {label:'邮政编码',code:'postcode'},{label:'特长',code:'specialty'},
        {label:'高中曾任职务',code:'dutyInHighSchool'},
        {label:'高中曾获奖励',code:'awardInHighSchool'},{label:'科技竞赛获奖',code:'isHadTechnologyCompetitionAward'}
      ],
      familyInfoProperties:[
        {label:'家庭详细地址',code:'familyAddress'},
        {label:'家庭电话',code:'familyTelNumber'},{label:'父亲姓名',code:'fatherName'},
        {label:'父亲工作单位',code:'fatherWorkUnit'},
        {label:'父亲工作单位地址',code:'fatherWorkUnitAddress'},{label:'父亲职务',ccode:'fatherDuty'},
        {label:'父亲邮编',code:'fatherPostcode'},{label:'父亲电话',code:'fatherTelNumber'},{label:'母亲姓名',code:'motherName'},
        {label:'母亲工作单位',code:'motherWorkUnit'},{label:'母亲工作单位地址',code:'motherWorkUnitAddress'},
        {label:'母亲职务',code:'motherDuty'},
        {label:'母亲邮编',code:'motherPostcode'},{label:'母亲电话',code:'motherTelNumber'}
      ],
      stuInfoSet:[
        {prop: "grade",label:'年级',checked:false},
        {prop: "studentClass",label:'班级',checked:false},
        {prop: "sex",label:'性别',checked:false},
        {prop: "duty",label:'职务',checked:false},
        {prop: "dormitory",label:'宿舍',checked:false},
        {prop: "contactWay",label:'联系方式',checked:false},
        {prop: "idCardNumber",label:'身份证号',checked:false},{prop: "qqNumber",label:'QQ',checked:false},
        {prop: "email",label:'Email',checked:false},{prop: "birthday",label:'出生年月',checked:false},
        {prop: "height",label:'身高',checked:false},{prop: "major",label:'专业',checked:false},
        {prop: "politicalStatus",label:'政治面貌',checked:false},
        {prop: "ethnicGroup",label:'民族',checked:false},
        {prop: "birthOrigin",label:'籍贯',checked:false},{prop: "collegeEntranceExamScore",label:'高考成绩/满分',checked:false},
        {prop: "collegeEntranceExamEnglishScore",label:'高考英语成绩/满分',checked:false},
        {prop: "entranceExamEnglishScore",label:'英语入学考试成绩',checked:false},
        {prop: "hometownRailwayStation",label:'家乡所在火车站',checked:false},
        {prop: "province",label:'省份',checked:false},
        {prop: "city",label:'所在城市',checked:false},{prop: "familyAddress",label:'家庭详细地址',checked:false},
        {prop: "familyTelNumber",label:'家庭电话',checked:false},{prop: "postcode",label:'邮政编码',checked:false},
        {prop: "specialty",label:'特长',checked:false},{prop: "dutyInHighSchool",label:'高中曾任职务',checked:false},
        {prop: "awardInHighSchool",label:'高中曾获奖励',checked:false},{prop: "isHadTechnologyCompetitionAward",label:'科技竞赛获奖',checked:false},
        {prop: "fatherName",label:'父亲姓名',checked:false},{prop: "fatherWorkUnit",label:'父亲工作单位',checked:false},
        {prop: "fatherWorkUnitAddress",label:'父亲工作单位地址',checked:false},{prop: "fatherDuty",label:'父亲职务',checked:false},
        {prop: "fatherPostcode",label:'父亲邮编',checked:false},{prop: "fatherTelNumber",label:'父亲电话',checked:false},
        {prop: "motherName",label:'母亲姓名',checked:false},{prop: "motherWorkUnit",label:'母亲工作单位',checked:false},
        {prop: "motherWorkUnitAddress",label:'母亲工作单位地址',checked:false},{prop: "motherDuty",label:'母亲职务',checked:false},
        {prop: "motherPostcode",label:'母亲邮编',checked:false},{prop: "motherTelNumber",label:'母亲电话',checked:false},
        {prop: "studyCondition",label:'学业状态',checked:false}
      ],
      activeInfoName:'allInfo',
      password:'',
      pwdDialogVisible:false,
      pwd1DialogVisible:false,
      allProvinces:["四川省","河北省","山西省","吉林省","辽宁省","黑龙江省","陕西省","甘肃省","青海省","山东省",
        "福建省","浙江省","河南省","湖北省","湖南省","江西省","江苏省","安徽省","广东省","海南省","贵州省","云南省",
        "北京","上海","重庆","天津","内蒙古","新疆","宁夏","广西","西藏","台湾","香港","澳门"
        ],
        allNations:["汉族","壮族","满族","回族","苗族","维吾尔族","土家族","彝族","蒙古族","藏族","布依族","侗族",
        "瑶族","朝鲜族","白族","哈尼族","哈萨克族","黎族","傣族","畲族","傈僳族","仡佬族","东乡族","高山族","拉祜族",
        "水族","佤族","纳西族","羌族","土族","仫佬族","锡伯族","柯尔克孜族","达斡尔族","景颇族","毛南族","撒拉族",
        "布朗族","塔吉克族","阿昌族","普米族","鄂温克族","怒族","京族","基诺族","德昂族","保安族","俄罗斯族","裕固族",
        "乌孜别克族","门巴族","鄂伦春族","独龙族","塔塔尔族","赫哲族","珞巴族"
        ],
      allMajor:[
            "信息工程","软件技术","嵌入式系统","网络安全工程","大型主机","信息与获取","数字动漫","留学生","工业产品计算机","数字信息处理","互联网+","互联网安全","国际班","英文授课留学生"
        ],
        allIdentities:[
            "中共党员","共青团员","预备党员","积极分子","群众"
        ],
        // 分页相关
      currentPage:1,
      pageSize:10,
      pageSizes:[10,50,100, 500, 1000],
      totalNumber:700,
      sortMethod:0,
      searchBoxVisible:false,
      chooseStuInfo:[],
      chooseStuInfoToImExport:[],
      longTitleOfSettings:'请选择您想显示的学生信息(5～12项)',
      formInline: {
            college:"信息与软件工程学院",
            grade:"",
            major:"",
            studentClass:"",
            politicalStatus: '',
            name:"",
            studentId:"",
            birthOrigin:"",
            ethnicGroup:"",
            sex:""
          },
      testData:[],
      allInfoSet:{studentId:'2016220101011',name:'苏菲',grade:'2016',studentClass:'2016220101',sex:'女',
        photoUrl:'http://c.hiphotos.baidu.com/zhidao/pic/item/8cb1cb13495409232f44fa5d9158d109b3de49e0.jpg',
        duty:'',dormitory:'',contactWay:'',idCardNumber:'',qqNumber:'',email:'',birthday:'',height:'',major:'',
        politicalStatus:'',ethnicGroup:'',birthOrigin:'',collegeEntranceExamScore:'',
        collegeEntranceExamEnglishScore:'',entranceExamEnglishScore:'',hometownRailwayStation:'',province:'',
        city:'',familyAddress:'',familyTelNumber:'',postcode:'',specialty:'',dutyInHighSchool:'',
        awardInHighSchool:'',isHadTechnologyCompetitionAward:'',fatherName:'',fatherWorkUnit:'',
        fatherWorkUnitAddress:'',fatherDuty:'',fatherPostcode:'',fatherTelNumber:'',motherName:'',
        motherWorkUnit:'',motherWorkUnitAddress:'',motherDuty:'',motherPostcode:'',motherTelNumber:'12345678901',
        StudyCondition:''
      },
      titleOfSettings:'显示设置',
    }
  },
  created(){
    this.jumpToPage();
  },
  methods:{
    submitPhotos(){
      this.photoDialogVisible=false
      this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var self=this
      var token = sessionStorage.getItem("token");
      var form = new FormData();
      for(var i=0;i<self.imgList.length;i++){
          form.append('photos',self.imgList[i].file)
      }
      form.append('teacherId',sessionStorage.getItem("userName"));
      form.append('password',value)
      $.ajax({
          url:"http://"+self.Global.ipAddr+"/newhelp/api/baseStudent/photos",
          type:"POST",
          beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
          },
          data:form,
          contentType:false,
          processData:false,
          success:function(data){
            if(data.success){
              alert('上传成功！');
              window.location.reload()
            }else{
              alert(data.message);
            }
          },
          error:function(XMLHttpRequest,textStatus,errorThrown,data){
              alert("上传照片失败"+XMLHttpRequest.status);
          }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
},
  fileClick(){
      document.getElementById('upload_file').click()
  },
  fileChange(el){
      if (!el.target.files[0].size) return;
      this.fileList(el.target.files);
      el.target.value = ''
  },
  fileList(files){
      for (let i = 0; i < files.length; i++) {
          this.fileAdd(files[i]);
      }
  },
  fileAdd(file){
      this.size = this.size + file.size;//总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
          file.src = this.result;
          this.vue.imgList.push({
              file
          });
      }
  },
  fileDel(index){
      this.size = this.size - this.imgList[index].file.size;//总大小
      this.imgList.splice(index, 1);
  },
  bytesToSize(bytes){
      if (bytes === 0) return '0 B';
      let k = 1024,
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  },
    uploadVerify(){
      this.pwdDialogVisible=true
    },
    submitExcel(){
      if(this.password){
        var self=this
        this.pwdDialogVisible=false
        var token = sessionStorage.getItem("token");
        var form = new FormData();
        var file = document.getElementById("fileExcel").files[0];
        form.append('file',file);
        form.append('password',this.password);
        form.append('settings',sessionStorage.getItem("newSettings"));
        form.append('teacherId',sessionStorage.getItem("userName"));
        $.ajax({
            url:"http://"+self.Global.ipAddr+"/newhelp/api/import/baseStudent",
            type:"POST",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
            },
            data:form,
            contentType:false,
            processData:false,
            success:function(data){
                alert(data.message);
                self.password=''
            },
            error:function(XMLHttpRequest,textStatus,errorThrown,data){
                alert("上传失败"+XMLHttpRequest.status);
            }
        })
      }
    },
    cancelSaveStuInfo(){
      this.editStuInfo=false
      this.browseInfo(this.index)
    },
    saveStuInfo(){
      this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var self = this
          var form = new FormData();
          var file = document.getElementById("uploadPhoto").files[0];
          form.append('photo',file);
          var baseStudent = this.allInfoSet
          var json = JSON.stringify({
            "baseStudent":baseStudent,
            "teacher":
            {
              "teacherId":sessionStorage.getItem('userName'),
              "password": value
            }
          });
        form.append('json',json);
        $.ajax({
          url:"http://"+ self.Global.ipAddr +"/newhelp/api/baseStudent",
          beforeSend:function(request){
            request.setRequestHeader("Authorization",sessionStorage.getItem('token'));
          },
          type:"POST",
          data : form,
          async:false,
          contentType: false,
          processData: false,
          dataType:'json',
          success:function(data){
             alert(data.message);
            if(data.success){
              window.location.reload()
            }
          },
          error:function(XMLHttpRequest, textStatus, errorThrown, data){
           alert("发生错误" + XMLHttpRequest.status);
         }
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    editStu(){
      this.editStuInfo=true
    },
    doAdvancedSearch(){
      var searchOptions=this.testData[0]
      delete searchOptions.signal
      this.toBeSentKeywords = JSON.stringify(searchOptions);
      this.jumpToPage();
    },
    toggleAdvancedSearch(){
      if(this.testData[0].signal!='高级查询'){
        this.testData.unshift({
        signal:'高级查询',
        studentId:'',
        name:'',
        grade:'',
        studentClass:'',
        sex:'',
        duty:"",
        dormitory:"",
        contactWay:"",
        idCardNumber:"",
        qqNumber:"",
        email:"",
        birthday:"",
        height:"",
        major:'',
        politicalStatus:'',
        ethnicGroup:'',
        birthOrigin:'',
        collegeEntranceExamScore:"",
        collegeEntranceExamEnglishScore:"",
        entranceExamEnglishScore:"",
        hometownRailwayStation:"",
        province:"",
        city:"",
        familyAddress:"",
        familyTelNumber:"",
        postcode:"",
        specialty:"",
        dutyInHighSchool:"",
        awardInHighSchool:"",
        isHadTechnologyCompetitionAward:"",
        fatherName:"",
        fatherWorkUnit:"",
        fatherWorkUnitAddress:"",
        fatherDuty:"",
        fatherPostcode:"",
        fatherTelNumber:"",
        motherName:"",
        motherWorkUnit:"",
        motherWorkUnitAddress:"",
        motherDuty:"",
        motherPostcode:"",
        motherTelNumber:""
      })
      }else{
        this.testData.shift()
      }
    },
    exportAllInfo(){
      // this.toBeSentKeywords = JSON.stringify({
      //         "studentId":"",
      //         "name":"",
      //         "grade":"",
      //         "studentClass":"",
      //         "sex":"",
      //         "duty":"",
      //         "dormitory":"",
      //         "contactWay":"",
      //         "idCardNumber":"",
      //         "qqNumber":"",
      //         "email":"",
      //         "birthday":"",
      //         "height":"",
      //         "major":"",
      //         "politicalStatus":"",
      //         "ethnicGroup":"",
      //         "birthOrigin":"",
      //         "collegeEntranceExamScore":"",
      //         "collegeEntranceExamEnglishScore":"",
      //         "entranceExamEnglishScore":"",
      //         "hometownRailwayStation":"",
      //         "province":"",
      //         "city":"",
      //         "familyAddress":"",
      //         "familyTelNumber":"",
      //         "postcode":"",
      //         "specialty":"",
      //         "dutyInHighSchool":"",
      //         "awardInHighSchool":"",
      //         "isHadTechnologyCompetitionAward":"",
      //         "fatherName":"",
      //         "fatherWorkUnit":"",
      //         "fatherWorkUnitAddress":"",
      //         "fatherDuty":"",
      //         "fatherPostcode":"",
      //         "fatherTelNumber":"",
      //         "motherName":"",
      //         "motherWorkUnit":"",
      //         "motherWorkUnitAddress":"",
      //         "motherDuty":"",
      //         "motherPostcode":"",
      //         "motherTelNumber":"",
      //    });
      this.isSearch=1
      var ifCheckedCopy=[]
      ifCheckedCopy=JSON.parse(JSON.stringify(this.ifChecked))
      this.ifChecked.fill(1)
      this.setSettings()
      this.ifChecked=ifCheckedCopy
      var settings = sessionStorage.getItem("newSettings");
      this.setSettings()
      var token = sessionStorage.getItem("token");
      var json = JSON.stringify({
        "teacherId":sessionStorage.getItem("userName")
        });
        $("#formRecord").attr("action","http://180.76.249.233:8080/newhelp/api/export/search/baseStudent");
        $("#form_Id").val(json);
        $("#weektoken").val(token);
        $("#form_settings").val(settings);
        $("#keywords").val(this.toBeSentKeywords);
        $("#form_submit").click();
    },
    exportSearchedData(){
      this.isSearch=1
      var settings = sessionStorage.getItem("newSettings");
      var token = sessionStorage.getItem("token");
      var json = JSON.stringify({
        "teacherId":sessionStorage.getItem("userName")
        });
        $("#formRecord").attr("action","http://180.76.249.233:8080/newhelp/api/export/search/baseStudent");
        $("#form_Id").val(json);
        $("#weektoken").val(token);
        $("#form_settings").val(settings);
        $("#keywords").val(this.toBeSentKeywords);
        $("#form_submit").click();
    },
    //导出选中数据
    exportSelectedData(){
      this.isSearch=0
      var studentId = [];
      for(var i=0;i<this.choosedStudents.length;i++){
        studentId.push(this.choosedStudents[i].studentId)
      }
      var settings = sessionStorage.getItem("newSettings");
      var token = sessionStorage.getItem("token");
      var json = JSON.stringify({
        "studentIds":studentId,
        "teacherId":sessionStorage.getItem("userName")
        });
        $("#formRecord").attr("action","http://180.76.249.233:8080/newhelp/api/export/baseStudent");
        $("#form_Id").val(json);
        $("#weektoken").val(token);
        $("#form_settings").val(settings);
        $("#form_submit").click();
 },
    dropSchool(){
      var self=this
      this.$confirm('确定将'+self.testData[self.index].name+'同学退学?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pwd1DialogVisible=true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    confirmDropSchool(){
      if(this.password){
        var self=this
        this.pwd1DialogVisible=false
        var token = sessionStorage.getItem("token");
        var uploadData=JSON.stringify({
          studentId:self.testData[self.index].studentId,
          teacher:{
            teacherId:sessionStorage.getItem('userName'),
            password:self.password
          }
        })
        $.ajax({
            url:"http://"+self.Global.ipAddr+"/newhelp/api/baseStudent/dropout",
            type:"POST",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
            },
            data:uploadData,
            contentType: "application/json; charset=utf-8",
            dataType:'json',
            success:function(data){
              if(data.success){
                alert('退学成功！')
                window.location.reload();
              }else{
                alert(data.message);
              }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown,data){
                alert("上传失败"+XMLHttpRequest.status);
            }
        })
      }
    },
    showSearchBox(){
      this.formInline={
        college:"信息与软件工程学院",
        grade:"",
        major:"",
        studentClass:"",
        politicalStatus: '',
        name:"",
        studentId:"",
        birthOrigin:"",
        ethnicGroup:"",
        sex:""
      }
    },
    searchStu(){
      this.searchBoxVisible=false
      this.toBeSentKeywords = JSON.stringify({
              "studentId":this.formInline.studentId,
              "name":this.formInline.name,
              "grade":this.formInline.grade,
              "studentClass":this.formInline.studentClass,
              "sex":this.formInline.sex,
              "duty":"",
              "dormitory":"",
              "contactWay":"",
              "idCardNumber":"",
              "qqNumber":"",
              "email":"",
              "birthday":"",
              "height":"",
              "major":this.formInline.major,
              "politicalStatus":this.formInline.politicalStatus,
              "ethnicGroup":this.formInline.ethnicGroup,
              "birthOrigin":this.formInline.birthOrigin,
              "collegeEntranceExamScore":"",
              "collegeEntranceExamEnglishScore":"",
              "entranceExamEnglishScore":"",
              "hometownRailwayStation":"",
              "province":"",
              "city":"",
              "familyAddress":"",
              "familyTelNumber":"",
              "postcode":"",
              "specialty":"",
              "dutyInHighSchool":"",
              "awardInHighSchool":"",
              "isHadTechnologyCompetitionAward":"",
              "fatherName":"",
              "fatherWorkUnit":"",
              "fatherWorkUnitAddress":"",
              "fatherDuty":"",
              "fatherPostcode":"",
              "fatherTelNumber":"",
              "motherName":"",
              "motherWorkUnit":"",
              "motherWorkUnitAddress":"",
              "motherDuty":"",
              "motherPostcode":"",
              "motherTelNumber":"",
         });
         this.jumpToPage();
    },
    browseInfo(index){
      this.index = index
      $('.detailedInfo').show();
      $('.defaultInfoTable').hide();
      this.editStuInfo=false
      this.choosedStudent = this.testData[index].Name
      this.allInfoSet = this.testData[index]
      var token = sessionStorage.getItem('token')
      var self=this
      $.ajax({
        url:'http://180.76.249.233:8080/newhelp/api/baseStudent/all/'+self.testData[index].studentId,
        beforeSend:function(request){
          request.setRequestHeader('Authorization',token)
        },
        type:'GET',
        dataType:'json',
        success:function(res){
          if(res.success){
            self.allInfoSet=res.data
          }else{
            alert(res.message)
          }
        },
        error:function(jqXHR){
          alert("发生错误："+jqXHR.status)
        }
      })
    },
    uploadPhoto(){
      $('#uploadPhoto').click();
    },
    backToTable(){
      $(".detailedInfo").hide();
      $(".defaultInfoTable").show();
    },
    handleSelectionChange(val) {
      if(val[0].signal=="高级查询"){
        val.shift()
      }
      this.choosedStudents = val
    },
    onSubmit() {
            console.log('submit!');
          },
    handleSizeChange(val){
      this.pageSize=val;
      this.jumpToPage()
    },
    showSettings(){
      $('#cover').css('display','block');
      var settingTable = this.setting_stu_table
      for(var i=0;i<this.setting_stu_table.length;i++){
        if(settingTable[i].show==true){
          this.chooseStuInfo.push(this.setting_stu_table[i].label)
        }
      }
    },
    uploadExcel(){
      $("#fileExcel").click();
    },
    downloadTemplate(){
      $("#downloadFile").click();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.jumpToPage()
    },
    jumpToPage(){
      var self=this
          $.ajax({
            url:"http://"+self.Global.ipAddr+"/newhelp/api/baseStudents/"+sessionStorage.getItem('userName')+"/"+this.pageSize+"/"+this.currentPage+"/"+this.sortMethod,
        beforeSend:function(request){
          request.setRequestHeader("Authorization",sessionStorage.getItem('token'));
        },
        type:"POST",
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        data:this.toBeSentKeywords,
        success:function(res){
          if(res.success){
            self.testData=res.data.baseStudents
            self.totalNumber=res.data.page.recordNum
            self.ifChecked=new Array(43);
            self.ifChecked.fill(0)
            for(var i=0;i<self.setting_stu_table.length;i++){
              if(self.setting_stu_table[i].show==true){
                self.ifChecked[i]=1
              }
            }
            self.setSettings();
          }else{
            alert("数据获取错误");
          }
        },
        error:function(){
            alert("数据获取错误");
        },
      });
    },
    //将当前显示的项以布尔值的方式存一份到sessionStorage
    setSettings(){
      var newSettings = JSON.stringify({
              "exposeStudentId": this.ifChecked[0],
              "exposeName": this.ifChecked[1],
              "exposeGrade": this.ifChecked[2],
              "exposeStudentClass": this.ifChecked[3],
              "exposeSex": this.ifChecked[4],
              "exposeDuty": this.ifChecked[5],
              "exposeDormitory":this.ifChecked[6] ,
              "exposeContactWay": this.ifChecked[7],
              "exposeIdCardNumber":this.ifChecked[8],
              "exposeQqNumber": this.ifChecked[9],
              "exposeEmail":this.ifChecked[10] ,
              "exposeBirthday":this.ifChecked[11] ,
              "exposeHeight":this.ifChecked[12] ,
              "exposeMajor":this.ifChecked[13] ,
              "exposePoliticalStatus":this.ifChecked[14] ,
              "exposeEthnicGroup":this.ifChecked[15] ,
              "exposeBirthOrigin":this.ifChecked[16] ,
              "exposeCollegeEntranceExamScore":this.ifChecked[17] ,
              "exposeCollegeEntranceExamEnglishScore": this.ifChecked[18],
              "exposeEntranceExamEnglishScore": this.ifChecked[19],
              "exposeHometownRailwayStation":this.ifChecked[20] ,
              "exposeProvince": this.ifChecked[21],
              "exposeCity": this.ifChecked[22],
              "exposeFamilyAddress": this.ifChecked[23],
              "exposeFamilyTelNumber":this.ifChecked[24] ,
              "exposePostcode":this.ifChecked[25] ,
              "exposeSpecialty": this.ifChecked[26],
              "exposeDutyInHighSchool":this.ifChecked[27] ,
              "exposeAwardInHighSchool":this.ifChecked[28] ,
              "exposeIsHadTechnologyCompetitionAward":this.ifChecked[29] ,
              "exposeFatherName":this.ifChecked[30] ,
              "exposeFatherWorkUnit":this.ifChecked[31] ,
              "exposeFatherWorkUnitAddress":this.ifChecked[32] ,
              "exposeFatherDuty":this.ifChecked[33] ,
              "exposeFatherPostcode": this.ifChecked[34],
              "exposeFatherTelNumber":this.ifChecked[35] ,
              "exposeMotherName": this.ifChecked[36],
              "exposeMotherWorkUnit":this.ifChecked[37] ,
              "exposeMotherWorkUnitAddress":this.ifChecked[38] ,
              "exposeMotherDuty":this.ifChecked[39] ,
              "exposeMotherPostcode":this.ifChecked[40] ,
              "exposeMotherTelNumber":this.ifChecked[41],
              "exposeStudyCondition":this.ifChecked[42]
            });
            sessionStorage.setItem("newSettings",newSettings);
    },
    changeSettings(){
            var allOptions = this.chooseStuInfo
            var count = allOptions.length

            if(count <= 12&&count>=5){
              for(var j=0;j<this.setting_stu_table.length;j++){
              this.setting_stu_table[j].show=false;
              this.ifChecked = new Array(43);
              this.ifChecked.fill(0)
            }
              this.hideSettings();
              for(var i=0;i<count;i++){
                for(var j=0;j<this.setting_stu_table.length;j++){
                  if(allOptions[i]==this.setting_stu_table[j].label){
                    this.setting_stu_table[j].show=true
                    this.ifChecked[j]=1
                  }
                }
              }
              this.setSettings();
              this.chooseStuInfo=[]
            }else{
                alert("请选择5～12项");
            }
        },
    hideSettings(){
      $('#cover').css('display','none');
    },
    changeSelection(){
            if(this.titleOfSettings=="显示设置"){
                this.titleOfSettings="导入/更新设置"
                this.longTitleOfSettings="导入/更新选项设置"
                $(".chooseStuToImExport").css("display","block");
                $(".chooseStu").css("display","none");
                $("#confirm").css("display","none");
                $("#confirmImExport").css("display","block");
              }else{
                this.longTitleOfSettings="请选择您想显示的学生信息(5～12项)"
                this.titleOfSettings="显示设置"
                $(".chooseStuToImExport").css("display","none");
                $(".chooseStu").css("display","block");
                $("#confirmImExport").css("display","none");
                $("#confirm").css("display","block");
              }
        }
  }
}
</script>

<style scoped>
.upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
}

.upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
}

.upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
}

.upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 0px 5px 5px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
}

.upload_warp_img {
    border-top: 1px solid #D2D2D2;
    padding: 5px 0 0 5px;
    overflow: hidden
}

.upload_warp_text {
    text-align: left;
    margin-bottom: 5px;
    padding-top: 5px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
}

.upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
}

.upload_warp_left button {

    margin: 8px 5px 0px 5px;
    cursor:pointer;


}

.upload_warp_left {
    float: left;

}

.upload_warp {
    margin: 5px;

}

.upload {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
}

.hello {
    text-align: center;
}
.el-table{
  font-size: 12px;
}
    .el-checkbox{
      margin-left: 30px;
      margin-bottom: 10px;
      width: 150px;
    }
    .info{
    float: left
    }
    .info input{
    background: transparent;
    border: 1px solid #dcdfe6;;
    padding-left: 5px;
    }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-checkbox.is-bordered+.el-checkbox.is-bordered {
    margin-bottom: 10px;
  }
    .cell{
      font-size: 12px;
    }
    .pagination{
      margin-top: 20px;
    }
    .info-table{
      margin-top: 20px;
    }
    #cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(	0,0,0,0.5);
    display: none;
    z-index: 1000;
    }
#place {
    width: 560px;
    height: 630px;
    background: white;
    border-top: 70px solid #00c1de;
    -webkit-box-shadow: 0 0 10px rgba(0, 204, 204, .5);
    -moz-box-shadow: 0 0 10px rgba(0, 204, 204, .5);
    box-shadow: 0 0 10px rgba(255,250,205,.9);
    margin: auto;
    margin-top: 40px;
    margin-bottom: 20px;
    border-radius: 5px;
    }
    #place div i{
    width: 40px;
    height: 40px;
    float: right;
    margin-top: -60px;
    margin-right: -15px;
}
#place p {
    margin-top: -50px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-left: 10px;
}
#place h3 {
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-left: 40px;
    margin-top: 50px;
}
.chooseStu {
    height: 400px;
    overflow-y: scroll;
}
.chooseStuInfo {
    list-style-type: none;
    font-size: 15px;
}
#place input[type="checkbox"] {
    zoom: 140%;
}
.chooseStuToImExport {
    height: 400px;
    overflow-y: scroll;
}
.chooseStuInfoToImExport {
    list-style-type: none;
    font-size: 15px;
}
#confirm {
    float: right;
    margin-right: 70px;
    font-size: 15px;
}
#confirmImExport {
    float: right;
    margin-right: 70px;
    font-size: 15px;
    display: none;
}
    .search-btn{
      float:right;
      margin: 4px;
    }
    .el-menu{
      border-right: 0px;
    }
    .el-menu-item{
      text-align: left;
      background-color: #333744;
    }
    .el-menu-item.is-active{
      background-color: #00c1de;
      color: #fff;
    }
    .el-menu-item:hover{
        background-color: #7ed2df;
      }
    .topbar-wrap{
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;
    }
    .topbar-btn{
      color: #fff;
    }
    .topbar-logo{
      float: left;
      width: 59px;
      line-height: 26px;
    }
    .topbar-logo img{
      height: 40px;
      margin-top: 5px;
      margin-left: 2px;
    }
    .topbar-title{
      float: left;
      text-align: left;
      width: 200px;
      padding-left: 10px;
    }
    .topbar-account{
      float: right;
      padding-right: 12px;
    }
    .userinfo-inner{
      cursor: pointer;
      color: #fff;
      padding-left: 10px;
    }

    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
      height: 100%;
    }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
    .studentPhoto{
      width: 150px;
      height: 200px;
    }
  </style>

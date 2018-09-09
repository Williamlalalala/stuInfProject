
axios.defaults.baseURL = 'http://180.76.249.233:8080';
var difStuPage = new Vue({
    el: "#main",
    data: {
        sign: 5,
        changeRecorderDialog: false,//更改记录人的框
        changeRecordDialog: false,//更改记录
        delRecordDialog: false,
        createTableVisible:false,
        //帮扶标签
        dynamicHelpTags: ['标签一', '标签二', '标签三'],
        //帮扶列表
        helpTagTable: [
            {
                helpTypeId: "",
                helpTypeName: ""
            }],
        //关注列表（添加修改
        dynamicAttentionTags: [
            {name:'标签三',visible:true,index:0},
            {name:'标签二',visible:true,index:1},
            {name:'标签一',visible:true,index:2},
        ],
        students:[],
        guideStudent:'',
        inputVisibleOne: false,
        inputValueOne: '',
        inputVisibleTwo: false,
        inputValueTwo: '',
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
        recordInfForm: {
            recordId: "",
            recordTime: "",
            location: "",
            witness: "",
            recorder: "",
            participant: "",
            way: "",
            content: "",
            comment: ""
        },
        //暂时存放在记录列表中被获取的数据并随时更新
        tempRecordInf: {
            recordId: "",
            recordTime: "",
            location: "",
            witness: "",
            recorder: "",
            participant: "",
            way: "",
            content: "",
            comment: ""
        },
        formLabelWidth: "100px",
        allType:[
            "一般困难","非常困难","特别困难"
        ],
        diffType:'',
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
        //困难学生横轴属性
        straitened_stu_table: [
            { prop: "name", label: "姓名" },
            { prop: "studentId", label: "学号" }, { prop: "grade", label: "年级" }, { prop: "studentClass", label: "班级" },
            { prop: "sex", label: "性别" }, { prop: "nation", label: "民族" }, { prop: "contactWay", label: "联系方式" },
            { prop: "familyTelNumber", label: "家庭电话" }, { prop: "bulidingBasis", label: "建档类型" }, { prop: "bulidingTime", label: "建档日期" }, { prop: "attentionType", label: "关注状态" }, { prop: "destoryingTime", label: "除档时间" }
        ],
        //记录列表属性
        record_table_attitude: [
            { prop: "recordId", label: "记录号" },
            { prop: "recordName", label: "姓名" },
            { prop: "recordTime", label: "记录时间" },
            { prop: "location", label: "地点" },
            { prop: "witness", label: "证人" },
            { prop: "recorder", label: "记录者" },
            { prop: "participant", label: "参与者" },
            { prop: "way", label: "方式" },
            { prop: "content", label: "内容" },
            { prop: "comment", label: "评论" }
        ],
        //记录列表
        record_table: [
            {
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
            },
        ],
        //帮扶学生列表
        beforStuInfTable: [{
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
        }],
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
            ],




            //第二部分的数据
            testData: [
                {
                    studentId: '2016220101001', Name: '苏菲', grade: '2016', class: "2016220101",
                    gender: '女', post: '', dormitory: '欣5女-201', contact_way: '',
                    id_number: "510000199811111121", QQ: '1234567890'
                }
            ],
            multipleSelection: [],
            allStuInfo: [],
            currentPage: 1,
            pageSize: 10,
            imgData: {
                accept: 'image/jpeg, image/png, image/jpg',
            },
            allInfoSet: {
                "studentId": '2016220101011', "name": '苏菲', "grade": '2016', "studentClass": '2016220101', "sex": '女', "photoUrl": 'http://c.hiphotos.baidu.com/zhidao/pic/item/8cb1cb13495409232f44fa5d9158d109b3de49e0.jpg', "duty": '', "dormitory": '',
                "contactWay": '', "idCardNumber": '', "qqNumber": '', "email": '', "birthday": '', "height": '', "major": '', "politicalStatus": '',
                "ethnicGroup": '', "birthOrigin": '', "collegeEntranceExamScore": '', "collegeEntranceExamEnglishScore": '', "entranceExamEnglishScore": '', "hometownRailwayStation": '', "province": '', "city": '',
                "familyAddress": '', "familyTelNumber": '', "postcode": '', "specialty": '', "dutyInHighSchool": '', "awardInHighSchool": '', "isHadTechnologyCompetitionAward": '', "fatherName": '',
                "fatherWorkUnit": '', "fatherWorkUnitAddress": '', "fatherDuty": '', "fatherPostcode": '', "fatherTelNumber": '', "motherName": '', "motherWorkUnit": '', "motherWorkUnitAddress": '',
                "motherDuty": '', "motherPostcode": '', "motherTelNumber": '12345678901', "StudyCondition": ''
            },
            allInfoProperties: [{ label: '学号', code: "studentId" }, { label: '姓名', code: 'name' }, { label: '年级', code: 'grade' }, { label: '班级', code: 'studentClass' },
            { label: '性别', code: 'sex' }, { label: '职务', code: 'duty' }, { label: '宿舍', code: 'dormitory' }, { label: '联系方式', code: 'contactWay' },
            { label: '身份证号', code: 'idCardNumber' }, { label: 'QQ', code: 'qqNumber' }, { label: 'Email', code: 'email' }, { label: '出生年月', code: 'birthday' },
            { label: '身高', code: 'height' }, { label: '专业', code: 'major' }, { label: '政治面貌', code: 'politicalStatus' }, { label: '民族', code: 'ethnicGroup' },
            { label: '籍贯', code: 'birthOrigin' }, { label: '高考成绩/满分', code: 'collegeEntranceExamScore' }, { label: '高考英语成绩/满分', code: 'collegeEntranceExamEnglishScore' }, { label: '英语入学考试成绩', code: 'entranceExamEnglishScore' },
            { label: '家乡所在火车站', code: 'hometownRailwayStation' }, { label: '省份', code: 'province' }, { label: '所在城市', code: 'city' }, { label: '家庭详细地址', code: 'familyAddress' },
            { label: '家庭电话', code: 'familyTelNumber' }, { label: '邮政编码', code: 'postcode' }, { label: '特长', code: 'specialty' }, { label: '高中曾任职务', code: 'dutyInHighSchool' },
            { label: '高中曾获奖励', code: 'awardInHighSchool' }, { label: '科技竞赛获奖', code: 'isHadTechnologyCompetitionAward' }, { label: '父亲姓名', code: 'fatherName' }, { label: '父亲工作单位', code: 'fatherWorkUnit' },
            { label: '父亲工作单位地址', code: 'fatherWorkUnitAddress' }, { label: '父亲职务', ccode: 'fatherDuty' }, { label: '父亲邮编', code: 'fatherPostcode' }, { label: '父亲电话', code: 'fatherTelNumber' },
            { label: '母亲姓名', code: 'motherName' }, { label: '母亲工作单位', code: 'motherWorkUnit' }, { label: '母亲工作单位地址', code: 'motherWorkUnitAddress' }, { label: '母亲职务', code: 'motherDuty' },
            { label: '母亲邮编', code: 'motherPostcode' }, { label: '母亲电话', code: 'motherTelNumber' }, { label: '学业状态', code: 'studyStatus' }],
            personalInfoProperties: [{ label: '学号', code: "studentId" }, { label: '姓名', code: 'name' }, { label: '年级', code: 'grade' }, { label: '班级', code: 'studentClass' },
            { label: '性别', code: 'sex' }, { label: '职务', code: 'duty' }, { label: '宿舍', code: 'dormitory' }, { label: '联系方式', code: 'contactWay' },
            { label: '身份证号', code: 'idCardNumber' }, { label: 'QQ', code: 'qqNumber' }, { label: 'Email', code: 'email' }, { label: '出生年月', code: 'birthday' },
            { label: '身高', code: 'height' }, { label: '专业', code: 'major' }, { label: '政治面貌', code: 'politicalStatus' }, { label: '民族', code: 'ethnicGroup' },
            { label: '籍贯', code: 'birthOrigin' }, { label: '高考成绩/满分', code: 'collegeEntranceExamScore' }, { label: '高考英语成绩/满分', code: 'collegeEntranceExamEnglishScore' }, { label: '英语入学考试成绩', code: 'entranceExamEnglishScore' },
            { label: '家乡所在火车站', code: 'hometownRailwayStation' }, { label: '省份', code: 'province' }, { label: '所在城市', code: 'city' },
            { label: '邮政编码', code: 'postcode' }, { label: '特长', code: 'specialty' }, { label: '高中曾任职务', code: 'dutyInHighSchool' },
            { label: '高中曾获奖励', code: 'awardInHighSchool' }, { label: '科技竞赛获奖', code: 'isHadTechnologyCompetitionAward' }],
            familyInfoProperties: [{ label: '家庭详细地址', code: 'familyAddress' }, { label: '家庭电话', code: 'familyTelNumber' }, { label: '父亲姓名', code: 'fatherName' },
            { label: '父亲工作单位', code: 'fatherWorkUnit' }, { label: '父亲工作单位地址', code: 'fatherWorkUnitAddress' }, { label: '父亲职务', ccode: 'fatherDuty' },
            { label: '父亲邮编', code: 'fatherPostcode' }, { label: '父亲电话', code: 'fatherTelNumber' }, { label: '母亲姓名', code: 'motherName' },
            { label: '母亲工作单位', code: 'motherWorkUnit' }, { label: '母亲工作单位地址', code: 'motherWorkUnitAddress' }, { label: '母亲职务', code: 'motherDuty' },
            { label: '母亲邮编', code: 'motherPostcode' }, { label: '母亲电话', code: 'motherTelNumber' }],
            activeInfoName: 'allInfo',
            password: '',
            pwdDialogVisible: false,
            chooseStuInfo: ['学号', '姓名'],
            visible: false,
            nickname: 'Admin',
            loading: false
    },
    methods: {
        onSubmit: function () {
            //5、新增一条记录
            postData('newhelp/api/record', this.formInline, "POST")
                .then(data => {
                    console.log(data.data);
                    if (data.success) {

                    }
                }) // JSON from `response.json()` call
                .catch(error => console.error(error));
        },
        //8、搜索历史帮扶学生列表
        findHistoryTable: function () {
            postData('newhelp/api/historyArchives', this.beforStuInfTable, "GET")
                .then(data => {
                    console.log(data.data);
                    this.data.beforStuInfTable = data.data;
                }) // JSON from `response.json()` call
                .catch(error => console.error(error));
        },
        findHistoryDetail: function () {
            //9、查看历史帮扶学生详细信息
            postData('newhelp/api/historyArchive/{historyArchiveId}', {}, "GET")
                .then(data => {
                    console.log(data.data)
                }) // JSON from `response.json()` call
                .catch(error => console.error(error));
        },
        change_recorder: function (row) {
            this.changeRecorderDialog = true;
            console.log(row);
            //this.tempRecordInf = row;
        },
        change_record_inf: function (row) {
            this.changeRecordDialog = true;
            console.log(row);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        handleCloseHelp: function (tag) {//删除帮扶类型
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            console.log(tag);

            //12、删除帮扶类型
            var url = "newhelp/api/historyArchive/" + tag.name;
            postData(url, {}, "GET")
                .then(data => {
                    console.log(data.data)
                }) // JSON from `response.json()` call
                .catch(error => console.error(error));
        },
        
        handleCloseAttention: function (tag) {//删除关注类型
            //16、删除关注类型
            var url = "newhelp/api/attentionType/" + tag.name;
            postData(url, {}, "GET")
            .then(data => {
                console.log(data.data)
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.dynamicAttentionTags.splice(this.dynamicAttentionTags.indexOf(tag), 1);
        },
        showInputOne: function () {
            this.inputVisibleOne = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        
        handleInputConfirmOne: function () {
            let inputValueOne = this.inputValueOne;
            if (inputValueOne) {
                this.dynamicHelpTags.push(inputValueOne);
            }
            //11、添加帮扶类型
            postData('newhelp/api/helpType', inputValueOne, "POST")
            .then(data => {
                console.log(data.data);
                this.data.helpTagTable = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.inputVisibleOne = false;
            this.inputValueOne = '';
        },
        showInputTwo: function () {
            this.inputVisibleTwo = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
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
            postData('newhelp/api/attentionType', inputValueTwo, "POST")
            .then(data => {
                console.log(data.data);
                this.data.helpTagTable = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.inputVisibleTwo = false;
            this.inputValueTwo = '';
        },


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
            
            //15、修改关注类型
            /*postData('newhelp/api/attentionType', inputValueMod, "PUT")
            .then(data => {
                console.log(data.data);
                this.data.helpTagTable = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));*/
            this.dynamicAttentionTags[iden.index] = inputValueMod;

            this.inputValueMod = '';
        },



        //切换范围时候使用
        signOne: function () {
            console.log(this.sign);
            this.sign = 1;
        },
        signTwo: function () {
            this.sign = 2;
        },
        signThree: function () {
            console.log(this.sign);
            this.sign = 3;
        },
        signFour: function () {
            console.log(this.sign);
            this.sign = 4;
            //10、查看帮扶类型列表
            /*postData('newhelp/api/helpTypes', {}, "GET")
                .then(data => {
                    console.log(data.data);
                    this.data.helpTagTable = data.data;
                }) // JSON from `response.json()` call
                .catch(error => console.error(error));
            //13、查看关注类型列表*/
        },
        signFive: function () {
            console.log(this.sign);
            this.sign = 5;
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
          },
          handleIconClick(ev) {
            this.guideStudent = ev.studentId;g
            console.log(ev);
          },

          //第二部分的函数
          lookClick(row) {
            axios.get('newhelp/api/baseStudent/all/{row.studentId}')
                .then(function (res) {
                    if (res.success) {

                    }
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        changePhoto(event) {
            let img1 = event.target.files[0];
            let type = img1.type;//文件的类型，判断是否是图片
            let size = img1.size;//文件的大小，判断图片的大小
            if (this.imgData.accept.indexOf(type) == -1) {
                alert('请选择以下格式的图片：jpeg、jpg、png！');
                return false;
            }
            if (size > 3145728) {
                alert('请选择3M以内的图片！');
                return false;
            }
            var photo = ''
            let form = new FormData();
            form.append('studentId', this.allInfoSet.studentId);
            form.append('photoFile', img1);
            axios.post('/PhotoModify', form).then(response => {
                this.allInfoSet.photoUrl = response.photoUrl
                window.location.reload()
            }).catch(error => {
                alert('上传照片出错！');
            })
        },
        uploadPhoto() {
            $('#uploadPhoto').click();
        },
        backToTable() {
            $(".detailedInfo").hide();
            $(".defaultInfoTable").show();
        },
        saveSettings() {
            var allOptions = $(".chooseStuInfo").children();
            var count = 0;
            var thead = $(".allStuList").children().eq(0).children().children();
            var ifChecked = new Array(43);
            var count2 = 0;
            var count3 = 0;

            for (var i = 0; i < allOptions.length; i++) {
                ifChecked[i + 1] = 0;
                if (allOptions.eq(i).children().eq(1).is(':checked'))
                    count2++;
            }

            if (count2 <= 13 && count2 >= 6) {
                $(".allStuList").children().eq(1).children().each(function () {
                    $(this).children().each(function () {
                        $(this).css("display", "none");
                    })
                })

                for (var i = 0; i < 13; i++) {
                    $(".allStuList").children().eq(0).children().children().eq(i).css("display", "none");
                }

                count3 = count2;
                for (var i = 0; i < allOptions.length; i++) {
                    this.allStuInfo[i] = allOptions.eq(i).children().eq(0).html();
                    if (allOptions.eq(i).children().eq(1).is(':checked')) {
                        ifChecked[i + 1] = 1;
                        count++;
                    }
                    if (count <= count3 || count >= 4) {
                        $('#cover').css("display", "none");
                        var newSettings = JSON.stringify({
                            "exposeSettingId": $("#settingsId").val(),
                            "exposeStudentId": ifChecked[1],
                            "exposeName": ifChecked[2],
                            "exposeGrade": ifChecked[3],
                            "exposeStudentClass": ifChecked[4],
                            "exposeSex": ifChecked[5],
                            "exposeDuty": ifChecked[6],
                            "exposeDormitory": ifChecked[7],
                            "exposeContactWay": ifChecked[8],
                            "exposeIdCardNumber": ifChecked[9],
                            "exposeQqNumber": ifChecked[10],
                            "exposeEmail": ifChecked[11],
                            "exposeBirthday": ifChecked[12],
                            "exposeHeight": ifChecked[13],
                            "exposeMajor": ifChecked[14],
                            "exposePoliticalStatus": ifChecked[15],
                            "exposeEthnicGroup": ifChecked[16],
                            "exposeBirthOrigin": ifChecked[17],
                            "exposeCollegeEntranceExamScore": ifChecked[18],
                            "exposeCollegeEntranceExamEnglishScore": ifChecked[19],
                            "exposeEntranceExamEnglishScore": ifChecked[20],
                            "exposeHometownRailwayStation": ifChecked[21],
                            "exposeProvince": ifChecked[22],
                            "exposeCity": ifChecked[23],
                            "exposeFamilyAddress": ifChecked[24],
                            "exposeFamilyTelNumber": ifChecked[25],
                            "exposePostcode": ifChecked[26],
                            "exposeSpecialty": ifChecked[27],
                            "exposeDutyInHighSchool": ifChecked[28],
                            "exposeAwardInHighSchool": ifChecked[29],
                            "exposeIsHadTechnologyCompetitionAward": ifChecked[30],
                            "exposeFatherName": ifChecked[31],
                            "exposeFatherWorkUnit": ifChecked[32],
                            "exposeFatherWorkUnitAddress": ifChecked[33],
                            "exposeFatherDuty": ifChecked[34],
                            "exposeFatherPostcode": ifChecked[35],
                            "exposeFatherTelNumber": ifChecked[36],
                            "exposeMotherName": ifChecked[37],
                            "exposeMotherWorkUnit": ifChecked[38],
                            "exposeMotherWorkUnitAddress": ifChecked[39],
                            "exposeMotherDuty": ifChecked[40],
                            "exposeMotherPostcode": ifChecked[41],
                            "exposeMotherTelNumber": ifChecked[42],
                            "exposeStudyCondition": ifChecked[43]
                        })
                    }
                }

                //返回最新设置
                $.ajax({
                    url: "http://" + ip() + "/newhelp/api/exposeSetting",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", token);
                    },
                    type: "PUT",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    data: newSettings,
                    success: function (data) {
                        $("#cover".css("display", "none"));
                    },
                    error: function () {
                        alert("修改失败！");
                    }
                })
            } else {
                alert("请选择5～12项");
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        exportSelectedData() {
            // var all = $("#allChosenInfo").children();//
            var studentID = [];
            // var settings = sessionStorage.getItem("newSettings");
            for (var i = 0; i < this.multipleSelection.length; i++) {
                var Id = multipleSelection[i].studentId;
                studentID.push(Id);
            }
            var json = JSON.stringify({
                "studentIds": studentId,
                "teacherId": sessionStorage.getItem("userName")
            })
            $("#formRecord").attr("action", "http://" + ip() + "/newhelp/api/export/baseStudent")
            $("#form_Id").val(json);
            $("#weektoken").val(token);
            // $("#form_settings").val(settings);
            $("#form_submit").click();
        },
        uploadInfo() {
            this.pwdDialogVisible = true
            if (this.password) {
                var token = sessionStorage.getItem("token");
                var form = new FormData();
                var file = $("#fileExcel").files[0];
                form.append('file', file);
                form.append('password', thid.password);
                // form.append('settings',sessionStorage.getItem("newSettings"));
                form.append('teacherId', sessionStorage.getItem("userName"));
                $.ajax({
                    url: "http://" + this.ip() + "/newhelp/api/import/baseStudent",
                    type: "POST",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", token);
                    },
                    data: form,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    success: function (data) {
                        alert(data.message);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown, data) {
                        alert("上传失败" + XMLHttpRequest.status);
                    }
                })
            }
        },
        uploadExcel() {
            $("#fileExcel").click();
        },
        downloadTemplate() {
            $("#downloadFile").click();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        showSettings() {
            $('#cover').css('display', 'block');
        },
        hideSettings() {
            $('#cover').css('display', 'none');
        },
        toggle(val) {
            this.sign = val;
        },
        onSubmit() {
            console.log('submit!');
        },
        logout() {
            this.$confirm('确认退出登录吗？', '提示', {
                confirmButtonClass: 'el-button-warning'
            }).then(() => {
                localStorage.clear();
                window.location.href = "../index.html";
            })
        }
    },
    created() {
        //7、查看历史帮扶学生列表
        postData('newhelp/api/historyArchives/{teacherId}', {}, "GET")
            .then(data => {
                console.log(data.data);
                this.data.beforStuInfTable = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
        //2、查看记录列表
        postData('newhelp/api/records/{recordName}/{studentId}', {}, "GET")
            .then(data => {
                console.log(data.data);
                this.data.record_table = data.data;
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
            this.nickname = localStorage.teacherName;
    },
    mounted() {
        this.students = this.loadAll();
    },
});
function postData(url, data, method) {//使用fetch进行发送数据
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
};
function ReplaceSensitivityChar(str) {//防止XSS
    var s = str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\'/g, "&#39;")
        .replace(/\"/g, "&quot;");
    return s;
}
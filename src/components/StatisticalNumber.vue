<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
        <el-form-item label="民族">
            <el-select v-model="formInline.ethnicGroup">
                <el-option v-for="ethnicGroup in allNations" :label='ethnicGroup' :value="ethnicGroup"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchStu">人数查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div :id="this.main" style="display:inline-block;width:550px;height:400px;"></div>
    <div id="sex-ratio" style="display:inline-block;width:550px;height:400px"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    data(){
        return{
            main:'main',
            toBeSentKeywords:JSON.stringify({}),
            allNations:[
                "汉族","壮族","满族","回族","苗族","维吾尔族","土家族","彝族","蒙古族","藏族","布依族","侗族",
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
            formInline:{
                college:"信息与软件工程学院",
                grade:"",
                major:"",
                studentClass:"",
                politicalStatus: '',
                name:"",
                studentId:"",
                birthOrigin:"",
                ethnicGroup:""
            },
            // 指定图表的配置项和数据
            option:{
                color: ['#61a0a8','#c23531','#2f4554', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                 title: {
                     text: '学业状态',
                     subtext: '在校：700人\n休学：6人\n退学：11人'
                    },
                tooltip:{},
                series:[{
                    itemStyle:{
                        emphasis: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    name:'学业状态',
                    type:'pie',
                    data:[
                        {value:700,name:'在校'},
                        {value:6,name:'休学'},
                        {value:11,name:'退学'}
                    ]
                }]
            },
            option2:{
                title:{
                    text:'男女比例',
                    subtext:'男生：550人\n女生：150人'
                },
                tooltip:{},
                series:[{
                    itemStyle:{
                    emphasis: {
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                name:'男女比例',
                type:'pie',
                data:[
                    {value:550,name:'男'},
                    {value:150,name:'女'}
                ]
            }]
            },
    }
    },
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option,true);
        var myChart2 = echarts.init(document.getElementById('sex-ratio'),'light');
        myChart2.setOption(this.option2,true)
    },
    created(){
        var studyCondition=this.option.series[0].data
        var sex = this.option2.series[0].data
        for(var i=0;i<this.option.series[0].data.length;i++)
        {
            studyCondition[i].value=0
        }
        this.option.title.subtext='在校：'+studyCondition[0].value+'人\n休学：'+studyCondition[1].value+'人\n退学：'+studyCondition[2].value+'人';
        for(var i=0;i<this.option2.series[0].data.length;i++)
        {
            sex[i].value=0
        }
        this.option2.title.subtext='男生：'+sex[0].value+'人\n女生：'+sex[1].value+'人';
    },
    methods:{
        searchStu(){
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
            "motherTelNumber":""
        });
        var self=this
        $.ajax({
            url:"http://"+self.Global.ipAddr+"/newhelp/api/baseStudent/count",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",sessionStorage.getItem('token'));
            },
            type:"POST",
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            data:this.toBeSentKeywords,
            success:function(res){
            if(res.success){
                var studyCondition=self.option.series[0].data
                var sex = self.option2.series[0].data
                sex[0].value=res.data.male
                sex[1].value=res.data.female
                studyCondition[0].value=res.data.currentStuNum
                studyCondition[1].value=res.data.suspendedStuNum
                studyCondition[2].value=res.data.dropoutStuNum
                self.option.title.subtext='在校：'+studyCondition[0].value+'人\n休学：'+studyCondition[1].value+'人\n退学：'+studyCondition[2].value+'人';
                self.option2.title.subtext='男生：'+sex[0].value+'人\n女生：'+sex[1].value+'人';
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                var myChart2 = echarts.init(document.getElementById('sex-ratio'),'light');
        
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(self.option);
                myChart2.setOption(self.option2)
            }else{
                alert("数据获取错误");
            }
            },
            error:function(){
                alert("数据获取错误");
            },
        });
    },
    }
}
</script>

<style scoped>
</style>
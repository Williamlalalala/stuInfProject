import Vue from 'vue'
import Router from 'vue-router'
import BasicStudent from './components/BasicStudent'
import HistoricStudents from './components/HistoricStudents'
import StatisticalNumber from './components/StatisticalNumber'
import Login from './components/Login'
import StudentManage from './components/StudentManage'
import ArchivedStudent from './components/ArchivedStudent'
import NewRecord from './components/NewRecord'
import ArchiveRecord from './components/ArchiveRecord'
import HelpType from './components/HelpType'

Vue.use(Router)

let router = new Router({
  routes: [
    {path:'/',name:'login',component:Login},
    {path:'/manage',name:'studentManage',component:StudentManage,redirect:'/basicStudent',
    children:[
      {path:'/helpType',name:'helpType',component:HelpType},
      {path:'/archiveRecord',name:'archiveRecord',component:ArchiveRecord},
      {path:'/newRecord',name:'newRecord',component:NewRecord},
      {path:'/archivedStudent',name:'archivedStudent',component:ArchivedStudent},
      {path:'/basicStudent',name:'basicStudent',component:BasicStudent},
      {path:'/historicStudents',name:'historicStudents',component:HistoricStudents},
      {path:'/statisticalNumber',name:'statisticalNumber',component:StatisticalNumber}
    ]}
  ],
  mode:'history'
})

export default router
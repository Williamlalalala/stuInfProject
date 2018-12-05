<template>
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
              <el-button type="primary" mini @click="submitPhotos">上传</el-button>
              <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
          </div>
      </div>
</template>
<script>
export default {
  data () {
            return {
                imgList: [],
                size: 0
            }
        },
        methods: {
            submitPhotos(){
                var self=this
                var token = sessionStorage.getItem("token");
                var form = new FormData();
                for(var i=0;i<self.imgList.length;i++){
                    form.append('file'+i,self.imgList[i])
                }
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
                    },
                    error:function(XMLHttpRequest,textStatus,errorThrown,data){
                        alert("上传照片失败"+XMLHttpRequest.status);
                    }
                })
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
    width: 770px;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
}

.hello {
    width: 770px;
    text-align: center;
}
</style>

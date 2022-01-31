<template>
  <div class="main">
    <div class="content">
      <div class="header">专项练习</div>
      <div class="test">
        <div class="picture">
          <img :src="src" />
        </div>
        <div class="res">
          <div class="res-option">
            <span class="res-title"> 上图病理图片是：</span>
            <el-input v-model="input" placeholder="请输入" clearable />
          </div>
          <div class="res-button">
            <el-button
              type="danger"
              size="large"
              class="bottom-button"
              @click="submit"
              >提交</el-button
            >
            <el-button
              type="success"
              size="large"
              class="bottom-button"
              @click="nextTest"
              >下一题</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getExercises } from "@/service/api/index";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "",
  components: {},
  setup() {
    // 选项值
    var answer = "";
    const src = ref("");
    // const radio1 = ref("");
    const input = ref("");

    // const radios = reactive([]);
    var isRes = 0;
    const submit = () => {
      isRes = 1;
      if (answer == input.value) {
        ElMessage({
          message: "恭喜，答对啦！",
          type: "success",
          duration: 2000,
        });
        return true;
      } else if (input.value) {
        ElMessage({
          dangerouslyUseHTMLString: true,
          message: "回答错误！正确答案是：<strong>" + answer + "</strong>",
          type: "error",
          duration: 8000,
          showClose: true,
        });
      } else if (input.value == "") {
        ElMessage({
          dangerouslyUseHTMLString: true,
          message: "未作答！正确答案是：<strong>" + answer + "</strong>",
          type: "error",
          duration: 8000,
          showClose: true,
        });
      }
      return false;
    };
    function get() {
      getExercises().then((res) => {
        // const options = res.Option;
        // options.forEach((i: never) => {
        //   radios.push(i);
        // });
        answer = res.answer;
        answer = answer.trim();
        if (answer.indexOf("-") > -1) {
          answer = answer.split("-")[1].substr(1);
          answer = answer.trim();
        }
        src.value = res.picturePath;
      });
    }
    get();
    var nextTest = function () {
      ElMessage.closeAll();
      if (isRes == 1) {
        // radios.length = 0;
        input.value = "";
        answer = "";
        src.value = "";
        isRes = 0;
        get();
      } else if (isRes == 0) {
        if (submit()) {
          nextTest();
        }
      }
    };
    return {
      submit,
      src,
      nextTest,
      input,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .content {
    margin: 30px;
    width: 998px;
    background: #fff;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(224, 224, 224);
    .header {
      padding: 20px;
      width: 100%;
      border-bottom: 1px solid rgb(238, 238, 238);
      font-size: 20px;
      display: inline-block;
      vertical-align: middle;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-wrap: normal;
    }
    .test {
      padding: 15px;
      .picture {
        width: 100%;
        height: 529px;
        padding-bottom: 15px;
        img {
          // width: 700px;
          height: 510px;
          position: relative;
          // background-size: 100%;
          // background:;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .ques {
        padding: 15px 0px;
      }
      .res {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        .res-option {
          height: 53px;
          /* padding-top: 2px; */
          display: flex;
          align-items: center;
          .res-title {
            width: 200px;
          }
        }
        .bottom-button {
          width: 100px;
        }
        .radio {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>

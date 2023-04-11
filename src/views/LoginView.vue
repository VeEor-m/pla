<template>
  <div class="login_box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" clearable/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button class="login_button" type="primary" @click="submitForm(ruleFormRef)"
        >登录
        </el-button
        >
        <el-button class="login_button" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue'
import {LoginData} from "../type/login";
import type {FormInstance} from "element-plus";
import {login} from "../request/api";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 8,
          message: '账号的长度必须在 3 - 8之间',
          trigger: 'blur'
        },
      ],
      password: [
        {
          required: true,
          message: '请输入你的密码',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 8,
          message: '密码的长度在 3 - 5之间',
          trigger: 'blur'
        },
      ]
    };
    //登录
    const ruleFormRef = ref<FormInstance>()
    //重置
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    }
    const router = useRouter();
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            localStorage.setItem("uid", res.data.uid)
            console.log(res)
            router.push('/index')
          })
          // console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
      // console.log(formEl);
    }
    return {...toRefs(data), rules, ruleFormRef, resetForm, submitForm}
  }
})
</script>

<style lang="scss">
.login_box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg1.jpg");
  background-size: cover;
  padding: 1px;
  text-align: center;

  .ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: rgba(252, 252, 252, 0.3);
    padding: 40px;
    border-radius: 20px;
  }

  .login_button {
    width: 48%;
  }

  h2 {
    margin-bottom: 20px;
  }
}

</style>
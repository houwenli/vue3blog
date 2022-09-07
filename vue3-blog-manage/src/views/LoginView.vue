<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名：" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        v-model="ruleForm.pass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登陆</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { LoginData } from '../type/login'
import { FormInstance } from 'element-plus'
import { login, loginApiData } from '../request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    // router
    const router = useRouter()
    // 登陆
    const ruleFormRef = ref<FormInstance>()

    const data = reactive(new LoginData())
    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 10, message: '账号长度在3-10之间', trigger: 'blur' },
      ],
      pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '账号长度在3-10之间', trigger: 'blur' },
      ]
    }


    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid, invalidFields) => {
        if (valid) {
          const loginData:loginApiData = {
            username: data.ruleForm.username,
            password: data.ruleForm.pass
          }
          login(loginData).then((res: any) => {
            console.log(res)
            // 登陆成功，跳转页面
            router.push({
              name: 'home'
            })
          }).catch((err: Error) => {
            console.log(err)
          })
        } else {
          console.log('error submit!', invalidFields)
          return false
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    

    return {
      ...toRefs(data), 
      rules,
      submitForm,
      ruleFormRef,
      resetForm
    }
  }
})
</script>

<style scoped>

</style>


<template>
  <Dialog :buttons="dialogConfig.buttons" :show="dialogConfig.show" :showCancel="false" :title="dialogConfig.title"
    @close="dialogConfig.show = false">
    <el-form ref="formDateRef" :model="formData" :rules="rules" class="login-register">
      <!-- input输入 -->
      <el-form-item prop="email">
        <el-input size="large" v-model="formData.email" placeholder="请输入邮箱" maxlength="150">
          <template #prefix>
            <span class="iconfont icon-account">
            </span>
          </template>
        </el-input>
      </el-form-item>
      <!--      登陆密码-->
      <el-form-item prop="password" v-if="opType === 1">
        <el-input :type="passwordEyeType.passwordEyeOpen ? 'text' : 'password'" size="large" v-model="formData.password"
          placeholder="请输入密码">
          <template #prefix>
            <span class="iconfont icon-password">
            </span>
          </template>
          <template #suffix>
            <span @click="eyeChange('passwordEyeOpen')"
              :class="['iconfont', passwordEyeType.passwordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
          </template>
        </el-input>
      </el-form-item>
      <div v-if="opType === 0 || opType === 2">
        <el-form-item prop="emailCode">
          <div class="send-email-panel">
            <el-input size="large" v-model="formData.emailCode" placeholder="请输入邮箱验证码">
              <template #prefix>
                <span class="iconfont icon-checkcode">
                </span>
              </template>
            </el-input>
            <el-button type="primary" @click="showSendEmailDialog" size="large" class="send-email-btn">
              获取验证码
            </el-button>
          </div>
          <div>
            <el-popover placement="left" width="450px" :trigger="['click']">
              <div>
                <p>如果没有收到验证码，请在垃圾箱中查看</p>
              </div>
              <template #reference>
                <span class="a-link" :style="{ 'font-size': '14px' }">未收到邮箱验证码？</span>
              </template>
            </el-popover>
          </div>

        </el-form-item>
        <el-form-item prop="nickName" v-if="opType === 0">
          <el-input size="large" v-model="formData.nickName" placeholder="请输入昵称" maxlength="20">
            <template #prefix>
              <span class="iconfont icon-account">
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="registerPassword">
          <el-input :type="passwordEyeType.registerPasswordEyeOpen ? 'text' : 'password'" size="large"
            v-model="formData.registerPassword" placeholder="请输入密码">
            <template #prefix>
              <span class="iconfont icon-password">
              </span>
            </template>
            <template #suffix>
              <span @click="eyeChange('registerPasswordEyeOpen')"
                :class="['iconfont', passwordEyeType.registerPasswordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="reRegisterPassword">
          <el-input :type="passwordEyeType.reRegisterPasswordEyeOpen ? 'text' : 'password'" size="large"
            v-model="formData.reRegisterPassword" placeholder="请再次输入密码">
            <template #prefix>
              <span class="iconfont icon-password">
              </span>
            </template>
            <template #suffix>
              <span @click="eyeChange('reRegisterPasswordEyeOpen')"
                :class="['iconfont', passwordEyeType.reRegisterPasswordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
            </template>
          </el-input>
        </el-form-item>
      </div>

      <el-form-item prop="checkCode">
        <div class="check-code-panel">
          <el-input size="large" v-model="formData.checkCode" placeholder="请输入验证码">
            <template #prefix>
              <span class="iconfont icon-checkcode">
              </span>
            </template>
          </el-input>
          <div class="check-code">
            <img :src="checkCodeUrl" @click="changeCheckCode(0)" alt="验证码" />
          </div>
        </div>
      </el-form-item>
      <el-form-item v-if="opType === 1">
        <div class="rememberme-panel" :style="{ 'text-align': 'left' }">
          <el-checkbox v-model="formData.rememberMe">记住密码</el-checkbox>
        </div>
        <div class="no-account">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">忘记密码</a>
          <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">没有账户</a>
        </div>
      </el-form-item>
      <el-form-item v-if="opType === 0 || opType === 2">
        <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">已有账户</a>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="op-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </Dialog>
  <Dialog :show="dialogConfigForSendMailCode.show" :title="dialogConfigForSendMailCode.title"
    :buttons="dialogConfigForSendMailCode.buttons" width="500px" :showCancel="false"
    @close="dialogConfigForSendMailCode.show = false">
    <el-form :model="formDataForSendMailCode" :rules="rules" ref="formDateForSendMailCodeRef">
      <!-- input输入 -->
      <el-form-item label="email">
        {{ formData.email }}
      </el-form-item>
      <el-form-item prop="checkCode" label="验证码">
        <div class="check-code-panel">
          <el-input size="large" v-model="formDataForSendMailCode.checkCode" placeholder="请输入验证码">
            <template #prefix>
              <span class="iconfont icon-checkcode">
              </span>
            </template>
          </el-input>
          <div class="check-code">
            <img :src="checkCodeForSendMailUrl" @click="changeCheckCode(1)" alt="验证码" />
          </div>
        </div>
      </el-form-item>

    </el-form>
  </Dialog>
</template>

<script setup>
// 0 注册 1 登录 2 找回密码
import { ref, reactive, getCurrentInstance, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const api = {
  checkCode: '/api/checkCode',
  sendMailCode: '/sendMailCode',
};


const opType = ref();
const showPanel = (type) => {
  opType.value = type;
  resetForm();
};
defineExpose({ showPanel });

// 验证码
const checkCodeUrl = ref(api.checkCode);
const checkCodeForSendMailUrl = ref(api.checkCode);
const changeCheckCode = (type) => {
  if (type === 0)
    checkCodeUrl.value = api.checkCode + '?type=' + type + '&time=' + new Date().getTime();
  else {
    checkCodeForSendMailUrl.value = api.checkCode + '?type=' + type + '&time=' + new Date().getTime();
  }
};

// 密码显示隐藏
const passwordEyeType = reactive({
  passwordEyeOpen: false,
  registerPasswordEyeOpen: false,
  reRegisterPasswordEyeOpen: false
})
const eyeChange = (type) => {
  passwordEyeType[type] = !passwordEyeType[type];

}

// 发送邮箱验证码弹窗
const formDataForSendMailCode = ref({});
const formDateForSendMailCodeRef = ref();
const dialogConfigForSendMailCode = reactive({
  show: false,
  title: '发送邮箱验证码',
  buttons: [
    {
      text: '发送验证码',
      type: 'primary',
      click: () => {
        sendEmailCode();
      }
    }
  ],
});

const showSendEmailDialog = () => {
  formDateRef.value.validateField("email", (valid) => {
    if (!valid) {
      return;
    }
    dialogConfigForSendMailCode.show = true;
    nextTick(() => {
      changeCheckCode(1);
      formDateForSendMailCodeRef.value.resetFields();
      formDataForSendMailCode.value = {
        email: formData.value.email,
      }
    })
  })
}

// 发送邮件
const sendEmailCode = () => {
  formDateForSendMailCodeRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    const params = Object.assign({}, formDataForSendMailCode.value);
    params.type = 0;
    let result = await proxy.Request({
      url: api.sendMailCode,
      params: params,
      errorCallback:()=>{
        changeCheckCode(1);
      }
    });
    if (!result) {
      return;
    }
    proxy.Message.success('验证码发送成功，请登陆邮箱查看');
    dialogConfigForSendMailCode.show = false;
  });
}

const dialogConfig = reactive({
  show: false,
  title: '标题',
});
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
};
const formData = ref({});
const formDateRef = ref();
const rules = ref({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: proxy.Verify.email, message: '请输入正确的邮箱', trigger: 'blur' }
  ],

  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  nickName: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ],
  registerPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: proxy.Verify.password, message: '密码只能包含数字，字母，特殊字符，长度在6-18位', trigger: 'blur' }
  ],
  reRegisterPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkRePassword, message: '两次输入的密码不一致', trigger: 'blur' }
  ],
  checkCode: [
    { required: true, message: '请输入图片验证码' },
  ]
});

// 重置表单
const resetForm = () => {
  dialogConfig.show = true;
  if (opType.value === 0) {
    dialogConfig.title = '注册';
  } else if (opType.value === 1) {
    dialogConfig.title = '登录';
  } else if (opType.value === 2) {
    dialogConfig.title = '重置密码';
  }

  nextTick(() => {
    changeCheckCode(0);
    formDateRef.value.resetFields();
  });
};
</script>

<style lang="scss" scoped>
.login-register {
  .send-email-panel {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .send-email-btn {
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .check-code-panel {
    display: flex;

    .check-code {
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .rememberme-panel {
    width: 100%;
  }

  .no-account {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .op-btn {
    width: 100%;
  }
}
</style>

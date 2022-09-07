interface LoginForm {
    username: string,
    pass: string
}

class LoginData {
    ruleForm: LoginForm = {
        username: '',
        pass: ''
    }
}

export {
    LoginData
}
"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = function (data) {
    ApiConnector.login(data, response => {
        if (response.success === true) {
            location.reload();
        } else {
            this.setLoginErrorMessage(JSON.stringify(response.error));
        }
    })
}

userForm.registerFormCallback = function (data) {
    ApiConnector.register(data, response => {
        if (response.userId) {
            this.setRegisterErrorMessage(`Пользователь с логином ${data.login} успешно зарегистрирован`);
            setTimeout(() => {
                location.reload()
            }, 3000);
        } else {
            this.setRegisterErrorMessage(`Пользователь с логином ${data.login} уже зарегистрирован`);
        }
    })
}






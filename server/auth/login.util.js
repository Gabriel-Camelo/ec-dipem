class Login {
    constructor() {
        this.login = this.login.bind(this);
    }

    isLogged() {

    }

    login(req, res) {
        const { login, password } = req.body;
    }

    logout() {}
}
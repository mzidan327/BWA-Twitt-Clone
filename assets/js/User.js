class User {
  constructor() {
    this._users = null;
  }

  getUSers() {
    if (this._users === null) {
      try {
        const storedUser = localStorage.getItem("users");
        this._users = storedUser ? JSON.parse(storedUser) : [];
      } catch (error) {
        return (this._users = []);
      }
    }
    return this._users;
  }

  saveUser(userData) {
    // melakukan proses validasi
    const { name, username, avatar, password } = userData;

    if (typeof name !== "string" || name.trim() === "") {
      return {
        success: false,
        error: "name is missing",
      };
    }

    if (typeof username !== "string" || username.trim() === "") {
      return {
        success: false,
        error: "username is missing",
      };
    }

    if (typeof avatar !== "string" || avatar.trim() === "") {
      return {
        success: false,
        error: "avatar is missing",
      };
    }

    if (typeof password !== "string" || password.trim() === "") {
      return {
        success: false,
        error: "password is missing",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        error: "password password at least 8 character",
      };
    }

    const newUser = {
      id: Date.now(),
      isActive: true,
      ...userData,
    };

    const users = this.getUSers();
    users.push(newUser);

    try {
      localStorage.setItem("users", JSON.stringify(users));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  userSignIn(userData) {
    // melakukan proses validasi
    const { username, password } = userData;

    if (typeof username !== "string" || username.trim() === "") {
      return {
        success: false,
        error: "username is missing",
      };
    }

    if (typeof password !== "string" || password.trim() === "") {
      return {
        success: false,
        error: "password is missing",
      };
    }

    const userExists = this.getUSers().some(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );

    if (userExists) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "username atau password salah",
      };
    }
  }
}

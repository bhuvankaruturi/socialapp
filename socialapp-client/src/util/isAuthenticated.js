import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
    let token = localStorage.getItem('fbScaTok');
    if (token) {
        let decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('fbScaTok');
            localStorage.setItem('username', '');
            window.location.href = "/";
            return false;
        } else {
            return true;
        }
    }
}

export default isAuthenticated;
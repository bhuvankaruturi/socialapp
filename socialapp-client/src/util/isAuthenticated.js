import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
    let token = localStorage.getItem('fbScaTok');
    if (token) {
        let decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('fbScaTok');
            window.location.href = "/";
            return {authenticated: false};
        } else {
            return {
                authenticated: true, 
                token
            };
        }
    } else {
        return {
            authenticated: false
        }
    }
}

export default isAuthenticated;
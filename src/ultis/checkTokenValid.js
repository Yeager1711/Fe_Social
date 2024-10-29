// auth.js
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export const checkAccessToken = () => {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
        // Hiển thị SweetAlert2 để thông báo đăng nhập
        Swal.fire({
            title: 'Đăng nhập',
            text: 'Vui lòng đăng nhập để tiếp tục.',
            icon: 'warning',
            confirmButtonText: 'Đến trang đăng nhập',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'http://localhost:3001/SocializeIt/auth/login';
            }
        });
        return false; 
    }
    return true; 
};

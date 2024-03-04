import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const encryptionKey = 'secret-key';

const decryptedRoleId = () => {
    const ciphertext = Cookies.get('role');
    if (ciphertext) {
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
            const role = bytes.toString(CryptoJS.enc.Utf8);
            return role;
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
    return null;
};

export default decryptedRoleId
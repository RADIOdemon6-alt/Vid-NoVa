const firebaseConfig = {
    apiKey: "AIzaSyDTGtpFenZfbW9XkMPNtLJcwd7hgkvIIAc",
    authDomain: "radio-9d77f.firebaseapp.com",
    projectId: "radio-9d77f",
    storageBucket: "radio-9d77f.firebasestorage.app",
    messagingSenderId: "691489118771",
    appId: "1:691489118771:web:3e1f85d98273cea310e146"
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const userDashboard = document.getElementById('userDashboard');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const logoutBtn = document.getElementById('logoutBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const successText = document.getElementById('successText');
const errorText = document.getElementById('errorText');

const displayUsername = document.getElementById('displayUsername');
const displayEmail = document.getElementById('displayEmail');
const displayUserId = document.getElementById('displayUserId');

function showMessage(message, isError = false) {
    hideMessages();
    if (isError) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    } else {
        successText.textContent = message;
        successMessage.classList.remove('hidden');
    }
    setTimeout(hideMessages, 3000);
}

function hideMessages() {
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

function switchToLogin() {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    hideMessages();
}

function switchToRegister() {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    hideMessages();
}

function showDashboard() {
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    userDashboard.classList.remove('hidden');
}

function hideDashboard() {
    userDashboard.classList.add('hidden');
    switchToLogin();
}

function generateTimedPasswordHash(password, expirationMinutes = 60) {
    const expirationTime = Date.now() + (expirationMinutes * 60 * 1000);
    return {
        hash: btoa(password),
        expiresAt: expirationTime,
        isActive: true
    };
}

function isTimedPasswordValid(timedPasswordData) {
    if (!timedPasswordData || !timedPasswordData.isActive) return false;
    return Date.now() < timedPasswordData.expiresAt;
}

async function registerUser(username, email, password, timedPassword) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            username,
            email,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isRegistered: true
        };

        if (timedPassword?.trim()) {
            userData.timedPassword = generateTimedPasswordHash(timedPassword, 60);
        }

        await setDoc(doc(db, 'users', user.uid), userData);
        showMessage('تم التسجيل بنجاح!');

        setTimeout(() => {
            window.location.href = '../assets/Effects/intro.html';
        }, 1000);

        return user;
    } catch (error) {
        console.error('خطأ في التسجيل:', error);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            lastLogin: serverTimestamp()
        }, { merge: true });

        showMessage('تم تسجيل الدخول بنجاح!');

        setTimeout(() => {
            window.location.href = '../assets/Effects/intro.html';
        }, 1000);

        return user;
    } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        throw error;
    }
}

async function logoutUser() {
    try {
        await signOut(auth);
        showMessage('تم تسجيل الخروج بنجاح.');
    } catch (error) {
        console.error('خطأ في تسجيل الخروج:', error);
        showMessage('خطأ في تسجيل الخروج.', true);
    }
}

async function loadUserData(user) {
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            displayUsername.textContent = data.username || 'N/A';
            displayEmail.textContent = user.email;
            displayUserId.textContent = user.uid;

            if (data.timedPassword && !isTimedPasswordValid(data.timedPassword)) {
                await updateDoc(doc(db, 'users', user.uid), {
                    'timedPassword.isActive': false
                });
                showMessage('كلمة المرور المؤقتة انتهت صلاحيتها.', true);
            }
        }
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
        showMessage('حدث خطأ أثناء تحميل البيانات.', true);
    }
}

showRegisterLink?.addEventListener('click', e => {
    e.preventDefault();
    switchToRegister();
});

showLoginLink?.addEventListener('click', e => {
    e.preventDefault();
    switchToLogin();
});

loginFormElement?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const button = e.target.querySelector('button[type="submit"]');

    showLoading(button);
    hideMessages();

    try {
        await loginUser(email, password);
    } catch (error) {
        const messages = {
            'auth/user-not-found': 'لا يوجد حساب بهذا البريد.',
            'auth/wrong-password': 'كلمة المرور خاطئة.',
            'auth/invalid-email': 'البريد الإلكتروني غير صالح.',
            'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً.'
        };
        showMessage(messages[error.code] || 'فشل تسجيل الدخول.', true);
    } finally {
        hideLoading(button);
    }
});

registerFormElement?.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const timedPassword = document.getElementById('timedPassword').value;
    const button = e.target.querySelector('button[type="submit"]');

    if (username.trim().length < 3) return showMessage('الاسم قصير جداً.', true);
    if (password.length < 6) return showMessage('كلمة المرور قصيرة جداً.', true);

    showLoading(button);
    hideMessages();

    try {
        await registerUser(username, email, password, timedPassword);
        registerFormElement.reset();
    } catch (error) {
        const messages = {
            'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل.',
            'auth/invalid-email': 'البريد الإلكتروني غير صالح.',
            'auth/weak-password': 'كلمة المرور ضعيفة.'
        };
        showMessage(messages[error.code] || 'فشل التسجيل.', true);
    } finally {
        hideLoading(button);
    }
});

logoutBtn?.addEventListener('click', logoutUser);

onAuthStateChanged(auth, async user => {
    if (user) {
        await loadUserData(user);
        showDashboard();
    } else {
        hideDashboard();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    hideMessages();
    const user = auth.currentUser;
    if (user) {
        loadUserData(user);
        showDashboard();
    } else {
        switchToLogin();
    }
});

window.checkTimedPasswordStatus = async userId => {
    try {
        const docSnap = await getDoc(doc(db, 'users', userId));
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.timedPassword) {
                return {
                    isValid: isTimedPasswordValid(data.timedPassword),
                    expiresAt: new Date(data.timedPassword.expiresAt),
                    timeRemaining: data.timedPassword.expiresAt - Date.now()
                };
            }
        }
        return null;
    } catch (err) {
        console.error('فشل التحقق من كلمة المرور المؤقتة:', err);
        return null;
    }
};

window.firebaseAuth = {
    registerUser,
    loginUser,
    logoutUser,
    checkTimedPasswordStatus
};

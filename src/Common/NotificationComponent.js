import { store } from 'react-notifications-component';
const notification = (nType, title, message = " ") => {
    store.addNotification({
        title: title,
        message: message,
        type: nType,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}

export default notification;
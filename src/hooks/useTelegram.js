const tg = window.Telegram.WebApp;

export const useTelegram = () => {
    const onClose = () => {
        tg.close();
    };

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        user: tg.initDataUnsafe?.user,
        tg,
        onClose,
        onToggleButton,
    }
}
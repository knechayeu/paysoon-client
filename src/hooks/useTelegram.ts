const webApp = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    webApp.close();
  };

  const onToggleButton = () => {
    if (webApp.MainButton.isVisible) {
      webApp.MainButton.hide();
    } else {
      webApp.MainButton.show();
    }
  };

  return {
    user: webApp.initDataUnsafe?.user,
    tg: webApp,
    onClose,
    onToggleButton,
  };
};

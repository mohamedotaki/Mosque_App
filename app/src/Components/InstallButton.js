import React, { useEffect, useState } from "react";

const InstallButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
      style={{ backgroundColor: "inherit", border: "0", color: "green" }}
    >
      Click here to install the app
    </button>
  );
};

export default InstallButton;

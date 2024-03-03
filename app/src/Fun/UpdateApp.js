import { useEffect } from "react";
import { getAppVersion } from "../db/dbFunctions";
import { getAppVersion_localDb, setAppVersion_localDb } from "../db/local_db";

export default function UpdateApp() {
  useEffect(() => {
    getAppVersion().then((serverVersion) => {
      if (
        serverVersion !== getAppVersion_localDb() &&
        serverVersion !== "9999" &&
        serverVersion !== undefined
      ) {
        setAppVersion_localDb(serverVersion);
        window.location.reload(true);
      }
    });
  }, []);
}

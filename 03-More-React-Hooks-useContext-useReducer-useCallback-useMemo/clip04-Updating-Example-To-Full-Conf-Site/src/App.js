import React from "react";
import Home from "./Home";
import Speakers from "./Speakers";

export const ConfigContext = React.createContext();

function pageToShow(pageName) {
  if (pageName === "Home" || pageName === "/*") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
}
const configValue = {
  showSignMeUp: true,
  showSpeakerSpeakingDays: false
};

export default function App({ pageName }) {
  return (
    <ConfigContext.Provider value={configValue}>
      <div>{pageToShow(pageName)}</div>
    </ConfigContext.Provider>
  );
}

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
  useMemo
} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import speakersReducer from "./hooks/useSpeakersReducer";

export default function Speakers() {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  // const [speakerList, setSpeakerList] = useState([]);
  // learning about use of useReducer - prefer useState
  const [speakerList, dispatch] = useReducer(speakersReducer, []);
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(ConfigContext);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
      const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      });
      // setSpeakerList(speakerListServerFilter);
      dispatch({
        type: "setSpeakerList",
        data: speakerListServerFilter
      });
    });
    return () => {
      console.log("cleanup");
    };
  }, []); // speakingSaturday, speakingSunday

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };
  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    dispatch({
      type: favoriteValue === true ? "favorite" : "unfavorite",
      sessionId
    });
    console.log("changing session favorite to " + favoriteValue);
  }, []);

  const newSpeakerList = useMemo(
    () =>
      speakerList
        .filter(
          ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
        )
        .sort(function(a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        }),
    [speakerList, speakingSaturday, speakingSunday]
  );

  const speakerListFiltered = isLoading ? [] : newSpeakerList;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
          {context.showSpeakerSpeakingDays === false ? null : (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered &&
              speakerListFiltered.map(
                ({ id, firstName, lastName, bio, favorite }) => {
                  return (
                    <SpeakerDetail
                      key={id}
                      id={id}
                      favorite={favorite}
                      onHeartFavoriteHandler={heartFavoriteHandler}
                      firstName={firstName}
                      lastName={lastName}
                      bio={bio}
                    />
                  );
                }
              )}
            {/* {!speakerListFiltered && (
              <SpeakerDetail
                key={id}
                id={id}
                favorite={favorite}
                onHeartFavoriteHandler={heartFavoriteHandler}
                firstName={firstName}
                lastName={lastName}
                bio={bio}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

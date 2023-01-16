/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);

  return (
    <CurrentVideosContext.Provider
      value={{ videos, setVideos, index, setIndex }}
    >
      {children}
    </CurrentVideosContext.Provider>
  );
}

CurrentVideosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

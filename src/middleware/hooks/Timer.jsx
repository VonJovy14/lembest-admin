import React from "react";

function Timer({ second, setTimer }) {
  const [seconds, setSeconds] = React.useState(second);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimer();
    }
  });
}

export default Timer;

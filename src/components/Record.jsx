import React from "react";

export default function Record(props) {
  const [timer, setTimer] = React.useState({ minutes: 0, seconds: 0 });
  const [intervalId, setIntervalId] = React.useState(null);

  React.useEffect(() => {
    if (props.startTime) {
      clearInterval(intervalId);
    } else {
      setTimer({ minutes: 0, seconds: 0 });
      setIntervalId(
        setInterval(() => {
          setTimer((prevTimer) => ({
            ...prevTimer,
            seconds: prevTimer.seconds + 1,
          }));
        }, 1000)
      );
    }
  }, [props.startTime]);

  React.useEffect(() => {
    if (timer.seconds === 60) {
      setTimer((prevTimer) => ({
        seconds: 0,
        minutes: prevTimer.minutes + 1,
      }));
    }
  }, [timer.seconds]);

  return (
    <p className="timer">
      Timer :{" "}
      {`${timer.minutes.toString().padStart(2, "0")}:${timer.seconds
        .toString()
        .padStart(2, "0")}`}
    </p>
  );
}

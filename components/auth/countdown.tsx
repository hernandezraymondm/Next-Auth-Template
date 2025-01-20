import { useState, useEffect } from "react";

interface TokenExpirationCountdownProps {
  expiration: number; // milliseconds
}

export const TokenExpirationCountdown = ({
  expiration,
}: TokenExpirationCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiration - Date.now(); // using Date.now() for current time in ms
      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000));
      } else {
        setTimeLeft(0);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiration]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = () => {
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  return (
    <span className="font-mono text-lg text-accent-highlight ml-2">
      {formattedTime()}
    </span>
  );
};

interface ResendCodeCountdownProps {
  initialCount: number;
  onComplete: () => void;
}

export const ResendCodeCountdown = ({
  initialCount,
  onComplete,
}: ResendCodeCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialCount);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <p>{formattedTime()}</p>;
};

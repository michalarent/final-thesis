import React from "react";

export default function useKeyPress({
  targetKey,
  callback,
}: {
  targetKey: string;
  callback: any;
}) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);

  // If pressed key is our target key then set to true
  const downHandler = ({ key }) => {
    console.log(targetKey);
    console.log(key);
    () => callback();
    if (key == targetKey) {
    }
  };

  // Add event listeners
  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

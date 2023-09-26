export const handleKeyDown = (event) => {
  // Check if the space key is pressed and it's the first character
  if (event.key === " " && event.target.selectionStart === 0) {
    event.preventDefault()
  }
}


export const EmailhandleKeyDown = (event) => {
  // Check if the input is empty and the key being pressed is the space key
  if (event.currentTarget.value.trim() === "" && event.key === " ") {
    event.preventDefault(); // Prevent the space key from being entered
  }
};

export const NumberhandleKeyPress = (event, field) => {
  const { key, ctrlKey, metaKey } = event;

  if ((ctrlKey || metaKey) && (key === 'c' || key === 'C' || key === 'v' || key === 'V')) {
    // Allow Ctrl+C and Ctrl+V shortcuts
    return;
  }

  if (key === ' ' && field.value.endsWith(' ')) {
    event.preventDefault();
  } else if (key === ' ' && field.value.length === 0) {
    event.preventDefault();
  }

  const allowedKeys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    'Backspace',
    'Enter',
    ' ',
  ];

  if (!allowedKeys.includes(key)) {
    event.preventDefault();
  } else {
    field.onChange(event);
  }
};

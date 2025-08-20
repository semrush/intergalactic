function DispatchShowHideCodeButtonClickEvent(isShown: boolean) {
  const eventName = `playground_${isShown ? 'hide' : 'show'}-code-btn-click`;
  const event = new CustomEvent(eventName);

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchShowHideCodeButtonClickEvent;

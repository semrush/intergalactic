function DispatchCopyCodeButtonClickEvent() {
  const event = new CustomEvent('playground_copy-code-btn-click');

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchCopyCodeButtonClickEvent;

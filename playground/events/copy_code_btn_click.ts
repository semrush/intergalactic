function DispatchCopyCodeButtonClickEvent() {
  const event = new CustomEvent('playground:copy-code-btn-click');

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchCopyCodeButtonClickEvent;

function DispatchViewSourceButtonClickEvent() {
  const event = new CustomEvent('playground:view-source-btn-click');

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchViewSourceButtonClickEvent;

function DispatchViewSourceButtonClickEvent() {
  const event = new CustomEvent('playground_view-source-btn-click');

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchViewSourceButtonClickEvent;

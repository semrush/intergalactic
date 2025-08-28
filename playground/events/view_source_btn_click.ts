import Events from './events';

function DispatchViewSourceButtonClickEvent() {
  const event = new CustomEvent(Events.ViewSourceBtnClick);

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchViewSourceButtonClickEvent;

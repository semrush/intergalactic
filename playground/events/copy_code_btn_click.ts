import Events from './events';

function DispatchCopyCodeButtonClickEvent() {
  const event = new CustomEvent(Events.CopyCodeBtnClick);

  document.getElementById('playground-container')?.dispatchEvent(event);
}

export default DispatchCopyCodeButtonClickEvent;

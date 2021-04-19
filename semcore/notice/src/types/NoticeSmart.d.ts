import { CProps, ReturnEl } from '@semcore/core';
import { INoticeProps } from './Notice';

export interface INoticeSmartProps extends INoticeProps {
  /**
   * A custom element for additional information
   */
  label?: React.ReactNode;
  /**
   * Custom action element
   */
  actions?: React.ReactNode;
  /**
   *  Adds a Close icon
   */
  closable?: boolean;
  /**
   * Callback on a click on the close button
   */
  onClose?: (event: React.SyntheticEvent) => void;
}

declare const NoticeSmart: <T>(props: CProps<INoticeSmartProps & T>) => ReturnEl;
export default NoticeSmart;

import { default as NoticeBubbleContainer } from './NoticeBubble';
import type {
  NoticeBubbleContainerProps,
  NoticeBubbleInfoProps,
  NoticeBubbleWarningProps,
  AddedNoticeMeta,
  NSNoticeBubble,
} from './NoticeBubble.type';
import { default as noticeBubbleDefaultManager } from './NoticeBubbleManager';

export * from './NoticeBubble';

export * from './NoticeBubbleManager';

export { NoticeBubbleContainer, noticeBubbleDefaultManager };

export type {
  NoticeBubbleContainerProps,
  NoticeBubbleInfoProps,
  NoticeBubbleWarningProps,
  AddedNoticeMeta,
  NSNoticeBubble,
};

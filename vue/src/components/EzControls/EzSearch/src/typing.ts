export type ScrollType = 'default' | 'main';

export interface CollapseContainerOptions {
  canExpand?: boolean;
  title?: string;
  helpMessage?: Array<any> | string;
}

export type ScrollActionType = RefType<{
  scrollBottom: () => void;
  getScrollWrap: () => Nullable<HTMLElement>;
  scrollTo: (top: number) => void;
}>;

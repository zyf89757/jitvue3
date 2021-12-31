export type ScrollType = 'default' | 'main';

export interface CollapseContainerOptions {
  showLeftBorder?: boolean;
  canExpand?: boolean;
  title?: string;
  helpMessage?: Array<any> | string;
}

export type ScrollActionType = RefType<{
  scrollBottom: () => void;
  getScrollWrap: () => Nullable<HTMLElement>;
  scrollTo: (top: number) => void;
}>;

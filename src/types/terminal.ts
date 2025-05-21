export interface TerminalOutput {
  type: 'command' | 'system' | 'error' | 'list';
  content: string | string[];
}
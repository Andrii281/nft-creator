import { IFragment } from './Fragment';

export interface ILayer {
  id: string;
  name: string;
  fragments: IFragment[];
  activeFragmentId: string | null;
}


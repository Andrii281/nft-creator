import { FileModal } from './components';
import { modalStore } from '@store';
import { observer } from 'mobx-react-lite';

export const AppModals = observer(() => {
  return <>{modalStore.fileModalProps && <FileModal layerId={modalStore.fileModalProps} />}</>;
});

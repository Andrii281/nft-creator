import { makeAutoObservable } from 'mobx';

class ModalStore {
  fileModalProps: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFileModalVisibility(props: string | null) {
    this.fileModalProps = props;
  }
}

export const modalStore = new ModalStore();

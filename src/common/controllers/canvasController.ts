export class CanvasController {
  context: CanvasRenderingContext2D | null = null;

  init($canvas: HTMLCanvasElement) {
    this.context = $canvas.getContext('2d');

    if (this.context === null) {
      throw new Error('Canvas context error');
    }
  }
  clearCanvas() {
    this.context?.clearRect(0, 0, 512, 512)
  }
  drawImage(image: HTMLImageElement, width: number, height: number){
    this.context?.drawImage(image, 0, 0, width, height);
  }
  //=========================Test=========================//
  getInfo() {
    const imageData = this.context?.getImageData(0, 0, 512, 512);
    // console.log('imageData: ', imageData)
  }
  isFullyTransparent() {
    let d = this.context?.getImageData(0, 0, 512, 512).data;
    let rows = 0;
    if(d?.length) {
      for(let y = 0; y < 512; y++){
        for (let i=4 * (rows + 1); i < 512 * 4 * (rows + 1) ; i+=4){
          if (d[i] !==0) return rows;
        }
        rows++;
      } 
    }
    return rows
  }
  isFullyTransparentHorizontal() {
    let d = this.context?.getImageData(0, 0, 512, 512).data;
    let columns = 0;
    if(d?.length) {
      for(let y = 0; y < 512; y++){
        const startValue = 4 * columns + 3;
        for (let i= 4 * columns + 3; i < 512 * 512 * 4 ; i+= 512 * 4) {
          // console.log('i: ', i, '512 * i: ', 512 * 512, 'columns: ', columns)
          if (d[i] !==0) return columns;
        }
        // console.log('columns++: ')
        columns++;
      } 
    }
    return columns;
  }
  isFullyTransparentHorizontalBackward() {
    let d = this.context?.getImageData(0, 0, 512, 512).data;
    console.log('d: ', d?.length)
    let columns = 512;
    if(d?.length) {
      for(let y = 0; y < 512; y++){
        for (let i=(512 * 512 * 4) - ((512 - columns) * 4) - 1; i > 0 ; i-= (512 * 4)) {
          if (d[i] !==0) return columns;
        }
        // console.log('columns++: ')
        columns--;
      } 
    }
    return columns;
  }

  TransperentParams() {
    let d = this.context?.getImageData(0, 0, 512, 512).data;
    let rows = 0;
    if(d?.length) {
      for(let y = 0; y < 512; y++){
        for (let i=4 * (rows + 1); i < 512 * 4 * (rows + 1) ; i+=4){
          if (d[i] !==0) return rows;
        }
        rows++;
      } 
    }
    return rows
  }

  setNewDimention(image: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.style.borderWidth = '2';
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const height = this.isFullyTransparent();
    const x = this.isFullyTransparentHorizontal();
    const width = this.isFullyTransparentHorizontalBackward();
    console.log('height: ', height)
    console.log('x: ', x)
    console.log('width: ', width)
    // console.log('setNewDimention: ', image)
    // const imageData: any = this.context?.getImageData(0, width, 512, 512 - width);
    // this.context?.putImageData(imageData, 0, 0, 0, 0, 512, 512);
    ctx?.drawImage(image, x, height, width - x, 512 - height, 0, 0, 512, 512);
    return canvas.toDataURL();
  }
}

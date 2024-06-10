interface ISendDTO {
  queue: string;
  process: (msg: any) => void;
}
export {ISendDTO};

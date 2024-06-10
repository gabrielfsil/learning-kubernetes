interface ISendMailDTO {
  to: {
    name: string;
    email: string;
  };
  from: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
}

export {ISendMailDTO};

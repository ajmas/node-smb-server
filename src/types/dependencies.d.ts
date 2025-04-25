declare module 'errno' {
  type ErrNo = {
    errno: number;
    code: string;
    description: string;
  };

  declare const  errno:  Record<string, ErrNo>;
  declare const code: Record<number, ErrNo>;
}
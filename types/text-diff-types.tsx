import { Change } from 'diff';

export interface DiffOptions {
  label: string;
  description: string;
  value: (
    oldString: string,
    newString: string,
    options?: Diff.BaseOptions | undefined,
  ) => Change[];
  // | (<TOld, TNew>(
  //     oldArr: TOld[],
  //     newArr: TNew[],
  //     options?: ArrayOptions<TOld, TNew | undefined>
  //   ) => ArrayChange<TOld | TNew>[]);
}

import { TransformPipe } from '@fireless/common';

export class ExtractStringFromDataPipe
  implements TransformPipe<{ data: string }, string> {
  async transform({ data }: { data: string }): Promise<string> {
    return data;
  }
}

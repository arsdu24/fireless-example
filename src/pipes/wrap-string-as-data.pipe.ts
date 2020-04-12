import { TransformPipe } from '@fireless/common';

export class WrapStringAsDataPipe
  implements TransformPipe<string, { data: string }> {
  async transform(data: string): Promise<{ data: string }> {
    return { data };
  }
}

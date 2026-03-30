import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.status';

@Injectable()
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any): string {
    if (value === null || value === undefined) {
      throw new BadRequestException('Status value is missing');
    }

    const status: string = String(value).toUpperCase();

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`Invalid status format for ${value}`);
    }

    return status;
  }

  private isStatusValid(value: any) {
    const index = this.StatusOptions.indexOf(value);
    return index !== -1;
  }
}

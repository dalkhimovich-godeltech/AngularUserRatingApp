import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'likes', pure: true })
export class LikesPipe implements PipeTransform {
    transform(rateNumber: string) {
        return rateNumber + ' like(s)';
    }
}

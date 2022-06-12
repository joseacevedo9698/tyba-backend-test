import { IsNotEmpty, IsString } from 'class-validator';
import { ISearching } from '../interfaces';
export class SearchingStructure {

    @IsNotEmpty()
    @IsString()
    type: string

    @IsNotEmpty()
    @IsString()
    query: string

    constructor(data: ISearching) {
        this.type = data.type
        this.query = data.query
    }
}
import {Document} from 'mongoose';
export interface ISearching extends Document {
    _id: string;
    type: string;
    query: string;
    createdAt: Date;
    updatedAt: Date;
}
import mongoose from '../../server/database';
import { ISearching } from '../interfaces';
export const SearchingSchema = new mongoose.Schema(
    {
        type: {
            type: 'string',
            required: [true, 'TYPE_IS_REQUIRED'],
        },
        query: {
            type: 'string',
            required: [true, 'QUERY_IS_REQUIRED'],
        }
    },
    {
        timestamps: true,
    }
);

export const SearchingModel = mongoose.model<ISearching>("Searching", SearchingSchema);
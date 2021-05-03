import {PendingSchema} from './schema.model';

export class PendingModel {
    static push = async(number) => {
        try {
            const newPending = new PendingSchema({
                number : number
            });
            await newPending.save();
        } catch (err) {
            err.message = 'Model -> Push pending error';
            throw err;
        }
    }
}
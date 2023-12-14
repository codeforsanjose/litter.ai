import { ObjectId } from 'mongodb';

const sanitizeId = (_id) => {
    if (typeof _id === 'string') {
        return new ObjectId(_id);
    }
    return _id;
};

export default sanitizeId;

/* eslint-disable prettier/prettier */
// import { crudControllers } from '../../utils/crud'
import { Item } from './item.model';
import mongoose from 'mongoose';
import { connect } from '../../utils/db';


// used connect because we run single file seperatly 
// we can use context to run

const run = async () => {
    await connect('mongodb://localhost:27017/api-test')
    const item = await Item.create({
        name: 'Clean up',
        createdBy: mongoose.Types.ObjectId(),
        list: mongoose.Types.ObjectId(),
    })
    // console.log(item);
    // console.log(await Item.find({}).exec());

    const updated = await Item.findByIdAndUpdate(
        item._id, // by id
        { name: 'eat' }, // what you want to update
        { new: true }  // fo rest ypu need to return a updated object , mongoose cant return automatically
    ).exec()

    console.log('Updated Item', updated);

    const removed = await Item.findByIdAndRemove(item._id).exec();
    console.log('removed Item', removed);
}

run();


/**
 *  GET / Read many
 *  GET /:id read one
 *  POST /  create one
 *  Put /:id Update one
 *  DELETE /:id delete one
 */

// export default crudControllers(Item)
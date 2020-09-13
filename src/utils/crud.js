/* eslint-disable prettier/prettier */

export const getOne = model => async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;  // we need user as well only specified user can have their data.

  // in item model we have createdBy where we specify user ref
  const docs = await model.findOne({ _id: id, createdBy: userId }).exec();

  if (!docs) {
    return res.status(404).end(); // the response should be ended
  }
  res.status(200).json({ data: docs });
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id }).exec();
  if (!docs) {
    return res.status(404).end();
  }
  res.status(200).json({ data: docs });
}

export const createOne = model => async (req, res) => {
  const doc = model.create({ ...req.body, createdBy: req.user._id });
  res.status(200).json({ data: doc });
}

export const updateOne = model => async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  const updatedDoc = await model.findByIdAndUpdate(
    // fields
    {
      _id: id,
      createdBy: userId
    },
    // updates
    req.body,
    // return back
    { new: true }
  ).exec();

  if (!updatedDoc) {
    return res.status(404).end();
  }
  res.status(200).json({ data: updatedDoc });
}

export const removeOne = model => async (req, res) => {

  const id = req.params.id;
  const userId = req.user._id;

  const doc = await model.findOneAndRemove({ _id: id, createdBy: userId }).exec();

  if (!doc) {
    return res.status(404).end();
  }

  res.status(200).json({ data: doc });

}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})

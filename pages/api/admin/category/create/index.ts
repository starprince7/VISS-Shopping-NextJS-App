import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../database/dbUtils/dbConnection';
import Category from '../../../../../database/models/categorySchema';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ msg: 'Method not allowed' });
    return;
  }

  // Connect DB
  await db.connectDB();

  if (!req.body) {
    res.status(400).json({ error: 'Enter a category name and type.' });
    return;
  }

  try {
    const newCategory = await Category.create(req.body);
    res.status(201);
    res.json({ msg: 'Category created successfully.', category: newCategory });
    res.end();
  } catch (e) {
    const descriptiveError = formatCreateCategoryError(e);
    res.status(400);
    res.json(descriptiveError);
    res.end();
  }
}

// Handles Err with descriptive information.
function formatCreateCategoryError(e) {
  const error = {
    name: '',
    type: '',
  };

  // check for duplicate category name error.
  if (e.code === 11000) {
    error.name = 'This category already exists.';
    return error;
  }

  // Evalute error parameter 'e'
  if (e.message.includes('Category validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
}

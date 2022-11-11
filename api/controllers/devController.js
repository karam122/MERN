import AddDevMessage from "../models/addDev.js";

export const AddNewDev = async (req, res) => {
  const { Image, Name, description, technology } = req.body;

  console.log(Image, Name, description, technology, "newDev");
  try {
    const newDev = await AddDevMessage.create({
      Name: Name,
      description: description,
      technology: technology,
      Image: Image,
      createdAt: new Date(),
    });

    res.status(200).json(newDev);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const GetDeveloper = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(page,limit, "paginatedDevelopers");
  try {
    const GetAllDevelopers = await AddDevMessage.find();
    if (endIndex < GetAllDevelopers.length) {
      GetAllDevelopers.next = {
        page: page + 1,
        limit: limit
      };
    }
    
    if (startIndex > 0) {
      GetAllDevelopers.previous = {
        page: page - 1,
        limit: limit
      };
    }
    
    const TotalCount = GetAllDevelopers.length / 10;
    const TotalPages = !Number.isInteger(TotalCount) ? parseInt(TotalCount) + 1 : TotalCount
    const paginatedDevelopers = await GetAllDevelopers.slice(startIndex,endIndex)
    res.status(200).json({paginatedDevelopers: paginatedDevelopers,TotalPages: TotalPages});
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};
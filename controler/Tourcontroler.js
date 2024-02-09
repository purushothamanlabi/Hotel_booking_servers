import Tour from "../models/Tour.js";

// create a new tour

export const CreateTour = async (req, res) => { 
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res
      .status(200)
      .json({ success: true, message: "sucessfully created", data: savedTour });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, message: "failed to created try again " });
  }
};

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "sucessfully updated",
      data: updateTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "faild to updated",
      data: updateTour,
    });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "sucessfully del",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "faild to del",
    });
  }
};



//  getSingletour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  // console.log(id);     // find ----------s
  try {
    const tour = await Tour.findById(id).populate("reviews");
    // console.log(tour);  // find 
    res.status(200).json({
      success: true,
      message: "sucessfully ",
      data: tour,
    });
  
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// getAll tour
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);


  try {
    const tour = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tour.length,
      message: "sucessfully ",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const getTourbySearch = async (req, res) => {
  // here i means case sencitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  console.log(req.query.city);
  console.log(req.query.distance);
  console.log(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "sucessfully ",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};


// get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tour = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);  
    res.status(200).json({
      success: true,
      message: "sucessfully ",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};





export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};

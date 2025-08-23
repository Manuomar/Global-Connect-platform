import Apply from '../models/apply.model.js'
export const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      jobTitle, // <-- add this
      Name,
      Mail,
      Contact,
      type,
      ResumeLink,
      Course,
      skills,
      Description
    } = req.body;

    const newApplication = new Apply({
      jobId,
      jobTitle, // <-- save it
      Name,
      Mail,
      Contact,
      type,
      ResumeLink,
      Course,
      skills,
      Description
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApplication
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not submit application.",
      error: error.message
    });
  }
};

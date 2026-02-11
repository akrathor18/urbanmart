import * as profileService from "../services/profile.service.js";

export const getProfile = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const userProflie = await profileService.getProfile(userId);
    res.status(200).json({message:'user found', user: userProflie});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile=async (req, res)=>{
    try {
         const userId = req.user.id
  const data = req.body
   const result = await profileService.updateProfile(userId, data)
   res.status(200).json({massage:'Profile updated successfully', profile: result})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


export const syncUserDataController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { cart, wishlist } = req.body;

    await profileService.syncUserDataService(userId, cart, wishlist);

    res.status(200).json({
      success: true,
      message: "User data synced successfully"
    });
  } catch (error) {
    next(error);
  }
};

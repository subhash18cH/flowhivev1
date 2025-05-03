const Swipe=require("../models/swipeModel");
const Match =require("../models/matchModel");
const Profile=require("../models/profileModel")
//swipe a profile
const swipeProfile=async(req,res)=>{
  try {
    const{targetUserId,isLiked}=req.body;
    if(targetUserId===null){
      return res.status(400).json({message:"User not found"});
    }
    const existingSwipe= await Swipe.findOne({
      fromUser:req.user.userId,
      toUser:targetUserId}
    );
    if(existingSwipe){
      return res.status(400).json({message:"You have already swiped"});
    }
    const swipe= await Swipe.create({
      fromUser:req.user.userId,
      toUser:targetUserId,
      isLiked
    });

    if(isLiked){
      const swipeBacked=await Swipe.findOne({
        fromUser:targetUserId,
        toUser:req.user.userId,
        isLiked:true
      });

      if(swipeBacked){
        await Match.create({
          user1:req.user.userId,
          user2:targetUserId,
          isMatched:true
        })
      }
    };
    res.status(200).json(swipe);
  } catch (error) {
    res.status(400);
  }
}

//all sent requests
const sentRequests = async (req, res) => {
  try {
    const swipes = await Swipe.find({ fromUser: req.user.userId });

    const enrichedSwipes = await Promise.all(
      swipes.map(async (swipe) => {
        const profile = await Profile.findOne({ userId: swipe.toUser });
        return {
          ...swipe.toObject(),
          profile,
        };
      })
    );

    res.status(200).json(enrichedSwipes);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to fetch sent requests" });
  }
};


//all incoming requests
const receivedRequests = async (req, res) => {
  try {
    const swipes = await Swipe.find({ toUser: req.user.userId });

    const enrichedSwipes = await Promise.all(
      swipes.map(async (swipe) => {
        const profile = await Profile.findOne({ userId: swipe.fromUser });
        return {
          ...swipe.toObject(),
          fromUserProfile: profile,
        };
      })
    );

    res.status(200).json(enrichedSwipes);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to fetch received requests" });
  }
};

module.exports={swipeProfile,sentRequests,receivedRequests};
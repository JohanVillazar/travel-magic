import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {

  const hotelId = req.params.hotelId;
  const newRoom = Room(req.body);

  try{
    const saveRoom = await newRoom.save();
     await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}});

     res.status(200).json(saveRoom);
  }catch(err){
    next(err);
  }

};

export const getRooms = async (req, res, next) => {

  try{
    const room = await Room.find(req.params.id);
    if(!room) return next(createError(404,"Room not found!"));
    res.status(200).json(room);
  }catch(err){
    next(err);   
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Habitación no encontrada"));
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try{
    const updateRoom = await Room.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.status(200).jsonm(updateRoom);
  }catch(err){
    next(err);
  }
};


export const deleteRoom = async (req, res, next) => {

  const hotelId = req.params.hotelId;
  try{
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}});

    res.status(200).json("Room has been deleted.");
  }catch(err){
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumber._id": req.params.id },
      { $push: { "roomNumber.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json({ message: "Disponibilidad actualizada" });
  } catch (err) {
    next(err);
  }
};
 
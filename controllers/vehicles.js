const Vehicle = require('../models/Vehicle')

const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({})
  res.status(200).json({ success: true, data: vehicles })
}

const createVehicle = async (req, res) => {
  const { make, model, license_plate } = req.body
  const type = Math.round(Math.random()) > 0 ? 'Van' : 'Passenger car'
  try {
    const vehicle = await Vehicle.create({make, model, type, license_plate})
    return res.status(201).send({ success: true, data: vehicle })  
  } catch (error) {    
    res.status(400).send({ success: false, msg: error})     
  }
}

const getSingleVehicle = async (req, res) => {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    return res.status(200).json({ success: true, data: vehicle })   
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Request failed' })       
  }
}

const updateVehicle = async (req, res) => {
  const { id } = req.params
  const { type, make, model } = req.body
  try {
    const vehicle = await Vehicle.findById(id) 
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, {type, make, model})   
    res.status(200).json({ success: true, data: updatedVehicle })   
  } catch (error) {
    console.log(error)
  }
}

const deleteVehicle = async (req, res) => {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    await Vehicle.findByIdAndRemove(id)
    return res.status(200).json({ success: true })
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
}

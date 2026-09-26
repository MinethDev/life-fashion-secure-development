const Delivery = require("../Model/DeliveryModel");
// display
const getAllDelivery = async (req, res, next) => {

    let Deliverys;

    try {
        deliverys = await Delivery.find();
    } catch (err) {
        console.log(err);
    }

    if(!deliverys){
        return res.status(404).json({message:"Delivery not found"});
    }

    return res.status(200).json({ deliverys });
};
// insert

const addDeliverys = async (req, res, next) => {
    const {firstName,lastName,email,street,city,state,zipcode,country,phone} = req.body;

    let deliverys;

    try{
        deliverys = new Delivery({firstName,lastName,email,street,city,state,zipcode,country,phone});
        await deliverys.save();

    } catch (err) {
        console.log(err);
    }

    if(!deliverys){
        return res.status(404).send({message:"Unable to add delivery"});
    }
    return res.status(200).json({ deliverys });
};

//get id

const getById = async (req, res, next) =>{
    const id = req.params.id;

    let delivery;

    try {
        delivery = await Delivery.findById(id);
    } catch (err) {
        console.log(err);
    }

    if(!delivery){
        return res.status(404).send({message:"Unable to find delivery"});
    }
    return res.status(200).json({ delivery });
};

//update
const updateDelivery = async (req, res, next) => {


    const id = req.params.id;
    const {firstName,lastName,email,street,city,state,zipcode,country,phone} = req.body;

    let deliverys;

    try{
        deliverys = await Delivery.findByIdAndUpdate(id,
            {firstName: firstName,lastName: lastName,email: email,street: street,city: city,state: state,zipcode: zipcode,country: country,phone: phone});
        deliverys = await deliverys.save();
    }catch(err){
        console.log(err);
    }
    if(!deliverys){
        return res.status(404).send({message:"Unable to update delivery"});
    }
    return res.status(200).json({ deliverys });
};

// delete

const deleteDelivery = async (req, res, next) => {
    const id = req.params.id;

    let delivery;

    try {
        delivery = await Delivery.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if(!delivery){
        return res.status(404).send({message:"Unable to delete"});
    }
    return res.status(200).json({ delivery });
}


exports.getAllDelivery = getAllDelivery;
exports.addDeliverys = addDeliverys;
exports.getById = getById;
exports.updateDelivery = updateDelivery;
exports.deleteDelivery = deleteDelivery;
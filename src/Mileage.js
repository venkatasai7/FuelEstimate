import React , {useState} from 'react'

function CalculateFuel(props)
{
    let FuelRequired= Math.round((parseInt(props.distance)/parseInt(props.Mileage))*100)/100;
    let Fuelcost = Math.round(((FuelRequired * props.Cost) )*100)/100;
    let ListUnits = {1:{0:"Liters",1:"INR"},2:{0:"Gallons",1:"USD"}}
        return (
             props.distance &&
                <div>
               {/*<p>distance : {props.distance} | Mileage : {props.Mileage} | MileageUnits : {props.MileageUnits} | Cost : {parseFloat(props.Cost)}</p>*/}
               <b><p>Fuel : {(FuelRequired && props.Mileage) ? FuelRequired : "- -"} {ListUnits[props.units][0]}</p></b>
               <b><p>Cost : {(props.Cost && FuelRequired) ? Fuelcost: "- -"} {ListUnits[props.units][1]}</p></b>
            </div>      
        )
};



export default function Mileage(props) {

    const [Mileage, setMileage] = useState(0);

    const [MileageUnits, setMileageUnits] = useState(1);

    const [Cost,setCost] = useState(0);

    const [units, setunits] = useState(1);

    const HandleOnChange = (event) => {
        console.log("on change")
        setMileage(event.target.value);
        };

    const HandleOnChangeMileageUnits = (event) => {
            console.log("on change")
            setMileageUnits(event.target.value);
            setunits(event.target.value);
        };

    const HandleOnChangeCost = (event) => {
            console.log("on change")
            setCost(event.target.value);
    
        };



  return (
    <div>
        <b>Vehicle Mileage : </b>
        <input className="mx-1 my-1"  value={Mileage} onChange={HandleOnChange}/> 
        <select value={MileageUnits} name="MileageUnits" id="MileageUnits" onChange={HandleOnChangeMileageUnits}>
            <option value="1">Kilometers/Litre</option>
            <option value="2">Miles/Gallon</option>
        </select>
        <br/>
        <b>Petrol Cost per {(MileageUnits===1)? "Liter" : "Galon" }</b>
        <input className="mx-2 my-1" value={Cost} onChange={HandleOnChangeCost}/> 
        <select value={MileageUnits} name="CurrencyType" id="MileageUnits" onChange={HandleOnChangeMileageUnits}>
            <option value="1">INR</option>
            <option value="2">USD</option>
        </select>

        <CalculateFuel 
                distance = {props.distance} 
                Mileage = {Mileage} 
                MileageUnits = {MileageUnits}
                Cost = {Cost}
                units = {units}
                />

    </div>
  )
}

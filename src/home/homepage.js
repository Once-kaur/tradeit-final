 //Import Firestore database
import storage from '../firebase';
import { useState } from 'react';


const Read = () => {

	const [info , setInfo] = useState([]);

	// Start the fetch operation as soon as
	// the page loads
	window.addEventListener('load', () => {
		Fetchdata();
	});

	// Fetch the required data using the get() method
	const Fetchdata = ()=>{
		db.collection("data").get().then((querySnapshot) => {
			
			// Loop through the data and store
			// it in array to display
			querySnapshot.forEach(element => {
				var data = element.data();
				setInfo(arr => [...arr , data]);
				
			});
		})
	}
	
	// Display the result on the page
	return (
		<div>
			<center>
			<h2>Student Details</h2>
			</center>
		
		{
			info.map((data) => (
			<Frame image={data.image}/>
			))
		}
		</div>

	);
}

// Define how each display entry will be structured
const Frame = ({image}) => {
	console.log(image);
	return (
		<center>
			<div className="div">
				
<p>image : {image}</p>

			</div>
		</center>
	);
}

export default Read;




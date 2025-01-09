import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [prize, setprize] = useState('');
    const [category, setcategory] = useState('');
    const [location,setlocation] = useState('');
    const [mobile,setmobile] = useState('');
    const [image, setimage] = useState(null);
    const [message, setMessage] = useState(''); // To show success/error messages

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/add-product');
        }
    }, [navigate]);

    const handleApi = () => {
        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('prize', prize);
        formData.append('category', category);
        formData.append('location', location);
        formData.append('mobile', mobile);

         formData.append('image', image);

        const url = 'http://localhost:4000/add-products'; // Ensure this URL is correct
        axios.post(url, formData)
            .then((res) => {
                console.log(res);
                setMessage('Product added successfully');
                if (res.data.message)
                    alert(res.data.message);
                navigate('/')

            })
            .catch((err) => {
                console.error('Error connecting to the database:', err);
                setMessage('Error adding product. Please try again.');
            });
    };

    return (
        <div>
            <Header />
            <div className="p-3">
                <h2>Add Product</h2>
                <label>Product Category</label>
                <select className="form-control" value={category} 
                        onChange={(e) => setcategory(e.target.value)} >

                    <option value="">Select Category</option>
                    <option value="Cows">Cows</option>
                    <option value="Buffaloes">Buffaloes</option>
                    <option value="Sheeps">Sheeps</option>
                    <option value="Machines">Machines</option>
                </select>

                <label>Product Name</label>
                <input className="form-control" type="text" value={pname} 
                       onChange={(e) => setpname(e.target.value)} />

                <label>Product Description</label>
                <input className="form-control" type="text" value={pdesc} 
                       onChange={(e) => setpdesc(e.target.value)} />

                <label>Product Price</label>
                <input className="form-control" type="number" value={prize} 
                       onChange={(e) => setprize(e.target.value)} />

                <label>location</label>
                <input className="form-control" type="text,number" value={location} 
                       onChange={(e) => setlocation(e.target.value)} />
               <label>Mobile Number</label>
                <input className="form-control" type="number" value={mobile} 
                       onChange={(e) => setmobile(e.target.value)} />
                         <label>Product Image</label>
                <input className="form-control" type="file" 
                       onChange={(e) => setimage(e.target.files[0])} />

                <button onClick={handleApi} className="btn btn-primary mt-3">SUBMIT</button>
                
                {message && <p className="mt-3">{message}</p>}
            </div>
        </div>
    );
}

export default AddProduct;


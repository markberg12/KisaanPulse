import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Categories from "./Categories";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
            .then((res) => {
                console.log(res);
                if (res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products);
                }
           
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        console.log('Searching products:', search);
        const filtered = products.filter((item) =>
            item.pname.toLowerCase().includes(search.toLowerCase()) ||
            item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())

        );              
        setFilteredProducts(filtered);
    };

    const handleCategory = (value) => {
        setSelectedCategory(value);
        if (value) {
            const filtered = products.filter((item) => item.category === value);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Show all products if no category is selected
        }
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />


            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <div className="card m-3" key={index}>
                            <img
                                width="300px"
                                height="200px"
                                src={`http://localhost:4000/${item.image}`}
                                alt={item.pname}
                            />
                            <p className="m-2">{item.category} |  {item.pname}| {item.pdesc}</p>
                            <p className="m-2 text-Danger">
                         <span style={{ fontWeight: "", fontSize: "18px", textTransform: "uppercase" }}>
                              Prize:{item.prize}</span>  </p>

                            <p className="m-2 text-success">Location: {item.location}|mobile:{item.mobile}</p>
                            </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default Home;

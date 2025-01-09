import "./Header.css";
import categories from './CategoriesList.js';

function Categories(props) {
    return (
        <div className='cat-container'>
            <div>
                <span 
                    className='pr-3 category' 
                    onClick={() => props.handleCategory && props.handleCategory('')}
                >
                    AllCategory
                </span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => (
                        <span 
                            onClick={() => props.handleCategory && props.handleCategory(item)} 
                            key={index} 
                            className='category'
                        >
                            {item}
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

export default Categories;


import CategoryItem from '../CategoryItems/Categories-item-component';


import './Directory.styles.scss';

const Directory = ({categories}) => {
    
    return (
        <div className = 'categories-container'> 
      
        {categories.map((category) => {
         return (
           <CategoryItem key = {category.id} category={category} />
         );
        })}
      </div>
    );
}

export default Directory;
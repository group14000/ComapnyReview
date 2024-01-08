import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-center items-center space-x-4">
        <li>
          <Link to="/add-review" className="text-white hover:text-gray-300">
            Add Company Review
          </Link>
        </li>
        <li>
          <Link to="/see-review" className="text-white hover:text-gray-300">
            See Company Reviews
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

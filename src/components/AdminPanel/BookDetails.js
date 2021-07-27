import {React} from "react";
import "../BookDetails/BookDetails.css";
import Booksnaps from "../BookDetails/Booksnaps";
import Bookfullsnap from "../BookDetails/Bookfullsnap";
import BookDesc from "../BookDetails/BookDesc";

const BookDetails = (props) => {
  return (
    <div>
      <div className="book-details-bg">
        <div className="book-main-container">
          <Booksnaps snaps={props.book.photos} video={props.book.embedVideo} />
          <Bookfullsnap url={props.book.photos[0]} />
          <BookDesc bookdetails={props.book} />
        </div>
      </div>
    </div>
  );
};
export default BookDetails;

import { Link } from "react-router-dom"

export default function Card({ title, description, img, price, id }) {

    return (
        <div>
            <Link to={`/bookdetail/${id}`} className="nav-link active">
            <div className="px-2">
                <div className="card w-100 my-2 shadow-2-strong ">
                    <h5 className="card-title m-2">{title}</h5>
                    {img === undefined? 
                      <img
                      src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                      className="card-img-top px-4 rounded"
                      style={{ aspectRatio: "1 / 1" }}
                      alt="img"
                  />
                    :
                    <img
                        src={img}
                        className="card-img-top px-4 rounded"
                        style={{ aspectRatio: "1 / 1" }}
                        alt="img"
                    />
                  }
                    <div className="card-body d-flex flex-column">
                    <p className="card-text">{description}...</p>
                        <p className="card-text">${price}</p>
                        <Link to={`/bookdetail/${id}`} className="btn btn-dark">
                                Details
                            </Link>
                    </div>
                </div>
            </div>

            </Link>
        </div>

    )
}

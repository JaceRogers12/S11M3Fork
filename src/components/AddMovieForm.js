import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

const randomNumber = () => {
    return String(Math.floor(Math.random()*9999))+"A"
}

const cleanSlateMovie = {
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
    id: 0
    }

function AddMovieForm (props) {
    const [newMovie, setNewMovie] = useState(cleanSlateMovie);
    const navigate = useNavigate();
    const {setMovies} = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const postedMovie = {...newMovie, id: randomNumber()};
        console.log(postedMovie)
        axios.post(`http://localhost:9000/api/movies`, postedMovie)
            .then(res => {
                setMovies(res.data);
                setNewMovie(cleanSlateMovie);
                navigate("/movies");
            })
            .catch(res => console.log(res))
    };
    const handleChange = (event) => {
        setNewMovie({...newMovie, [event.target.name]: event.target.value})
    };

    const { title, director, genre, metascore, description } = newMovie;

    return(
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Add a Movie</h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={`/movies`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>
    )
};

export default AddMovieForm;
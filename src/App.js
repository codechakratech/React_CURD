import MoviesList from './Componets/MoviesList';
import React, { useEffect, useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);

  const [obj, setObj] = useState({ title: '', content: '' });

  useEffect(() => {
    getMovies();
  }, [])

  const getMovies = async () => {
    try {
      const res = await fetch('http://localhost:5000/');
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      console.log(e);
    }


  }

  const handleSave = e => {
    e.preventDefault();
    postMovies();

  }
  const postMovies = async () => {
    try {
      const data = await fetch('http://localhost:5000/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
      setObj({ title: '', content: '' })

      getMovies();
    } catch (e) {
      console.log(e);
    }

  }

  const getMovie = async (id) => {
                   try{
                             const res = await fetch(`http://localhost:5000/id/${id}`);
                             const data = await res.json();
                             setObj({title:data.title,content:data.content})
                   }catch(e){
                                   console.log(e);
                   }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center">
            <h2>Movies App</h2>
          </div>

          <div className="col-md-5"></div>
          <div className="col-md-4">
            <form onSubmit={handleSave} >
              <input type="text" placeholder="Enter your movie" className="form-controler mb-2" onChange={e => { setObj({ ...obj, title: e.target.value }) }} value={obj.title} /><br />
              <textarea placeholder="Enter your movie content" className="form-controler" onChange={e => { setObj({ ...obj, content: e.target.value }) }} value={obj.content} /><br />
              <input type="submit" value="Save" className="btn btn-success" /><br />
            </form>

          </div>
          <div className="col-md-3"></div>

          {movies.map(item => (
            <div className="mt-5">
              <ul key={item._id}   className="list-group">
                <li className="list-group-item">{item.title}</li>
                <li className="list-group-item">{item.content}</li>
                <li className="list-group-item"><button onClick={()=>{getMovie(item._id)}} type="button" className="btn btn-info">Edit</button></li>
              </ul>

            </div>))}



        </div>


      </div>
    </div>
  );
}

export default App;

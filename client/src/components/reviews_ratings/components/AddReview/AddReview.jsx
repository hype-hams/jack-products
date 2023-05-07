import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AddCharacteristics from './AddCharacteristics.jsx'
// import Stars from './Stars.jsx';

Modal.setAppElement("#root");
const possibleStars = [1, 2, 3, 4, 5]
const AddReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [minBody, setMinBody] = useState('50');
  const [chars, setChars] = useState([]);

  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0)

  //Modal Toggler
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  //Stars Builder
  // const BuildStars = () => {
  //   return (
  //           <div className="stars">
  //             {possibleStars.map(rate => <i
  //               key={rate}
  //               className={"fas fa-star "
  //               + ((rate <= rating) ? 'in-rate ' : '')
  //               + ((rate <= hover) ? 'in-hover' : '')}
  //               onClick={() => setRating(rate)}
  //               onMouseEnter={() => {setHover(rate); setRating(null);}}
  //               onMouseLeave={() => setHover(null)}></i>)}
  //           </div>
  //   );
  // }




  //Characteristics
//   const allCharacteristics = {
//     Size: { //135232
//       1: 'A size too small',
//       2: '1/2 a size too small',
//       3: 'Perfect',
//       4: '1/2 a size too big',
//       5: 'A size too wide',
//     },
//     Width: { //135233
//       1: 'Too narrow',
//       2: 'Slightly narrow',
//       3: 'Perfect',
//       4: 'Slightly Wide',
//       5: 'A size too wide',
//     },
//     Comfort: { //135221
//       1: 'Uncomfortable',
//       2: 'Slightly uncomfortable',
//       3: 'Ok',
//       4: 'Comfortable',
//       5: 'Perfect'
//     },
//     Quality: { //135222
//       1: 'Poor',
//       2: 'Below average',
//       3: 'What I expected',
//       4: 'Pretty great',
//       5: 'Perfect'
//     },
//     Length: { //135220
//       1: 'Runs short',
//       2: 'Runs slighty short',
//       3: 'Perfect',
//       4: 'Runs slightly long',
//       5: 'Runs long'
//     },
//     Fit: { //135219
//       1: 'Runs tight',
//       2: 'Runs slightly tight',
//       3: 'Perfect',
//       4: 'Runs slightly long',
//       5: 'Runs long'
//     }
//   }
// //posting characteristics = id number and value => key: value
//  const data = []
// const Rows = (props) => {
//   const {name, val1, val2, val3, val4, val5} = props;
//   return (<tr>
//     <td>{name}</td>
//     <td><input type="radio" value="1" name={name}></input>{val1}</td>
//     <td><input type="radio" value="2" name={name}></input>{val2}</td>
//     <td><input type="radio" value="3" name={name}></input>{val3}</td>
//     <td><input type="radio" value="4" name={name}></input>{val4}</td>
//     <td><input type="radio" value="5" name={name}></input>{val5}</td>
//   </tr>
//   )
// }
//   const Table = (props) => {
//     const {data} = props
//     return(
//       <table>
//         <thead>
//           <tr>
//           <th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             data.map(row =>
//               <Row name={row.name}
//                 val1={row.val1}
//                 val2={row.val2}
//                 val3={row.val3}
//                 val4={row.val4}
//                 val5={row.val5} />
//             )
//           }
//         </tbody>
//       </table>
//     )
//   }
//   const TableCharacteristics = () => {
//     const activeCharacteristics = axios({
//       method: 'GET',
//       url: '/api/reviews/meta?product_id=40344'
//     })
//     .then((response) => {
//       let incoming = Object.keys(response.data.characteristics)
//       console.log(incoming)
//       incoming.forEach(el => {
//         data.push({name: el,
//           val1: allCharacteristics[el][1],
//           val2: allCharacteristics[el][2],
//           val3: allCharacteristics[el][3],
//           val4: allCharacteristics[el][4],
//           val5: allCharacteristics[el][5],
//         })
//       })
//       console.log(data)
//     })
//   }






  return (
    <div className="add-review">
      <button
        onClick={toggleModal}>Add Review</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="ReviewForm"
      >
        <form>
          <div className="product-name">
            <h2>Write Your Review</h2>
            <h3>About your PRODUCT_NAME_HERE</h3>
          </div>

          <div className="stars">Star Rating

          </div>
  <br></br>
          <div className="recommend">
            <p>Do you recommend this product?
            <input
              type="radio"
              value="yes"
              name="recommend"
              defaultChecked
            ></input>
              <span>Yes</span>
            <input
            type="radio"
            value="no"
            name="recommend"
          ></input>
            <span>No</span></p>
          </div>
  <br></br>
          <div>
            <label>Characteristics</label><br></br>
            {
              <AddCharacteristics setChars={setChars}
                chars={chars} />
            }
          </div>

          <div className="review-summary">
            <label>Review Summary</label><br></br>
            <input type="text"
              placeholder="Example: Best purchase ever!"
              size="30"
              maxLength="60"
              required></input>
          </div>
  <br></br>
          <div className="review-body">
            <label>Review Body</label><br></br>
            <textarea maxLength = '1000'
              required
              rows="10"
              cols="70"
              placeholder = 'Why did you like the product or not?' onChange = {(e)=> {
                            setBodyText(e.target.value);
                            setMinBody('50'-bodyText.length);
                           if(bodyText.length >= 50) {
                            setMinBody('Minimum reached.');
                           }
                         }}>
             </textarea>
                    <small style={{color:'gray'}}>
                      Minimum required characters left:{minBody}
                    </small>
          </div>
  <br></br>
          <div className="upload">
            <label>Upload Photos</label>
            <input type="file"></input>
          </div>
  <br></br>
          <div className="username">
            <label>Username:</label>
            <input type="text"
              placeholder="Example: jackson11!"
              size="30"
              maxLength="60"
              required
            ></input><br></br>
            <small style={{color:'gray'}}>For privacy reasons, do not use your full name or email address.</small>
          </div>
  <br></br>
          <div className="email">
            <label>Email:</label>
              <input type="email"
                placeholder="Example: jackson11@email.com"
                size="30"
                maxLength="60"
                required
              ></input><br></br>
              <small style={{color:'gray'}}>For authentication reasons. You will not be emailed.</small>
          </div>
  <br></br>
          <button type='button'
            onClick={toggleModal}
          >Cancel</button>
          <button
            type="submit">Submit Review</button>

        </form>
      </Modal>
    </div>
  )

}

export default AddReview;